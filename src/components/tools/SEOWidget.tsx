'use client';

import { useEffect, useRef, useState } from 'react';

export default function SEOWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;
    let linkElement: HTMLLinkElement | null = null;

    const loadWidget = () => {
      try {
        // Check if CSS is already loaded
        const existingLink = document.querySelector('link[href*="api.seoaudit.software"]');
        if (!existingLink) {
          // Load CSS
          linkElement = document.createElement('link');
          linkElement.rel = 'stylesheet';
          linkElement.type = 'text/css';
          linkElement.href = 'https://api.seoaudit.software/files/widget/v3.1/css/style.min.css';
          document.head.appendChild(linkElement);
        }

        // Check if script is already loaded
        const existingScript = document.querySelector('script[src*="api.seoaudit.software"]');
        if (!existingScript) {
          // Load JS
          scriptElement = document.createElement('script');
          scriptElement.src = 'https://api.seoaudit.software/files/widget/v3.1/js/api.min.js';
          scriptElement.async = false; // Load synchronously for reliability

          scriptElement.onload = () => {
            console.log('SEO Audit Widget script loaded');
            initializeWidget();
          };

          scriptElement.onerror = () => {
            console.error('Failed to load SEO Audit Widget script');
            setError('Failed to load widget. Please refresh the page.');
          };

          document.body.appendChild(scriptElement);
        } else {
          // Script already exists, try to initialize
          initializeWidget();
        }
      } catch (err) {
        console.error('Error loading widget:', err);
        setError('Error loading widget');
      }
    };

    const initializeWidget = () => {
      // Try to initialize multiple times with delays
      const attempts = [100, 500, 1000, 2000];

      attempts.forEach((delay) => {
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).SAS_widget) {
            try {
              new (window as any).SAS_widget('#sas-widget-8cbcaf530edba0a1aa7f31878f8043b8');
              console.log('Widget initialized successfully');
              setIsLoaded(true);
            } catch (e) {
              console.log('Widget initialization attempt:', e);
            }
          } else {
            console.log('SAS_widget not available yet, attempt at:', delay, 'ms');
          }
        }, delay);
      });
    };

    loadWidget();

    // Cleanup function
    return () => {
      // Don't remove global scripts to avoid issues with multiple widget instances
      // The scripts can be safely kept in the DOM
    };
  }, []);

  return (
    <div>
      {error && (
        <div className="alert alert-warning mb-3" role="alert">
          {error}
        </div>
      )}
      <div
        ref={widgetRef}
        className="sas-widget"
        id="sas-widget-8cbcaf530edba0a1aa7f31878f8043b8"
        data-url="https://api.seoaudit.software"
        data-key="8cbcaf530edba0a1aa7f31878f8043b8"
      ></div>
      {!isLoaded && !error && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading widget...</span>
          </div>
          <p className="mt-3 text-muted">Loading SEO Audit Tool...</p>
        </div>
      )}
    </div>
  );
}
