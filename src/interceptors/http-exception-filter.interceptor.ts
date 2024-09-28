// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
// import { Response, Request } from "express";

// @Catch(HttpException)
// export class HTTPExceptionFilter implements ExceptionFilter {
//   private logger = new Logger();

//   public constructor() {}

//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     const status = exception?.getStatut() ?? 201;
//     this.logger.error(`${request.method} ${request.originalUrl} ${status} error: ${exception.message}`);
//     const errorDetails = exception.getResponse();
//     response.status(400).json({ error: true, errorDetails });
//   }
// }
