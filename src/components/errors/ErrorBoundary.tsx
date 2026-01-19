'use client';

import React, { Component, ReactNode } from 'react';
import { errorLogger } from '@/lib/errors/errorLogger';
import { ErrorFactory } from '@/lib/errors/errorFactory';
import { ErrorDisplay } from './ErrorDisplay';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const appError = ErrorFactory.createError(
      500,
      error.message,
      { stack: error.stack, componentStack: errorInfo.componentStack }
    );

    errorLogger.log(appError, {
      component: 'ErrorBoundary',
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorDisplay
          title="Something Went Wrong"
          message="We encountered an unexpected error. Please try refreshing the page."
          statusCode={500}
          showHomeButton={true}
          showRefreshButton={true}
          onRefresh={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
