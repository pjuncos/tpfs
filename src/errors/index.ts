import { Response } from "express";
export class AppError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "AppError";
    this.code = code;
  }
}

export class AuthenticationError extends AppError {
  constructor(message?: string) {
    const msg = message ?? "Must be authenticated";
    super(msg, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message?: string) {
    const msg = message ?? "Not authorized";
    super(msg, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export function handleControllerError(
  error: unknown,
  res: Response,
  defaultMessage?: string,
  status?: number
) {
  let message;
  let code = status ?? 500;
  if (error instanceof AppError) {
    code = error.code;
    message = error.message;
  } else if (error instanceof Error) {
    if (error.name === "ValidationError") {
      // Mongoose
      code = 400;
    }
    message = error.message;
  } else {
    if (defaultMessage) {
      message = defaultMessage;
    } else {
      message = new String(error);
    }
  }
  console.log(error);
  res.status(code).json({ message });
}
