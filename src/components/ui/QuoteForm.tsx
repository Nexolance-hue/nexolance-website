'use client';

import { useState, FormEvent } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { services } from '@/data/services';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceInterest: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  serviceInterest?: string;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceInterest: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmittingWhatsApp, setIsSubmittingWhatsApp] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone) || formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Service Interest validation
    if (!formData.serviceInterest) {
      newErrors.serviceInterest = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleWhatsAppSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    if (!validateForm()) {
      return;
    }

    setIsSubmittingWhatsApp(true);

    try {
      // Format WhatsApp message
      const serviceName = services.find(s => s.slug === formData.serviceInterest)?.name || formData.serviceInterest;
      const currentDateTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        dateStyle: 'full',
        timeStyle: 'short'
      });

      const whatsappMessage = `🚀 NEW LEAD - Nexolance Agency

👤 CONTACT INFO
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}${formData.companyName ? `\nCompany: ${formData.companyName}` : ''}

💼 SERVICE INTEREST
${serviceName}${formData.message ? `

📝 PROJECT DETAILS
${formData.message}` : ''}

⏰ Submitted: ${currentDateTime}`;

      // Open WhatsApp in new tab
      const whatsappNumber = '18163679231';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Success
      setSubmitStatus({
        type: 'success',
        message:
          'Thank you! Your request has been sent via WhatsApp. We\'ll contact you within 24 hours.',
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceInterest: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          'Sorry, there was an error. Please try again or call us at (816) 367-9231.',
      });
      console.error('WhatsApp submission error:', error);
    } finally {
      setIsSubmittingWhatsApp(false);
    }
  };

  const handleEmailSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    if (!validateForm()) {
      return;
    }

    setIsSubmittingEmail(true);

    try {
      // Format email message
      const serviceName = services.find(s => s.slug === formData.serviceInterest)?.name || formData.serviceInterest;

      const emailSubject = `New Lead - ${formData.fullName}`;
      const emailBody = `NEW LEAD - Nexolance Agency

CONTACT INFO
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}${formData.companyName ? `\nCompany: ${formData.companyName}` : ''}

SERVICE INTEREST
${serviceName}${formData.message ? `

PROJECT DETAILS
${formData.message}` : ''}`;

      // Open email client
      const mailtoUrl = `mailto:info@nexolance.agency?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;

      // Success
      setSubmitStatus({
        type: 'success',
        message:
          'Thank you! Your email client has been opened. Please send the email to complete your request.',
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceInterest: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          'Sorry, there was an error. Please email us directly at info@nexolance.agency',
      });
      console.error('Email submission error:', error);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="quote-form-modern">
      {submitStatus.type && (
        <Alert
          variant={submitStatus.type === 'success' ? 'success' : 'danger'}
          onClose={() => setSubmitStatus({ type: null, message: '' })}
          dismissible
          className="mb-4"
        >
          {submitStatus.message}
        </Alert>
      )}

      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label className="text-white">
            Full Name <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            isInvalid={!!errors.fullName}
            placeholder="John Smith"
            disabled={isSubmittingWhatsApp || isSubmittingEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="text-white">
            Email Address <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="john@company.com"
            disabled={isSubmittingWhatsApp || isSubmittingEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label className="text-white">
            Phone Number <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
            placeholder="(913) 555-0100"
            disabled={isSubmittingWhatsApp || isSubmittingEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="companyName">
          <Form.Label className="text-white">Company Name</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="ABC Company (optional)"
            disabled={isSubmittingWhatsApp || isSubmittingEmail}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="serviceInterest">
          <Form.Label className="text-white">
            Service Interest <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            isInvalid={!!errors.serviceInterest}
            disabled={isSubmittingWhatsApp || isSubmittingEmail}
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="not-sure">Not Sure / Need Consultation</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.serviceInterest}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="message">
          <Form.Label className="text-white">Additional Information</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your business and marketing goals (optional)"
            disabled={isSubmittingWhatsApp || isSubmittingEmail}
          />
        </Form.Group>

        <div className="d-grid gap-3">
          <Button
            variant="success"
            size="lg"
            onClick={handleWhatsAppSubmit}
            disabled={isSubmittingWhatsApp || isSubmittingEmail}
            className="fw-semibold d-flex align-items-center justify-content-center"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
            }}
          >
            {isSubmittingWhatsApp ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Opening WhatsApp...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                Send to WhatsApp
              </>
            )}
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handleEmailSubmit}
            disabled={isSubmittingWhatsApp || isSubmittingEmail}
            className="fw-semibold d-flex align-items-center justify-content-center"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}
          >
            {isSubmittingEmail ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Opening Email...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
                Send via Email
              </>
            )}
          </Button>
        </div>

        <p className="small mt-3 mb-0 text-center" style={{ opacity: 0.7 }}>
          We respect your privacy. Your information will never be shared.
        </p>
      </Form>
    </div>
  );
}
