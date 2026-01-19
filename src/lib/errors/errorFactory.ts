import { ErrorType, AppError } from './types';

export class ErrorFactory {
  static createError(
    statusCode: number,
    technicalMessage: string,
    details?: any
  ): AppError {
    const type = this.getErrorType(statusCode);
    const userMessage = this.getUserMessage(statusCode, type);
    const retryable = this.isRetryable(statusCode);
    const fallbackAction = this.getFallbackAction(statusCode);

    return {
      type,
      statusCode,
      message: technicalMessage,
      userMessage,
      details,
      timestamp: new Date(),
      retryable,
      fallbackAction
    };
  }

  private static getErrorType(statusCode: number): ErrorType {
    if (statusCode === 404) return ErrorType.NOT_FOUND;
    if (statusCode === 401) return ErrorType.AUTHENTICATION;
    if (statusCode === 403) return ErrorType.AUTHORIZATION;
    if (statusCode === 429) return ErrorType.RATE_LIMIT;
    if (statusCode === 408 || statusCode === 504) return ErrorType.TIMEOUT;
    if (statusCode >= 400 && statusCode < 500) return ErrorType.VALIDATION;
    if (statusCode >= 500) return ErrorType.SERVER;
    return ErrorType.UNKNOWN;
  }

  private static getUserMessage(statusCode: number, type: ErrorType): string {
    const messages: Record<number, string> = {
      400: "Please check your input and try again.",
      401: "You need to sign in to access this resource.",
      403: "You don't have permission to access this resource.",
      404: "We couldn't find what you're looking for.",
      408: "The request took too long. Please try again.",
      429: "You're making too many requests. Please wait a moment and try again.",
      500: "Something went wrong on our end. We're working to fix it.",
      502: "We're having trouble connecting to our services. Please try again shortly.",
      503: "Our service is temporarily unavailable. Please try again in a few minutes.",
      504: "The request timed out. Please try again."
    };

    return messages[statusCode] || "An unexpected error occurred. Please try again.";
  }

  private static isRetryable(statusCode: number): boolean {
    // Retryable: timeouts, rate limits, server errors
    return [408, 429, 500, 502, 503, 504].includes(statusCode);
  }

  private static getFallbackAction(statusCode: number): string {
    const actions: Record<number, string> = {
      429: "call_support",
      500: "contact_form",
      503: "try_later",
      404: "go_home"
    };

    return actions[statusCode] || "contact_support";
  }
}
