'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>500</h1>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
              Critical Error
            </h2>
            <p style={{ marginBottom: '30px', opacity: 0.8 }}>
              Something went seriously wrong. Please refresh the page or contact support.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            <p style={{ marginTop: '30px', fontSize: '14px', opacity: 0.6 }}>
              Error ID: {error.digest || 'Unknown'}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
