export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode: number = 400, code: string = 'APP_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
  }
}

export function handleApiError(error: any) {
  console.error('🔴 API Error:', error);

  // Don't expose sensitive DB/Internal errors to client
  if (error instanceof AppError) {
    return {
      error: error.message,
      code: error.code,
      status: error.statusCode,
    };
  }

  // Supabase errors
  if (error.code && error.message && error.details) {
    return {
      error: 'An internal database error occurred.',
      code: 'DATABASE_ERROR',
      status: 500,
    };
  }

  return {
    error: 'An unexpected error occurred.',
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
  };
}
