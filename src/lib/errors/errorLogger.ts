import { AppError, ErrorLogEntry } from './types';

class ErrorLogger {
  private logs: ErrorLogEntry[] = [];
  private maxLogs = 100;

  log(error: AppError, context?: any) {
    const entry: ErrorLogEntry = {
      id: this.generateId(),
      error,
      context: {
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        ...context
      },
      timestamp: new Date()
    };

    this.logs.unshift(entry);

    // Keep only last 100 logs in memory
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', entry);
    }

    // Send to external logging service (optional)
    this.sendToExternalService(entry);

    // Store critical errors in localStorage for debugging
    if (error.statusCode >= 500) {
      this.storeInLocalStorage(entry);
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private sendToExternalService(entry: ErrorLogEntry) {
    // TODO: Integrate with Sentry, LogRocket, or your logging service
    // Example:
    // Sentry.captureException(new Error(entry.error.message), {
    //   extra: entry
    // });
  }

  private storeInLocalStorage(entry: ErrorLogEntry) {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem('nexolance_errors') || '[]';
      const errors = JSON.parse(stored);
      errors.unshift(entry);

      // Keep last 20 critical errors
      const limited = errors.slice(0, 20);
      localStorage.setItem('nexolance_errors', JSON.stringify(limited));
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  getLogs(): ErrorLogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nexolance_errors');
    }
  }
}

export const errorLogger = new ErrorLogger();
