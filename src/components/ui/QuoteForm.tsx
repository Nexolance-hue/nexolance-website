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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

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
          'Thank you! Your request has been sent via email and WhatsApp. We\'ll contact you within 24 hours.',
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
          'Sorry, there was an error submitting your request. Please try again or call us at (816) 367-9231.',
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
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

      <Form onSubmit={handleSubmit}>
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-100 btn-gradient fw-semibold"
        >
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Sending to WhatsApp...
            </>
          ) : (
            'Get Free Assessment'
          )}
        </Button>

        <p className="small mt-3 mb-0 text-center" style={{ opacity: 0.7 }}>
          We respect your privacy. Your information will never be shared.
        </p>
      </Form>
    </div>
  );
}
