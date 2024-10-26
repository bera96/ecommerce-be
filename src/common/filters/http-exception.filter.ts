import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';

  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      let errors = [];

      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as any;

        if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
          message = Array.isArray(exceptionResponse.message)
            ? 'Validation error'
            : exceptionResponse.message;
          errors = Array.isArray(exceptionResponse.message)
            ? exceptionResponse.message
            : [exceptionResponse.message];
        } else {
          message = exception.message;
        }
      } else if (exception instanceof Error) {
        message = exception.message;
      }

      response.status(status).json({
        statusCode: status,
        message: message,
        errors: errors,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }