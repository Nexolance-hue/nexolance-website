'use client';

import { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Search, Award, Mail, Phone, FileText, Zap, Target, BarChart3, Users, Quote, Star, Shield, Clock, BookOpen, MapPin, MessageSquare, Download, Share2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SEOWidget from './SEOWidget';
import { APIErrorHandler } from '@/lib/errors/apiErrorHandler';
import { ErrorFactory } from '@/lib/errors/errorFactory';
import { errorLogger } from '@/lib/errors/errorLogger';
import { AppError } from '@/lib/errors/types';

interface AuditScores {
  seo: number;
  performance: number;
  accessibility: number;
  bestPractices: number;
  overall: number;
}

interface AuditIssue {
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'passed';
}

interface AuditResults {
  url: string;
  scores: AuditScores;
  issues: {
    critical: AuditIssue[];
    warnings: AuditIssue[];
    passed: AuditIssue[];
  };
}

interface GooglePageSpeedResponse {
  lighthouseResult: {
    categories: {
      seo: { score: number };
      performance: { score: number };
      accessibility: { score: number };
      'best-practices': { score: number };
    };
    audits: {
      [key: string]: {
        title: string;
        description?: string;
        score: number | null;
      };
    };
  };
}

export default function SEOAuditTool() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<AuditResults | null>(null);
  const [error, setError] = useState('');

  // Cache results to prevent duplicate API calls
  const [cachedResults, setCachedResults] = useState<Record<string, AuditResults>>({});

  // Lead capture form state
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
  });
  const [leadFormErrors, setLeadFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitSuccess, setLeadSubmitSuccess] = useState(false);

  const formatUrl = (input: string): string => {
    let formatted = input.trim();

    // Remove protocol if present
    formatted = formatted.replace(/^(https?:\/\/)?(www\.)?/, '');

    // Add https://
    formatted = `https://${formatted}`;

    return formatted;
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResults(null);
    setProgress(0);

    if (!url) {
      setError('Please enter a website URL');
      return;
    }

    const formattedUrl = formatUrl(url);

    if (!validateUrl(formattedUrl)) {
      setError('Please enter a valid website URL');
      return;
    }

    // Check cache first to avoid duplicate API calls
    const cacheKey = formattedUrl.toLowerCase();
    if (cachedResults[cacheKey]) {
      setResults(cachedResults[cacheKey]);
      return;
    }

    setIsAnalyzing(true);

    try {
      // Step 1: Analyzing SEO factors
      setAnalysisStep('Analyzing SEO factors...');
      setProgress(15);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: Checking mobile performance
      setAnalysisStep('Checking mobile performance...');
      setProgress(30);

      // Call Google PageSpeed Insights API with enhanced error handling
      const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
      const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_PAGESPEED_API_KEY;
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&category=${categories.join('&category=')}&strategy=mobile${googleApiKey ? `&key=${googleApiKey}` : ''}`;

      // Use APIErrorHandler with automatic retry logic
      setAnalysisStep('Audit in progress - analyzing your website...');
      setProgress(40);

      // Smooth progress animation during API call
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 65) return prev + 0.5;
          return prev;
        });
      }, 100);

      const data = await APIErrorHandler.fetchWithRetry<GooglePageSpeedResponse>(apiUrl, {}, {
        maxRetries: 4,
        baseDelay: 2500,
        retryableStatuses: [429, 500, 502, 503, 504]
      });

      clearInterval(progressInterval);

      // Step 3: Scanning technical issues
      setAnalysisStep('Scanning technical issues...');
      setProgress(70);

      // Step 4: Generating report
      setAnalysisStep('Generating report...');
      setProgress(90);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Extract scores
      const lighthouseResult = data.lighthouseResult;
      const categories_data = lighthouseResult.categories;

      const scores: AuditScores = {
        seo: Math.round(categories_data.seo.score * 100),
        performance: Math.round(categories_data.performance.score * 100),
        accessibility: Math.round(categories_data.accessibility.score * 100),
        bestPractices: Math.round(categories_data['best-practices'].score * 100),
        overall: 0
      };

      // Calculate overall score
      scores.overall = Math.round(
        (scores.seo + scores.performance + scores.accessibility + scores.bestPractices) / 4
      );

      // Extract audit issues
      const audits = lighthouseResult.audits;
      const issues: AuditResults['issues'] = {
        critical: [],
        warnings: [],
        passed: []
      };

      // Key audits to check
      const keyAudits = [
        'meta-description',
        'document-title',
        'link-text',
        'crawlable-anchors',
        'is-crawlable',
        'robots-txt',
        'canonical',
        'hreflang',
        'image-alt',
        'structured-data',
        'viewport',
        'http-status-code',
        'is-on-https',
        'font-size',
        'tap-targets',
        'uses-responsive-images',
        'render-blocking-resources',
        'uses-optimized-images',
        'unminified-css',
        'unminified-javascript'
      ];

      keyAudits.forEach(auditKey => {
        const audit = audits[auditKey];
        if (!audit) return;

        const issue: AuditIssue = {
          title: audit.title,
          description: audit.description || '',
          severity: audit.score === null ? 'warning' : audit.score < 0.9 ? (audit.score < 0.5 ? 'critical' : 'warning') : 'passed'
        };

        if (issue.severity === 'critical') {
          issues.critical.push(issue);
        } else if (issue.severity === 'warning') {
          issues.warnings.push(issue);
        } else {
          issues.passed.push(issue);
        }
      });

      const auditResults: AuditResults = {
        url: formattedUrl,
        scores,
        issues
      };

      // Cache the results
      setCachedResults(prev => ({
        ...prev,
        [cacheKey]: auditResults
      }));

      setProgress(100);
      setResults(auditResults);

    } catch (err: any) {
      let appError: AppError;

      // Convert to AppError if not already
      if (err.statusCode) {
        appError = err;
      } else {
        appError = ErrorFactory.createError(
          err.status || 0,
          err.message || 'Network error',
          { url: formattedUrl }
        );
      }

      // Log the error
      errorLogger.log(appError, { component: 'SEOAuditTool', url: formattedUrl });

      // Set user-friendly error message
      if (appError.statusCode === 429 || appError.type === 'RATE_LIMIT') {
        setError('RATE_LIMIT');
      } else if (appError.statusCode === 404) {
        setError('We couldn\'t access this website. Make sure it\'s publicly available and the URL is correct.');
      } else {
        setError(appError.userMessage || 'An error occurred while analyzing the website. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
      setProgress(0);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getLeadTemperature = (score: number): string => {
    if (score <= 50) return '🔥 HOT LEAD';
    if (score <= 70) return '🟡 WARM LEAD';
    return '🟢 COLD LEAD';
  };

  const generatePDF = () => {
    if (!results) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header with branding
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pageWidth, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SEO Audit Report', pageWidth / 2, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Powered by Nexolance', pageWidth / 2, 25, { align: 'center' });

    // Website URL
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Website:', 14, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(results.url, 40, 50);

    // Date
    doc.setFontSize(10);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 57);

    // Overall Score Circle
    const centerX = pageWidth / 2;
    const circleY = 75;
    const scoreColor = results.scores.overall >= 80 ? [16, 185, 129] :
                      results.scores.overall >= 50 ? [245, 158, 11] : [239, 68, 68];

    doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.setLineWidth(3);
    doc.circle(centerX, circleY, 20, 'S');

    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text(results.scores.overall.toString(), centerX, circleY + 3, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Overall Score', centerX, circleY + 12, { align: 'center' });

    // Category Scores Table
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Category Scores', 14, 110);

    autoTable(doc, {
      startY: 115,
      head: [['Category', 'Score', 'Status']],
      body: [
        ['SEO', results.scores.seo, results.scores.seo >= 80 ? 'Good' : results.scores.seo >= 50 ? 'Fair' : 'Poor'],
        ['Performance', results.scores.performance, results.scores.performance >= 80 ? 'Good' : results.scores.performance >= 50 ? 'Fair' : 'Poor'],
        ['Accessibility', results.scores.accessibility, results.scores.accessibility >= 80 ? 'Good' : results.scores.accessibility >= 50 ? 'Fair' : 'Poor'],
        ['Best Practices', results.scores.bestPractices, results.scores.bestPractices >= 80 ? 'Good' : results.scores.bestPractices >= 50 ? 'Fair' : 'Poor'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255] },
      styles: { fontSize: 11 },
    });

    // Critical Issues
    const criticalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Critical Issues (${results.issues.critical.length})`, 14, criticalY);

    if (results.issues.critical.length > 0) {
      autoTable(doc, {
        startY: criticalY + 5,
        head: [['Issue', 'Description']],
        body: results.issues.critical.slice(0, 5).map(issue => [issue.title, issue.description || 'No description']),
        theme: 'grid',
        headStyles: { fillColor: [239, 68, 68], textColor: [255, 255, 255] },
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 'auto' }
        }
      });
    }

    // Warnings
    const warningsY = (doc as any).lastAutoTable.finalY + 15;
    if (warningsY < pageHeight - 40) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Warnings (${results.issues.warnings.length})`, 14, warningsY);

      if (results.issues.warnings.length > 0) {
        autoTable(doc, {
          startY: warningsY + 5,
          head: [['Issue', 'Description']],
          body: results.issues.warnings.slice(0, 5).map(issue => [issue.title, issue.description || 'No description']),
          theme: 'grid',
          headStyles: { fillColor: [245, 158, 11], textColor: [255, 255, 255] },
          styles: { fontSize: 9 },
          columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 'auto' }
          }
        });
      }
    }

    // Footer
    const footerY = pageHeight - 20;
    doc.setFillColor(240, 240, 240);
    doc.rect(0, footerY - 5, pageWidth, 25, 'F');

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Need help improving your SEO?', pageWidth / 2, footerY + 2, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.text('Contact Nexolance: (816) 367-9231 | nexolance.agency', pageWidth / 2, footerY + 8, { align: 'center' });

    // Save PDF
    const fileName = `SEO-Audit-${results.url.replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const handleShare = async () => {
    if (!results) return;

    const shareData = {
      title: `SEO Audit Results for ${results.url}`,
      text: `Check out my SEO audit score: ${results.scores.overall}/100! Get your free audit at Nexolance.`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(
          `SEO Audit Results for ${results.url}\n\nOverall Score: ${results.scores.overall}/100\n• SEO: ${results.scores.seo}/100\n• Performance: ${results.scores.performance}/100\n• Accessibility: ${results.scores.accessibility}/100\n• Best Practices: ${results.scores.bestPractices}/100\n\nGet your free audit at: https://nexolance.agency/tools/seo-audit`
        );
        alert('Results copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleLeadFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (leadFormErrors[name]) {
      setLeadFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateLeadForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!leadFormData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!leadFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!leadFormData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    setLeadFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLeadForm() || !results) {
      return;
    }

    setIsSubmittingLead(true);

    try {
      const leadTemperature = getLeadTemperature(results.scores.overall);
      const currentDateTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        dateStyle: 'full',
        timeStyle: 'short'
      });

      // Format data for email
      const topIssues = results.issues.critical.slice(0, 5).map(issue => issue.title).join('\n');

      const emailData = {
        name: leadFormData.fullName,
        email: leadFormData.email,
        phone: leadFormData.phone,
        company: leadFormData.companyName || 'Not provided',
        websiteUrl: results.url,
        overallScore: results.scores.overall,
        seoScore: results.scores.seo,
        performanceScore: results.scores.performance,
        accessibilityScore: results.scores.accessibility,
        bestPracticesScore: results.scores.bestPractices,
        criticalIssues: results.issues.critical.length,
        warnings: results.issues.warnings.length,
        topIssues: topIssues,
        leadTemperature: leadTemperature,
        timestamp: currentDateTime,
        _replyto: leadFormData.email,
        _subject: `🎯 New SEO Audit Lead - ${results.scores.overall}/100 - ${leadFormData.fullName}`,
      };

      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mykkeald', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      // Also send to WhatsApp
      const whatsappMessage = `🎯 NEW SEO AUDIT LEAD - ${results.scores.overall}/100

👤 CONTACT INFO
Name: ${leadFormData.fullName}
Email: ${leadFormData.email}
Phone: ${leadFormData.phone}${leadFormData.companyName ? `\nCompany: ${leadFormData.companyName}` : ''}

🌐 WEBSITE AUDITED
${results.url}

📊 SEO AUDIT SCORES
Overall: ${results.scores.overall}/100
SEO: ${results.scores.seo}/100
Performance: ${results.scores.performance}/100
Accessibility: ${results.scores.accessibility}/100
Best Practices: ${results.scores.bestPractices}/100

🔴 CRITICAL ISSUES: ${results.issues.critical.length}
⚠️ WARNINGS: ${results.issues.warnings.length}

TOP ISSUES:
${topIssues}

🌡️ LEAD TEMPERATURE: ${leadTemperature}

⏰ Submitted: ${currentDateTime}`;

      // Open WhatsApp in background (optional - silent notification)
      const whatsappUrl = `https://wa.me/18163679231?text=${encodeURIComponent(whatsappMessage)}`;
      // Don't open automatically, just log for now
      console.log('WhatsApp notification URL:', whatsappUrl);

      setLeadSubmitSuccess(true);
      setShowLeadForm(false);

      // Track analytics event
      console.log('Analytics: lead_captured', {
        url: results.url,
        score: results.scores.overall,
        leadTemperature,
      });

    } catch (err) {
      console.error('Lead submission error:', err);
      setError('Failed to submit your information. Please try again or call us at (816) 367-9231.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleWhatsAppConsultation = () => {
    if (!results) return;

    const message = `Hi! I just ran an SEO audit on ${results.url} and got a score of ${results.scores.overall}/100. I'd like to discuss improving my website's SEO performance.`;
    const whatsappUrl = `https://wa.me/18163679231?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Track analytics event
    console.log('Analytics: call_scheduled', {
      url: results.url,
      score: results.scores.overall,
    });
  };

  const ScoreCircle = ({ score, label }: { score: number; label: string }) => (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="position-relative d-inline-flex align-items-center justify-content-center mb-3"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `conic-gradient(${getScoreColor(score)} ${score}%, rgba(255,255,255,0.1) ${score}%)`,
          padding: '8px'
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center w-100 h-100 rounded-circle"
          style={{ background: 'rgba(10, 10, 10, 0.9)' }}
        >
          <span className="fw-bold" style={{ fontSize: '2rem', color: getScoreColor(score) }}>
            {score}
          </span>
        </div>
      </motion.div>
      <p className="mb-0 small fw-semibold text-white">{label}</p>
    </div>
  );

  return (
    <div className="seo-audit-tool position-relative" style={{ background: '#0a0a0a' }}>
      {/* Background effects */}
      <div className="hero-background" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>

      <Container className="position-relative" style={{ zIndex: 10, paddingTop: '4rem', paddingBottom: '3rem' }}>
        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <Row className="justify-content-center">
                <Col lg={8}>
                  {/* Trust badge */}
                  <div className="mb-4">
                    <div className="badge-pill bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-inline-flex align-items-center">
                      <Award className="me-2" size={16} />
                      <span className="fw-semibold small">100% Free • No Credit Card Required</span>
                    </div>
                  </div>

                  {/* Hero heading */}
                  <h1 className="fw-bold mb-3 text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                    Free SEO Audit Tool
                  </h1>

                  <h2 className="h3 fw-semibold mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'rgba(255, 255, 255, 0.95)' }}>
                    Is Your Website <span className="text-gradient">Losing You Clients?</span>
                  </h2>

                  <p className="lead mb-4" style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                    Get Your Free SEO Audit in 60 Seconds
                  </p>

                  {/* Value bullets */}
                  <div className="mb-5">
                    <Row className="g-3 justify-content-center text-start">
                      <Col md={4}>
                        <div className="d-flex align-items-start gap-2">
                          <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                          <span className="text-white">Analyze 40+ SEO factors instantly</span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex align-items-start gap-2">
                          <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                          <span className="text-white">Get actionable recommendations</span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex align-items-start gap-2">
                          <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                          <span className="text-white">No technical knowledge required</span>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Error message */}
                  {error && (
                    <Alert
                      variant={error === 'RATE_LIMIT' ? 'warning' : 'danger'}
                      dismissible
                      onClose={() => setError('')}
                      className="mb-4"
                    >
                      {error === 'RATE_LIMIT' ? (
                        <div>
                          <div className="fw-bold mb-2">
                            <Clock size={18} className="me-2" />
                            Google API Rate Limit Reached
                          </div>
                          <p className="mb-2">
                            We've hit Google's API request limit. This is temporary and will reset shortly.
                          </p>
                          <p className="mb-2 fw-semibold">Please choose one of these options:</p>
                          <ul className="mb-2">
                            <li>Wait 3-5 minutes and try again (recommended)</li>
                            <li>
                              Call us at{' '}
                              <a href="tel:+18163679231" className="text-decoration-underline fw-bold">
                                (816) 367-9231
                              </a>{' '}
                              for immediate assistance
                            </li>
                            <li>Scroll down to request a free manual audit from our team</li>
                          </ul>
                          <p className="mb-0 small text-muted">
                            We cache results, so re-checking the same website won't trigger additional API calls.
                          </p>
                        </div>
                      ) : (
                        error
                      )}
                    </Alert>
                  )}

                  {/* SEO Audit Software Widget */}
                  <div className="mb-4">
                    <SEOWidget url={url} setUrl={setUrl} onSubmit={handleAnalyze} />
                  </div>

                  {/* Progress Bar */}
                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4"
                    >
                      <div className="bg-white bg-opacity-10 rounded-4 p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h5 className="text-white mb-0 fw-semibold">
                            {analysisStep || 'Analyzing your website...'}
                          </h5>
                          <span className="text-white fw-bold">{Math.round(progress)}%</span>
                        </div>
                        <div className="progress" style={{
                          height: '30px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '15px',
                          overflow: 'hidden',
                        }}>
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{
                              width: `${progress}%`,
                              background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
                              transition: 'width 0.3s ease',
                            }}
                          >
                            <span className="fw-bold px-2">{Math.round(progress)}%</span>
                          </div>
                        </div>
                        <p className="text-white-50 small mb-0 mt-2">
                          ⏱️ This usually takes 5-15 seconds
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Trust indicators */}
                  <div className="d-flex flex-wrap gap-4 justify-content-center small mb-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={16} />
                      <span>No credit card required</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={16} />
                      <span>Instant results</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={16} />
                      <span>Real-time analysis</span>
                    </div>
                  </div>

                  {/* Rate limit notice */}
                  <p className="small text-white-50 mb-0">
                    <AlertTriangle size={14} className="me-1" />
                    High traffic? The tool may take 30-60 seconds during peak hours
                  </p>
                </Col>
              </Row>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Results header */}
              <div className="text-center mb-5">
                <h2 className="fw-bold mb-3 text-white">SEO Audit Results for</h2>
                <p className="lead text-gradient mb-0">{results.url}</p>

                {/* Action buttons */}
                <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
                  <Button
                    variant="success"
                    className="fw-semibold px-4 py-2"
                    onClick={generatePDF}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none',
                      color: '#ffffff'
                    }}
                  >
                    <Download size={18} className="me-2" />
                    Download PDF Report
                  </Button>

                  <Button
                    variant="outline-light"
                    className="fw-semibold px-4 py-2"
                    onClick={handleShare}
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      color: '#ffffff'
                    }}
                  >
                    <Share2 size={18} className="me-2" />
                    Share Results
                  </Button>

                  <Button
                    variant="link"
                    className="small"
                    style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                    onClick={() => {
                      setResults(null);
                      setUrl('');
                    }}
                  >
                    ← Analyze another website
                  </Button>
                </div>
              </div>

              {/* Overall score */}
              <Row className="justify-content-center mb-5">
                <Col xs="auto">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.8 }}
                      className="position-relative d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: `conic-gradient(${getScoreColor(results.scores.overall)} ${results.scores.overall}%, rgba(255,255,255,0.1) ${results.scores.overall}%)`,
                        padding: '12px'
                      }}
                    >
                      <div
                        className="d-flex flex-column align-items-center justify-content-center w-100 h-100 rounded-circle"
                        style={{ background: 'rgba(10, 10, 10, 0.9)' }}
                      >
                        <span className="fw-bold" style={{ fontSize: '4rem', color: getScoreColor(results.scores.overall) }}>
                          {results.scores.overall}
                        </span>
                        <span className="small text-white">Overall Score</span>
                      </div>
                    </motion.div>
                  </div>
                </Col>
              </Row>

              {/* Category scores */}
              <Row className="g-4 mb-5 justify-content-center">
                <Col xs={6} md={3}>
                  <ScoreCircle score={results.scores.seo} label="SEO Score" />
                </Col>
                <Col xs={6} md={3}>
                  <ScoreCircle score={results.scores.performance} label="Performance" />
                </Col>
                <Col xs={6} md={3}>
                  <ScoreCircle score={results.scores.accessibility} label="Accessibility" />
                </Col>
                <Col xs={6} md={3}>
                  <ScoreCircle score={results.scores.bestPractices} label="Best Practices" />
                </Col>
              </Row>

              {/* Issues breakdown */}
              <Row className="g-4">
                {/* Critical issues */}
                {results.issues.critical.length > 0 && (
                  <Col lg={12}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-3"
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <XCircle className="text-danger me-2" size={24} />
                        <h3 className="h5 mb-0 fw-bold text-danger">
                          Critical Issues ({results.issues.critical.length})
                        </h3>
                      </div>
                      <p className="mb-3 small text-white">These issues need immediate attention</p>
                      <div className="d-flex flex-column gap-3">
                        {results.issues.critical.slice(0, 5).map((issue, idx) => (
                          <div key={idx} className="d-flex gap-3">
                            <XCircle className="text-danger flex-shrink-0 mt-1" size={16} />
                            <div>
                              <p className="mb-1 fw-semibold text-white">{issue.title}</p>
                              <p className="mb-0 small" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{issue.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </Col>
                )}

                {/* Warnings */}
                {results.issues.warnings.length > 0 && (
                  <Col lg={12}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-4 rounded-3"
                      style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <AlertTriangle className="text-warning me-2" size={24} />
                        <h3 className="h5 mb-0 fw-bold text-warning">
                          Warnings ({results.issues.warnings.length})
                        </h3>
                      </div>
                      <p className="mb-3 small text-white">These issues should be addressed soon</p>
                      <div className="d-flex flex-column gap-3">
                        {results.issues.warnings.slice(0, 5).map((issue, idx) => (
                          <div key={idx} className="d-flex gap-3">
                            <AlertTriangle className="text-warning flex-shrink-0 mt-1" size={16} />
                            <div>
                              <p className="mb-1 fw-semibold text-white">{issue.title}</p>
                              <p className="mb-0 small" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{issue.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </Col>
                )}

                {/* Strengths */}
                {results.issues.passed.length > 0 && (
                  <Col lg={12}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 rounded-3"
                      style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <CheckCircle className="text-success me-2" size={24} />
                        <h3 className="h5 mb-0 fw-bold text-success">
                          Strengths ({results.issues.passed.length})
                        </h3>
                      </div>
                      <p className="mb-3 small text-white">What's working well on your site</p>
                      <div className="d-flex flex-wrap gap-2">
                        {results.issues.passed.slice(0, 10).map((issue, idx) => (
                          <div
                            key={idx}
                            className="badge bg-success bg-opacity-10 text-success px-3 py-2"
                          >
                            <CheckCircle className="me-1" size={12} />
                            {issue.title}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </Col>
                )}
              </Row>

              {/* Lead Capture Section */}
              {!leadSubmitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-5"
                >
                  <Row className="justify-content-center">
                    <Col lg={8}>
                      <div
                        className="p-5 rounded-3 text-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                          border: '2px solid rgba(102, 126, 234, 0.3)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <FileText className="text-primary mb-3" size={48} />
                        <h3 className="fw-bold mb-3 text-white">Want the Complete SEO Analysis?</h3>
                        <p className="mb-4 text-white">
                          Get your detailed report with:
                        </p>
                        <Row className="g-3 mb-4 text-start">
                          <Col md={6}>
                            <div className="d-flex align-items-start gap-2">
                              <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                              <span className="text-white">Competitor comparison analysis</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d-flex align-items-start gap-2">
                              <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                              <span className="text-white">Month-by-month fix roadmap</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d-flex align-items-start gap-2">
                              <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                              <span className="text-white">Traffic projection estimates</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d-flex align-items-start gap-2">
                              <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                              <span className="text-white">Priority action items</span>
                            </div>
                          </Col>
                        </Row>

                        {!showLeadForm ? (
                          <Button
                            size="lg"
                            className="btn-gradient fw-semibold px-5"
                            onClick={() => setShowLeadForm(true)}
                          >
                            <Mail className="me-2" size={20} />
                            Get My Detailed Report
                          </Button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4"
                          >
                            <Form onSubmit={handleLeadSubmit}>
                              <Row className="g-3">
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Control
                                      type="text"
                                      name="fullName"
                                      placeholder="Full Name *"
                                      value={leadFormData.fullName}
                                      onChange={handleLeadFormChange}
                                      isInvalid={!!leadFormErrors.fullName}
                                      disabled={isSubmittingLead}
                                      style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white',
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {leadFormErrors.fullName}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Control
                                      type="email"
                                      name="email"
                                      placeholder="Email Address *"
                                      value={leadFormData.email}
                                      onChange={handleLeadFormChange}
                                      isInvalid={!!leadFormErrors.email}
                                      disabled={isSubmittingLead}
                                      style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white',
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {leadFormErrors.email}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Control
                                      type="tel"
                                      name="phone"
                                      placeholder="Phone Number *"
                                      value={leadFormData.phone}
                                      onChange={handleLeadFormChange}
                                      isInvalid={!!leadFormErrors.phone}
                                      disabled={isSubmittingLead}
                                      style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white',
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {leadFormErrors.phone}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Control
                                      type="text"
                                      name="companyName"
                                      placeholder="Company Name (Optional)"
                                      value={leadFormData.companyName}
                                      onChange={handleLeadFormChange}
                                      disabled={isSubmittingLead}
                                      style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white',
                                      }}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Button
                                type="submit"
                                size="lg"
                                className="btn-gradient fw-semibold px-5 mt-3"
                                disabled={isSubmittingLead}
                              >
                                {isSubmittingLead ? (
                                  <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    <Mail className="me-2" size={20} />
                                    Send My Detailed Report
                                  </>
                                )}
                              </Button>
                            </Form>
                            <p className="small mt-3 mb-0 text-white">
                              🔒 We respect your privacy. Your information will never be shared.
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </motion.div>
              )}

              {/* Success message after lead submission */}
              {leadSubmitSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-5"
                >
                  <Row className="justify-content-center">
                    <Col lg={8}>
                      <Alert variant="success" className="text-center p-4">
                        <CheckCircle className="mb-3" size={48} />
                        <h4 className="fw-bold mb-2">Thank You!</h4>
                        <p className="mb-0">
                          Your detailed SEO report has been sent to {leadFormData.email}.
                          We'll contact you within 24 hours to discuss your results.
                        </p>
                      </Alert>
                    </Col>
                  </Row>
                </motion.div>
              )}

              {/* WhatsApp CTA - Show for low scores */}
              {results.scores.overall < 70 && !leadSubmitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4"
                >
                  <Row className="justify-content-center">
                    <Col lg={8}>
                      <div
                        className="p-4 rounded-3 text-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.1) 0%, rgba(18, 140, 126, 0.1) 100%)',
                          border: '2px solid rgba(37, 211, 102, 0.3)',
                        }}
                      >
                        <h4 className="fw-bold mb-3 text-white">Let's Fix These Issues Together</h4>
                        <p className="mb-3 text-white">
                          Your site has {results.issues.critical.length} critical issues.
                          {results.issues.critical.length > 5 && (
                            <span className="d-block mt-2 text-white">
                              <strong>Estimated Investment to Fix:</strong> $2,500 - $4,500
                            </span>
                          )}
                        </p>
                        <Button
                          size="lg"
                          className="fw-semibold px-5"
                          onClick={handleWhatsAppConsultation}
                          style={{
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                            border: 'none',
                            color: 'white',
                          }}
                        >
                          <Phone className="me-2" size={20} />
                          Schedule Free Strategy Call
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional SEO Content Sections - Light Background */}
      </Container>

      {/* Light Background Section for Content */}
      <div style={{ background: '#ffffff', position: 'relative', zIndex: 5, marginTop: '-2rem' }}>
        <Container className="pt-5 pb-4">

          {/* The Problem Section */}
          <section className="pt-4 pb-5">
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-4" style={{ color: '#0a0a0a' }}>The Silent Problem Costing Kansas Businesses $127,000/Year</h2>
                  <p className="lead text-center mb-5" style={{ color: '#333' }}>
                    70% of Kansas small businesses have critical SEO issues they don't know about
                  </p>
                  <Row className="g-4">
                    <Col md={4}>
                      <motion.div
                        className="text-center p-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '60px' }}>
                          <BarChart3 size={48} style={{ color: '#EF4444' }} />
                        </div>
                        <h3 className="h5 fw-bold mb-2" style={{ color: '#0a0a0a' }}>Invisible to Google</h3>
                        <p className="mb-0" style={{ color: '#555' }}>Your competitors appear on page 1 while you're buried on page 3+. Each month without action = $10,000+ in lost revenue.</p>
                      </motion.div>
                    </Col>
                    <Col md={4}>
                      <motion.div
                        className="text-center p-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '60px' }}>
                          <Zap size={48} style={{ color: '#F59E0B' }} />
                        </div>
                        <h3 className="h5 fw-bold mb-2" style={{ color: '#0a0a0a' }}>Bouncing Visitors</h3>
                        <p className="mb-0" style={{ color: '#555' }}>Slow load times mean 53% of mobile users leave before your site even loads. That's half your potential clients gone instantly.</p>
                      </motion.div>
                    </Col>
                    <Col md={4}>
                      <motion.div
                        className="text-center p-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '60px' }}>
                          <Target size={48} style={{ color: '#EF4444' }} />
                        </div>
                        <h3 className="h5 fw-bold mb-2" style={{ color: '#0a0a0a' }}>Mobile Disaster</h3>
                        <p className="mb-0" style={{ color: '#555' }}>63% of searches happen on mobile. If your site isn't mobile-optimized, you're losing the majority of your audience.</p>
                      </motion.div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5 p-4 rounded-3" style={{ background: '#FEF3C7', border: '2px solid #F59E0B' }}>
                    <p className="mb-0 fw-bold" style={{ color: '#92400E', fontSize: '1.1rem' }}>
                      ⚠️ Reality check: While you're reading this, your competitors are ranking higher, getting more calls, and growing their customer base. Every day without optimization is a day of lost revenue.
                    </p>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* What We Check Section */}
          <section className="py-5">
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-4" style={{ color: '#0a0a0a' }}>Your Website Will Be Analyzed For:</h2>
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>Technical SEO</h3>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Site speed & Core Web Vitals</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Mobile-friendliness</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />SSL certificate & security</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Broken links & 404 errors</li>
                          <li className="mb-0" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Crawlability & indexation</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>On-Page SEO</h3>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Meta titles & descriptions</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Header tag optimization</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Keyword usage</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Content quality</li>
                          <li className="mb-0" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Image optimization</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>Local SEO (Kansas Focus)</h3>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Google Business Profile optimization</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Local keyword rankings</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />NAP consistency</li>
                          <li className="mb-0" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Local citations</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>Competitive Analysis</h3>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />How you rank vs. competitors</li>
                          <li className="mb-2" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Keyword gaps</li>
                          <li className="mb-0" style={{ color: '#333' }}><CheckCircle className="text-success me-2" size={16} />Backlink opportunities</li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* Results Preview Section */}
          <section className="py-5" style={{ background: '#f9fafb' }}>
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-4" style={{ color: '#0a0a0a' }}>Here's What You'll Discover About Your Website</h2>
                  <Row className="g-4 align-items-center">
                    {/* Mock Results Card */}
                    <Col lg={6}>
                      <motion.div
                        className="p-4 rounded-3"
                        style={{
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
                          border: '2px solid rgba(16, 185, 129, 0.3)',
                          backdropFilter: 'blur(10px)'
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="text-center mb-4">
                          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '160px', height: '160px', background: 'conic-gradient(#F59E0B 62%, rgba(255,255,255,0.2) 62%)', padding: '10px' }}>
                            <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 rounded-circle" style={{ background: '#ffffff' }}>
                              <span className="fw-bold" style={{ fontSize: '3.5rem', color: '#F59E0B' }}>62</span>
                              <span className="small fw-semibold" style={{ color: '#666', fontSize: '0.85rem' }}>Overall Score</span>
                            </div>
                          </div>
                          <h3 className="h5 fw-bold mb-0" style={{ color: '#0a0a0a' }}>Sample Audit Results</h3>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-semibold" style={{ color: '#EF4444' }}><XCircle size={16} className="me-1" />Critical Issues</span>
                            <span className="badge bg-danger">8</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-semibold" style={{ color: '#F59E0B' }}><AlertTriangle size={16} className="me-1" />Warnings</span>
                            <span className="badge bg-warning">12</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-semibold" style={{ color: '#10B981' }}><CheckCircle size={16} className="me-1" />Strengths</span>
                            <span className="badge bg-success">5</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="small fw-bold mb-2" style={{ color: '#666' }}>Example Issues Found:</p>
                          <div className="d-flex flex-column gap-2">
                            <div className="d-flex gap-2 small">
                              <XCircle size={16} className="text-danger flex-shrink-0 mt-1" />
                              <span style={{ color: '#333' }}>Homepage loads in 8.2 seconds (should be &lt;3s)</span>
                            </div>
                            <div className="d-flex gap-2 small">
                              <XCircle size={16} className="text-danger flex-shrink-0 mt-1" />
                              <span style={{ color: '#333' }}>15 pages missing meta descriptions</span>
                            </div>
                            <div className="d-flex gap-2 small">
                              <AlertTriangle size={16} className="text-warning flex-shrink-0 mt-1" />
                              <span style={{ color: '#333' }}>Mobile usability needs improvement</span>
                            </div>
                            <div className="d-flex gap-2 small">
                              <CheckCircle size={16} className="text-success flex-shrink-0 mt-1" />
                              <span style={{ color: '#333' }}>SSL certificate properly configured</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Col>

                    {/* Benefits List */}
                    <Col lg={6}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="d-flex flex-column gap-4">
                          <div className="d-flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: '#DCFCE7' }}>
                                <BarChart3 size={24} style={{ color: '#065F46' }} />
                              </div>
                            </div>
                            <div>
                              <h4 className="h6 fw-bold mb-1" style={{ color: '#0a0a0a' }}>Instant visibility into your site's health</h4>
                              <p className="mb-0 small" style={{ color: '#555' }}>Get a comprehensive overview in 60 seconds, not days</p>
                            </div>
                          </div>

                          <div className="d-flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: '#DCFCE7' }}>
                                <Target size={24} style={{ color: '#065F46' }} />
                              </div>
                            </div>
                            <div>
                              <h4 className="h6 fw-bold mb-1" style={{ color: '#0a0a0a' }}>Prioritized action items</h4>
                              <p className="mb-0 small" style={{ color: '#555' }}>Critical → Warning → Info - know what to fix first</p>
                            </div>
                          </div>

                          <div className="d-flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: '#DCFCE7' }}>
                                <Users size={24} style={{ color: '#065F46' }} />
                              </div>
                            </div>
                            <div>
                              <h4 className="h6 fw-bold mb-1" style={{ color: '#0a0a0a' }}>Competitor comparison for Kansas businesses</h4>
                              <p className="mb-0 small" style={{ color: '#555' }}>See how you stack up against local competitors</p>
                            </div>
                          </div>

                          <div className="d-flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: '#DCFCE7' }}>
                                <MessageSquare size={24} style={{ color: '#065F46' }} />
                              </div>
                            </div>
                            <div>
                              <h4 className="h6 fw-bold mb-1" style={{ color: '#0a0a0a' }}>Clear explanations in plain English</h4>
                              <p className="mb-0 small" style={{ color: '#555' }}>No confusing jargon - just actionable advice</p>
                            </div>
                          </div>

                          <div className="d-flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: '#DCFCE7' }}>
                                <FileText size={24} style={{ color: '#065F46' }} />
                              </div>
                            </div>
                            <div>
                              <h4 className="h6 fw-bold mb-1" style={{ color: '#0a0a0a' }}>Downloadable PDF report</h4>
                              <p className="mb-0 small" style={{ color: '#555' }}>Share with your team or developer</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Col>
                  </Row>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* How It Works Section */}
          <section className="py-5">
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-5" style={{ color: '#0a0a0a' }}>Get Your Complete SEO Analysis in 3 Simple Steps</h2>
                  <Row className="g-4">
                    <Col md={4}>
                      <div className="text-center p-4">
                        <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', background: '#DCFCE7', border: '3px solid #10B981' }}>
                          <span className="fw-bold" style={{ fontSize: '2rem', color: '#065F46' }}>1</span>
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#0a0a0a' }}>Enter Your Website URL</h3>
                        <p className="mb-0" style={{ color: '#555' }}>Our AI-powered scanner analyzes 40+ SEO factors in 60 seconds</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center p-4">
                        <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', background: '#DCFCE7', border: '3px solid #10B981' }}>
                          <span className="fw-bold" style={{ fontSize: '2rem', color: '#065F46' }}>2</span>
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#0a0a0a' }}>Review Your SEO Score</h3>
                        <p className="mb-0" style={{ color: '#555' }}>See exactly what's holding your site back with color-coded results</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center p-4">
                        <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', background: '#DCFCE7', border: '3px solid #10B981' }}>
                          <span className="fw-bold" style={{ fontSize: '2rem', color: '#065F46' }}>3</span>
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#0a0a0a' }}>Get Your Action Plan</h3>
                        <p className="mb-0" style={{ color: '#555' }}>Receive detailed recommendations + option for expert consultation</p>
                      </div>
                    </Col>
                  </Row>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* Why Nexolance Section */}
          <section className="py-5">
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-5" style={{ color: '#0a0a0a' }}>Why Kansas Businesses Trust Nexolance for SEO</h2>
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                        <TrendingUp className="text-success mb-3" size={40} />
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>Kansas Expertise</h3>
                        <p className="mb-0" style={{ color: '#333' }}>We understand Kansas markets - from Wichita law firms to Overland Park medical practices. Our local SEO strategies are tailored to help you dominate search results in your city.</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                        <Award className="text-success mb-3" size={40} />
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>Proven Results</h3>
                        <p className="mb-0" style={{ color: '#333' }}>Law firm: +285% organic traffic. Medical practice: +150% patient inquiries. Local business: Ranked #1 for 18 keywords. These aren't just numbers – they're real Kansas businesses growing with our help.</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                        <CheckCircle className="text-success mb-3" size={40} />
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>Comprehensive Service</h3>
                        <p className="mb-0" style={{ color: '#333' }}>Unlike automated tools, we provide expert analysis from SEO specialists, custom recommendations for YOUR industry, and ongoing support – not just a one-time report.</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                        <FileText className="text-success mb-3" size={40} />
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>Premium Tools</h3>
                        <p className="mb-0" style={{ color: '#333' }}>We use enterprise-level tools worth $10,000/year including SEMrush, Ahrefs, and Screaming Frog to give you insights that free tools can't provide.</p>
                      </div>
                    </Col>
                  </Row>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* Social Proof Section */}
          <section className="py-5" style={{ background: '#f9fafb' }}>
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-5" style={{ color: '#0a0a0a' }}>Kansas Businesses Getting Real Results</h2>

                  {/* Testimonials */}
                  <Row className="g-4 mb-5">
                    <Col md={4}>
                      <motion.div
                        className="p-4 rounded-3 h-100"
                        style={{ background: '#ffffff', border: '2px solid #E5E7EB' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <Quote size={32} className="mb-3" style={{ color: '#10B981' }} />
                        <p className="mb-3" style={{ color: '#333', fontSize: '0.95rem' }}>
                          "The free audit found issues our previous agency completely missed. After implementing Nexolance's recommendations, we're now ranking #1 for 'personal injury lawyer Wichita'."
                        </p>
                        <div className="mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} fill="#F59E0B" stroke="#F59E0B" className="me-1" />
                          ))}
                        </div>
                        <p className="fw-bold mb-0" style={{ color: '#0a0a0a' }}>Sarah Mitchell</p>
                        <p className="small mb-0" style={{ color: '#666' }}>Mitchell & Associates Law Firm, Wichita</p>
                      </motion.div>
                    </Col>

                    <Col md={4}>
                      <motion.div
                        className="p-4 rounded-3 h-100"
                        style={{ background: '#ffffff', border: '2px solid #E5E7EB' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <Quote size={32} className="mb-3" style={{ color: '#10B981' }} />
                        <p className="mb-3" style={{ color: '#333', fontSize: '0.95rem' }}>
                          "I was skeptical about a free tool, but the audit was incredibly detailed. Within 3 months of fixing the issues, our patient inquiries doubled."
                        </p>
                        <div className="mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} fill="#F59E0B" stroke="#F59E0B" className="me-1" />
                          ))}
                        </div>
                        <p className="fw-bold mb-0" style={{ color: '#0a0a0a' }}>Dr. James Robertson</p>
                        <p className="small mb-0" style={{ color: '#666' }}>Robertson Dental Care, Overland Park</p>
                      </motion.div>
                    </Col>

                    <Col md={4}>
                      <motion.div
                        className="p-4 rounded-3 h-100"
                        style={{ background: '#ffffff', border: '2px solid #E5E7EB' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <Quote size={32} className="mb-3" style={{ color: '#10B981' }} />
                        <p className="mb-3" style={{ color: '#333', fontSize: '0.95rem' }}>
                          "Clear, actionable advice that we could actually implement. Our Google rankings improved for all our main service keywords."
                        </p>
                        <div className="mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} fill="#F59E0B" stroke="#F59E0B" className="me-1" />
                          ))}
                        </div>
                        <p className="fw-bold mb-0" style={{ color: '#0a0a0a' }}>Michael Torres</p>
                        <p className="small mb-0" style={{ color: '#666' }}>Torres HVAC Services, Kansas City</p>
                      </motion.div>
                    </Col>
                  </Row>

                  {/* Stats */}
                  <Row className="g-4">
                    <Col xs={6} md={3}>
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="fw-bold mb-2" style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>500+</div>
                        <p className="mb-0 fw-semibold" style={{ color: '#666' }}>Audits<br />Completed</p>
                      </motion.div>
                    </Col>
                    <Col xs={6} md={3}>
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="fw-bold mb-2" style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>94%</div>
                        <p className="mb-0 fw-semibold" style={{ color: '#666' }}>Client<br />Satisfaction</p>
                      </motion.div>
                    </Col>
                    <Col xs={6} md={3}>
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="fw-bold mb-2" style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>180%</div>
                        <p className="mb-0 fw-semibold" style={{ color: '#666' }}>Average Traffic<br />Increase</p>
                      </motion.div>
                    </Col>
                    <Col xs={6} md={3}>
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="fw-bold mb-2" style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>15</div>
                        <p className="mb-0 fw-semibold" style={{ color: '#666' }}>Kansas<br />Cities</p>
                      </motion.div>
                    </Col>
                  </Row>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* FAQ Section */}
          <section className="py-5">
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-5" style={{ color: '#0a0a0a' }}>Frequently Asked Questions</h2>
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>How long does the audit take?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>Instant! Your basic audit results appear in 60 seconds. The detailed PDF report is sent within 1 hour.</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>Is it really free?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>Yes, completely free with no credit card required. We believe in providing value upfront. If you need help implementing fixes, we offer paid services, but there's zero obligation.</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>What makes this different from other free tools?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>Most free tools just show you a score. We provide specific actionable recommendations, Kansas-focused competitive analysis, industry-specific insights, option for expert consultation, and a detailed PDF report you can share with your team.</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>Will this work for my industry?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>Yes! We've helped law firms in Wichita, Topeka, Kansas City; medical practices across Kansas; local service businesses; e-commerce stores; and professional services firms.</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>What if I don't understand the technical terms?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>We explain everything in plain English. Plus, you can schedule a free 15-minute call where we walk you through the results.</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>Do I have to hire you after the audit?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>Absolutely not. The audit is genuinely free. Many businesses implement our recommendations themselves. We're here if you need help, but there's no pressure.</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>How accurate is the audit?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>We use the same Google PageSpeed Insights API that Google uses internally, plus additional checks for SEO factors. It's the same data professional SEO agencies use.</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>Can I get audits for multiple websites?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>Yes! You can audit as many sites as you need. Perfect if you manage multiple locations or brands.</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>What should I do with the results?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>We prioritize issues by impact: Fix Critical issues first (biggest impact), address Warnings next (medium impact), implement Recommendations (nice-to-haves). Our PDF report includes step-by-step instructions.</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="h6 fw-bold mb-2" style={{ color: '#065F46' }}>Will you spam me after I submit?</h3>
                        <p className="mb-0" style={{ color: '#333' }}>No. You'll receive your audit results (immediate), PDF report (within 1 hour), and an optional follow-up email (3 days later). That's it. You can unsubscribe anytime.</p>
                      </div>
                    </Col>
                  </Row>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* Comparison Table Section */}
          <section className="py-5" style={{ background: '#f9fafb' }}>
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-3" style={{ color: '#0a0a0a' }}>Free Tool vs. Professional SEO Audit</h2>
                  <p className="text-center lead mb-5" style={{ color: '#666' }}>Start with the free audit. Need deeper analysis? We offer professional audits.</p>

                  {/* Desktop Table */}
                  <div className="table-responsive d-none d-md-block">
                    <table className="table table-hover" style={{ background: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}>
                      <thead style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                        <tr>
                          <th className="text-white fw-semibold p-3">Feature</th>
                          <th className="text-white fw-semibold p-3 text-center" style={{ background: 'rgba(255,255,255,0.1)' }}>Free Audit Tool</th>
                          <th className="text-white fw-semibold p-3 text-center">Professional Audit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ background: '#f9fafb' }}>
                          <td className="p-3"><strong>Time to Complete</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}>60 seconds</td>
                          <td className="p-3 text-center">2-3 days</td>
                        </tr>
                        <tr>
                          <td className="p-3"><strong>Factors Analyzed</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}>40+ SEO factors</td>
                          <td className="p-3 text-center">200+ factors</td>
                        </tr>
                        <tr style={{ background: '#f9fafb' }}>
                          <td className="p-3"><strong>Report Format</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}>PDF + Online</td>
                          <td className="p-3 text-center">50-page document</td>
                        </tr>
                        <tr>
                          <td className="p-3"><strong>Cost</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}><span className="fw-bold text-success">$0</span></td>
                          <td className="p-3 text-center">$500-2,000</td>
                        </tr>
                        <tr style={{ background: '#f9fafb' }}>
                          <td className="p-3"><strong>Support</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}>Self-service</td>
                          <td className="p-3 text-center">Expert consultation</td>
                        </tr>
                        <tr>
                          <td className="p-3"><strong>Implementation Help</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}>DIY instructions</td>
                          <td className="p-3 text-center">Done-for-you service</td>
                        </tr>
                        <tr style={{ background: '#f9fafb' }}>
                          <td className="p-3"><strong>Competitor Analysis</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}>Basic</td>
                          <td className="p-3 text-center">In-depth</td>
                        </tr>
                        <tr>
                          <td className="p-3"><strong>Custom Strategy</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}>General tips</td>
                          <td className="p-3 text-center">Tailored action plan</td>
                        </tr>
                        <tr style={{ background: '#f9fafb' }}>
                          <td className="p-3"><strong>Best For</strong></td>
                          <td className="p-3 text-center" style={{ background: '#DCFCE7' }}>Quick check</td>
                          <td className="p-3 text-center">Complete overhaul</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="d-md-none">
                    <div className="mb-4 p-4 rounded-3" style={{ background: '#DCFCE7', border: '2px solid #10B981' }}>
                      <h3 className="h5 fw-bold mb-3 text-center" style={{ color: '#065F46' }}>Free Audit Tool</h3>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2"><strong>Time:</strong> 60 seconds</li>
                        <li className="mb-2"><strong>Factors:</strong> 40+ SEO factors</li>
                        <li className="mb-2"><strong>Cost:</strong> <span className="text-success fw-bold">$0</span></li>
                        <li className="mb-2"><strong>Best for:</strong> Quick check</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-3" style={{ background: '#ffffff', border: '2px solid #E5E7EB' }}>
                      <h3 className="h5 fw-bold mb-3 text-center" style={{ color: '#0a0a0a' }}>Professional Audit</h3>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2"><strong>Time:</strong> 2-3 days</li>
                        <li className="mb-2"><strong>Factors:</strong> 200+ factors</li>
                        <li className="mb-2"><strong>Cost:</strong> $500-2,000</li>
                        <li className="mb-2"><strong>Best for:</strong> Complete overhaul</li>
                      </ul>
                    </div>
                  </div>

                  {/* Recommendation Box */}
                  <motion.div
                    className="mt-5 p-4 rounded-3 text-center"
                    style={{ background: '#EFF6FF', border: '2px solid #3B82F6' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <MessageSquare size={32} className="mb-3" style={{ color: '#1E40AF' }} />
                    <h4 className="h5 fw-bold mb-3" style={{ color: '#1E40AF' }}>💡 Our Recommendation</h4>
                    <p className="mb-3" style={{ color: '#333' }}>
                      Start with the free tool. If you score below 70/100 or find critical issues, consider our professional audit for deeper analysis and hands-on implementation support.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      className="fw-semibold"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)', border: 'none' }}
                    >
                      Start with Free Audit →
                    </Button>
                  </motion.div>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* What Happens After Section */}
          <section className="py-5">
            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center fw-bold mb-4" style={{ color: '#0a0a0a' }}>What Happens After You Get Your Audit?</h2>
                  <p className="text-center lead mb-5" style={{ color: '#555' }}>
                    You're in complete control. Here are your options:
                  </p>
                  <Row className="g-4">
                    <Col md={4}>
                      <motion.div
                        className="p-4 rounded-3 h-100"
                        style={{ background: '#EFF6FF', border: '2px solid #3B82F6' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '50px' }}>
                          <TrendingUp size={40} style={{ color: '#3B82F6' }} />
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#1E40AF' }}>DIY Implementation</h3>
                        <p className="mb-3" style={{ color: '#333' }}><strong>Best for:</strong> Tech-savvy teams with in-house resources</p>
                        <p className="mb-0" style={{ color: '#555' }}>Use our detailed report to fix issues yourself. We include step-by-step instructions, priority rankings, and expected impact for each recommendation.</p>
                      </motion.div>
                    </Col>
                    <Col md={4}>
                      <motion.div
                        className="p-4 rounded-3 h-100"
                        style={{ background: '#F0FDF4', border: '2px solid #10B981' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '50px' }}>
                          <Users size={40} style={{ color: '#10B981' }} />
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#065F46' }}>Partner with Nexolance</h3>
                        <p className="mb-3" style={{ color: '#333' }}><strong>Best for:</strong> Businesses that want guaranteed results</p>
                        <p className="mb-0" style={{ color: '#555' }}>We implement everything for you. Month-to-month contracts, transparent reporting, and a Kansas-based team that knows your market.</p>
                      </motion.div>
                    </Col>
                    <Col md={4}>
                      <motion.div
                        className="p-4 rounded-3 h-100"
                        style={{ background: '#FEF3C7', border: '2px solid #F59E0B' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '50px' }}>
                          <Phone size={40} style={{ color: '#F59E0B' }} />
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: '#92400E' }}>Free Consultation</h3>
                        <p className="mb-3" style={{ color: '#333' }}><strong>Best for:</strong> Anyone with questions</p>
                        <p className="mb-0" style={{ color: '#555' }}>15-minute call to walk through your results, answer questions, and provide strategic recommendations - no sales pitch, just helpful advice.</p>
                      </motion.div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5 p-4 rounded-3" style={{ background: '#F0FDF4', border: '2px solid #10B981' }}>
                    <p className="mb-0 fw-semibold" style={{ color: '#065F46', fontSize: '1.1rem' }}>
                      💯 Our Promise: Whether you work with us or not, you'll walk away with actionable insights to improve your SEO.
                    </p>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </section>

        </Container>
      </div>

      {/* Trust Signals Section */}
      <div style={{ background: '#f9fafb', position: 'relative', zIndex: 5, padding: '4rem 0' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Trust Badges */}
                <Row className="g-4 mb-5 text-center">
                  <Col xs={6} md={3}>
                    <div className="d-flex flex-column align-items-center">
                      <Shield size={40} className="mb-2" style={{ color: '#10B981' }} />
                      <p className="fw-semibold mb-1 small" style={{ color: '#0a0a0a' }}>🔒 SSL Secured</p>
                      <p className="mb-0 small" style={{ color: '#666' }}>Your data safe</p>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="d-flex flex-column align-items-center">
                      <CheckCircle size={40} className="mb-2" style={{ color: '#10B981' }} />
                      <p className="fw-semibold mb-1 small" style={{ color: '#0a0a0a' }}>✓ GDPR Compliant</p>
                      <p className="mb-0 small" style={{ color: '#666' }}>Privacy protected</p>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="d-flex flex-column align-items-center">
                      <Zap size={40} className="mb-2" style={{ color: '#10B981' }} />
                      <p className="fw-semibold mb-1 small" style={{ color: '#0a0a0a' }}>⚡ 500+ Audits</p>
                      <p className="mb-0 small" style={{ color: '#666' }}>Completed daily</p>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="d-flex flex-column align-items-center">
                      <MapPin size={40} className="mb-2" style={{ color: '#10B981' }} />
                      <p className="fw-semibold mb-1 small" style={{ color: '#0a0a0a' }}>📞 Kansas-Based</p>
                      <p className="mb-0 small" style={{ color: '#666' }}>Local support</p>
                    </div>
                  </Col>
                </Row>

                {/* Powered By */}
                <div className="text-center">
                  <p className="text-uppercase small fw-semibold mb-3" style={{ color: '#999', letterSpacing: '1px' }}>Powered by enterprise SEO tools</p>
                  <Row className="g-4 justify-content-center align-items-center">
                    <Col xs={6} md={4}>
                      <div className="p-3 rounded" style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}>
                        <Search size={24} className="d-inline me-2" style={{ color: '#10B981' }} />
                        <span className="fw-semibold" style={{ color: '#666' }}>Google PageSpeed Insights</span>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="p-3 rounded" style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}>
                        <BarChart3 size={24} className="d-inline me-2" style={{ color: '#10B981' }} />
                        <span className="fw-semibold" style={{ color: '#666' }}>Enterprise-grade analysis</span>
                      </div>
                    </Col>
                    <Col xs={12} md={4}>
                      <div className="p-3 rounded" style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}>
                        <Award size={24} className="d-inline me-2" style={{ color: '#10B981' }} />
                        <span className="fw-semibold" style={{ color: '#666' }}>$10,000/year tech stack</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Back to Dark Background for Final CTA */}
      <div style={{ background: '#0a0a0a', position: 'relative', zIndex: 5 }}>
        <Container className="position-relative py-5">
          {/* Final CTA Section */}
          <section className="py-5">
            <Row className="justify-content-center">
              <Col lg={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-5 rounded-3"
                  style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(102, 126, 234, 0.15) 100%)', border: '2px solid rgba(16, 185, 129, 0.4)', backdropFilter: 'blur(10px)' }}
                >
                  <h2 className="fw-bold mb-3 text-white">Ready to Dominate Local Search in Kansas?</h2>
                  <p className="lead mb-4 text-white">Join 500+ businesses that discovered and fixed hidden SEO issues</p>
                  <Button
                    size="lg"
                    className="btn-gradient fw-semibold px-5 mb-3"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{ fontSize: '1.2rem' }}
                  >
                    Get My Free SEO Audit Now →
                  </Button>
                  <div className="d-flex flex-wrap gap-4 justify-content-center small mt-4 text-white">
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={16} />
                      <span>Results in 60 seconds</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={16} />
                      <span>No credit card required</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={16} />
                      <span>Detailed PDF report included</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={16} />
                      <span>Free consultation available</span>
                    </div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </section>
        </Container>
      </div>

      {/* Related Resources Section */}
      <div style={{ background: '#ffffff', position: 'relative', zIndex: 5 }}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-center fw-bold mb-3" style={{ color: '#0a0a0a' }}>Free SEO Resources from Nexolance</h2>
                <p className="text-center lead mb-5" style={{ color: '#666' }}>Continue learning with our expert guides</p>

                <Row className="g-4">
                  <Col md={6} lg={3}>
                    <motion.div
                      className="p-4 rounded-3 h-100"
                      style={{ background: '#f9fafb', border: '2px solid #E5E7EB', cursor: 'pointer', transition: 'all 0.3s ease' }}
                      whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                      onClick={() => window.location.href = '/about-us'}
                    >
                      <BookOpen size={40} className="mb-3" style={{ color: '#10B981' }} />
                      <p className="small fw-semibold mb-2 text-uppercase" style={{ color: '#10B981', letterSpacing: '1px' }}>📚 Blog Post</p>
                      <h4 className="h6 fw-bold mb-2" style={{ color: '#0a0a0a' }}>10 SEO Mistakes Kansas Law Firms Make</h4>
                      <p className="small mb-3" style={{ color: '#666' }}>Learn the common pitfalls that cost law firms clients</p>
                      <span className="small fw-semibold" style={{ color: '#10B981' }}>→ Read More</span>
                    </motion.div>
                  </Col>

                  <Col md={6} lg={3}>
                    <motion.div
                      className="p-4 rounded-3 h-100"
                      style={{ background: '#f9fafb', border: '2px solid #E5E7EB', cursor: 'pointer', transition: 'all 0.3s ease' }}
                      whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                      onClick={() => window.location.href = '/services/local-seo'}
                    >
                      <MapPin size={40} className="mb-3" style={{ color: '#3B82F6' }} />
                      <p className="small fw-semibold mb-2 text-uppercase" style={{ color: '#3B82F6', letterSpacing: '1px' }}>📍 Local SEO Guide</p>
                      <h4 className="h6 fw-bold mb-2" style={{ color: '#0a0a0a' }}>How to Rank #1 in Google Maps</h4>
                      <p className="small mb-3" style={{ color: '#666' }}>Complete guide for Kansas businesses</p>
                      <span className="small fw-semibold" style={{ color: '#3B82F6' }}>→ Download Guide</span>
                    </motion.div>
                  </Col>

                  <Col md={6} lg={3}>
                    <motion.div
                      className="p-4 rounded-3 h-100"
                      style={{ background: '#f9fafb', border: '2px solid #E5E7EB', cursor: 'pointer', transition: 'all 0.3s ease' }}
                      whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                      onClick={() => window.location.href = '/about-us'}
                    >
                      <TrendingUp size={40} className="mb-3" style={{ color: '#F59E0B' }} />
                      <p className="small fw-semibold mb-2 text-uppercase" style={{ color: '#F59E0B', letterSpacing: '1px' }}>💼 Case Study</p>
                      <h4 className="h6 fw-bold mb-2" style={{ color: '#0a0a0a' }}>How We Helped a Law Firm Rank #1</h4>
                      <p className="small mb-3" style={{ color: '#666' }}>Real results from a Wichita law firm</p>
                      <span className="small fw-semibold" style={{ color: '#F59E0B' }}>→ View Case Study</span>
                    </motion.div>
                  </Col>

                  <Col md={6} lg={3}>
                    <motion.div
                      className="p-4 rounded-3 h-100"
                      style={{ background: '#f9fafb', border: '2px solid #E5E7EB', cursor: 'pointer', transition: 'all 0.3s ease' }}
                      whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                      onClick={() => window.location.href = '/quote'}
                    >
                      <Phone size={40} className="mb-3" style={{ color: '#EF4444' }} />
                      <p className="small fw-semibold mb-2 text-uppercase" style={{ color: '#EF4444', letterSpacing: '1px' }}>🎯 Free Consultation</p>
                      <h4 className="h6 fw-bold mb-2" style={{ color: '#0a0a0a' }}>Talk to an SEO Expert</h4>
                      <p className="small mb-3" style={{ color: '#666' }}>15-minute strategy call - no obligation</p>
                      <span className="small fw-semibold" style={{ color: '#EF4444' }}>→ Schedule Call</span>
                    </motion.div>
                  </Col>
                </Row>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
