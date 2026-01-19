export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationRules {
  [field: string]: ValidationRule;
}

export interface ValidationError {
  field: string;
  message: string;
}

export class FormValidator {
  static validate(
    data: Record<string, any>,
    rules: ValidationRules
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const [field, rule] of Object.entries(rules)) {
      const value = data[field];
      const error = this.validateField(field, value, rule);

      if (error) {
        errors.push(error);
      }
    }

    return errors;
  }

  private static validateField(
    field: string,
    value: any,
    rule: ValidationRule
  ): ValidationError | null {
    // Required check
    if (rule.required && !value) {
      return {
        field,
        message: rule.message || `${this.formatFieldName(field)} is required`
      };
    }

    // Skip other checks if value is empty and not required
    if (!value) return null;

    // Min length
    if (rule.minLength && value.length < rule.minLength) {
      return {
        field,
        message: rule.message || `${this.formatFieldName(field)} must be at least ${rule.minLength} characters`
      };
    }

    // Max length
    if (rule.maxLength && value.length > rule.maxLength) {
      return {
        field,
        message: rule.message || `${this.formatFieldName(field)} must be no more than ${rule.maxLength} characters`
      };
    }

    // Pattern match
    if (rule.pattern && !rule.pattern.test(value)) {
      return {
        field,
        message: rule.message || `${this.formatFieldName(field)} format is invalid`
      };
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      return {
        field,
        message: rule.message || `${this.formatFieldName(field)} is invalid`
      };
    }

    return null;
  }

  private static formatFieldName(field: string): string {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  // Common validation rules
  static rules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    phone: {
      required: true,
      pattern: /^[\d\s\-\(\)\+]+$/,
      minLength: 10,
      message: 'Please enter a valid phone number'
    },
    url: {
      required: true,
      pattern: /^https?:\/\/.+/,
      message: 'Please enter a valid URL starting with http:// or https://'
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      message: 'Please enter your full name'
    }
  };
}
