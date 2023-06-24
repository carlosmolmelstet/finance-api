import { CustomError } from "@helpers/error.helper";
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";

@Catch(CustomError)
export class CustomErrorFilter implements ExceptionFilter {
  catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resposta = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    resposta.status(statusCode).json({
      message: exception.message,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
