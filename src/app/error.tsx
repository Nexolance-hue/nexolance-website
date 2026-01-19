'use client';

import { useEffect } from 'react';
import { ErrorDisplay } from '@/components/errors/ErrorDisplay';
import { errorLogger } from '@/lib/errors/errorLogger';
import { ErrorFactory } from '@/lib/errors/errorFactory';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const appError = ErrorFactory.createError(
      500,
      error.message,
      { digest: error.digest, stack: error.stack }
    );
    errorLogger.log(appError);
  }, [error]);

  return (
    <ErrorDisplay
      title="Server Error"
      message="We're experiencing technical difficulties. Our team has been notified and is working on a fix."
      statusCode={500}
      showHomeButton={true}
      showRefreshButton={true}
      showContactButton={true}
      onRefresh={reset}
    >
      <div className="rounded-3 p-3 mb-4" style={{
        background: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <p className="small mb-0" style={{ color: '#fcd34d' }}>
          <strong>Error ID:</strong> {error.digest || 'Unknown'}
          <br />
          <span style={{ color: 'rgba(252, 211, 77, 0.7)' }}>
            Please reference this ID when contacting support.
          </span>
        </p>
      </div>
    </ErrorDisplay>
  );
}
