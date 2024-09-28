import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.getArgs()[3]; // 4th argument is the context
        const response = exception.getResponse() as any;
        const errorResponse = {
            statusCode: exception.getStatus(),
            message: response["message"] || exception.message,
            error: response["error"] || "Internal Server Error",
            timestamp: (new Date).toISOString(),
            path: ctx?.req?.url ?? null,
        };
        return new GraphQLError(JSON.stringify(errorResponse))
    }

}