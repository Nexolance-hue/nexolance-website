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

        // Always try to load the script (it won't reload if already there)
        scriptElement = document.createElement('script');
        scriptElement.src = 'https://api.seoaudit.software/files/widget/v3.1/js/api.min.js';
        scriptElement.async = true;

        // Check if already loaded first
        const existingScript = document.querySelector('script[src*="api.seoaudit.software"]');

        scriptElement.onload = () => {
          console.log('SEO Audit Widget script loaded successfully');
          console.log('Checking window object for SAS_widget...');
          console.log('typeof window.SAS_widget:', typeof (window as any).SAS_widget);
          console.log('window object keys (filtered):', Object.keys(window).filter(k => k.includes('SAS') || k.includes('sas')));
          setTimeout(() => {
            console.log('After delay - typeof window.SAS_widget:', typeof (window as any).SAS_widget);
            initializeWidget();
          }, 500);
        };

        scriptElement.onerror = (e) => {
          console.error('Failed to load SEO Audit Widget script:', e);
          setError('Failed to load widget. Please check your internet connection and refresh the page.');
        };

        if (!existingScript) {
          console.log('Loading widget script...');
          document.body.appendChild(scriptElement);
        } else {
          console.log('Script already exists, initializing...');
          initializeWidget();
        }
      } catch (err) {
        console.error('Error loading widget:', err);
        setError('Error loading widget');
      }
    };

    const initializeWidget = () => {
      console.log('Attempting to initialize widget...');
      console.log('Window.SAS_widget exists?', typeof (window as any).SAS_widget !== 'undefined');

      if (typeof window !== 'undefined' && (window as any).SAS_widget) {
        try {
          console.log('Initializing SAS_widget...');
          new (window as any).SAS_widget('#sas-widget-8cbcaf530edba0a1aa7f31878f8043b8');
          console.log('Widget initialized successfully!');
          setIsLoaded(true);
          return true;
        } catch (e) {
          console.error('Widget initialization error:', e);
          setError('Widget initialization failed. Please refresh the page.');
          return false;
        }
      }

      // If not available, try again with delays
      const attempts = [500, 1500, 3000, 5000];
      attempts.forEach((delay) => {
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).SAS_widget && !isLoaded) {
            try {
              new (window as any).SAS_widget('#sas-widget-8cbcaf530edba0a1aa7f31878f8043b8');
              console.log('Widget initialized successfully after', delay, 'ms delay');
              setIsLoaded(true);
            } catch (e) {
              console.log('Widget initialization attempt failed at', delay, 'ms:', e);
            }
          } else if (!isLoaded) {
            console.log('SAS_widget still not available at:', delay, 'ms');
            if (delay === 5000) {
              setError('Widget failed to load. Please refresh the page or check your internet connection.');
            }
          }
        }, delay);
      });

      return false;
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
