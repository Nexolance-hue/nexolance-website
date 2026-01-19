import { ErrorFactory } from './errorFactory';
import { errorLogger } from './errorLogger';
import { AppError } from './types';

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  retryableStatuses: number[];
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 30000,
  retryableStatuses: [408, 429, 500, 502, 503, 504]
};

export class APIErrorHandler {
  static async fetchWithRetry<T>(
    url: string,
    options: RequestInit = {},
    retryConfig: Partial<RetryConfig> = {}
  ): Promise<T> {
    const config = { ...defaultRetryConfig, ...retryConfig };
    let lastError: AppError | null = null;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);

        // Success - return data
        if (response.ok) {
          const data = await response.json();
          return data as T;
        }

        // Create error from response
        const errorText = await response.text().catch(() => 'Unknown error');
        lastError = ErrorFactory.createError(
          response.status,
          errorText,
          { url, attempt }
        );

        // Check if retryable
        if (
          attempt < config.maxRetries &&
          config.retryableStatuses.includes(response.status)
        ) {
          const delay = this.calculateDelay(attempt, config);
          console.log(`Retry attempt ${attempt + 1} after ${delay}ms for ${url}`);
          await this.sleep(delay);
          continue;
        }

        // Not retryable - throw error
        throw lastError;

      } catch (error: any) {
        // Network error or fetch failed
        if (!error.statusCode) {
          lastError = ErrorFactory.createError(
            0,
            error.message || 'Network error',
            { url, attempt }
          );
        }

        // Retry on network errors
        if (attempt < config.maxRetries) {
          const delay = this.calculateDelay(attempt, config);
          console.log(`Network error - retry ${attempt + 1} after ${delay}ms`);
          await this.sleep(delay);
          continue;
        }

        throw lastError;
      }
    }

    // Max retries exhausted
    if (lastError) {
      errorLogger.log(lastError, { url, attempts: config.maxRetries + 1 });
      throw lastError;
    }

    throw ErrorFactory.createError(500, 'Unknown error after retries', { url });
  }

  private static calculateDelay(attempt: number, config: RetryConfig): number {
    // Exponential backoff: baseDelay * 2^attempt
    const exponentialDelay = config.baseDelay * Math.pow(2, attempt);

    // Add jitter (random 0-1000ms) to prevent thundering herd
    const jitter = Math.random() * 1000;

    // Cap at maxDelay
    return Math.min(exponentialDelay + jitter, config.maxDelay);
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static handleError(error: AppError): never {
    errorLogger.log(error);
    throw error;
  }
}
