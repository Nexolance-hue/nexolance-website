'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Home, RefreshCw, Phone, Mail } from 'lucide-react';

interface ErrorDisplayProps {
  title: string;
  message: string;
  statusCode?: number;
  showHomeButton?: boolean;
  showRefreshButton?: boolean;
  showContactButton?: boolean;
  onRefresh?: () => void;
  children?: React.ReactNode;
}

export function ErrorDisplay({
  title,
  message,
  statusCode,
  showHomeButton = true,
  showRefreshButton = false,
  showContactButton = true,
  onRefresh,
  children
}: ErrorDisplayProps) {
  const router = useRouter();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-4" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)'
    }}>
      <div className="w-100" style={{ maxWidth: '700px' }}>
        {/* Error Card */}
        <div className="rounded-4 p-4 p-md-5 border" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}>
          {/* Icon */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle p-3" style={{
              background: 'rgba(239, 68, 68, 0.2)'
            }}>
              <AlertCircle className="text-danger" size={48} />
            </div>
          </div>

          {/* Status Code */}
          {statusCode && (
            <div className="text-center mb-3">
              <span className="display-1 fw-bold" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {statusCode}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="display-5 fw-bold text-white text-center mb-3">
            {title}
          </h1>

          {/* Message */}
          <p className="lead text-center mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {message}
          </p>

          {/* Custom Content */}
          {children && (
            <div className="mb-4">
              {children}
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
            {showRefreshButton && (
              <button
                onClick={handleRefresh}
                className="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2 fw-semibold"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none'
                }}
              >
                <RefreshCw size={20} />
                Try Again
              </button>
            )}

            {showHomeButton && (
              <button
                onClick={handleGoHome}
                className="btn btn-lg d-flex align-items-center justify-content-center gap-2 fw-semibold text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Home size={20} />
                Go Home
              </button>
            )}
          </div>

          {/* Contact Options */}
          {showContactButton && (
            <div className="pt-4 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.1) !important' }}>
              <p className="text-center mb-3" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Need immediate assistance?
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a
                  href="tel:8163679231"
                  className="btn btn-lg d-flex align-items-center justify-content-center gap-2 fw-semibold text-decoration-none"
                  style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#93c5fd',
                    border: 'none'
                  }}
                >
                  <Phone size={20} />
                  (816) 367-9231
                </a>
                <a
                  href="mailto:info@nexolance.agency"
                  className="btn btn-lg d-flex align-items-center justify-content-center gap-2 fw-semibold text-decoration-none"
                  style={{
                    background: 'rgba(168, 85, 247, 0.2)',
                    color: '#d8b4fe',
                    border: 'none'
                  }}
                >
                  <Mail size={20} />
                  Email Us
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Nexolance Branding */}
        <div className="text-center mt-4">
          <p className="small mb-0" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            © 2026 Nexolance Digital Marketing Agency
          </p>
        </div>
      </div>
    </div>
  );
}
