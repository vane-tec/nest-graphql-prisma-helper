import { ExecutionContext, INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { env } from "process";
import dotenv from "dotenv";

export const extractTokenFromHeader = (data: { prefix: string; request?: any } = { prefix: "Bearer" }): string | null => {
  const { prefix, request } = data;
  const [type, token] = request?.headers?.authorization?.split(" ") ?? [];
  return type == prefix ? token : null;
};

export const GQLContext = (data: { context: ExecutionContext }) => {
  const { context } = data;
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext();
};

export const bootApp = async <T>(args: { appModule: T; port?: number; envPath?: string[] }, onBooting?: (app: INestApplication) => void) => {
  if (args?.envPath) dotenv.config({ path: args.envPath });
  const { appModule } = args;
  const app = await NestFactory.create(appModule);
  const options = { options: { port: 2000 } };
  const PORT = args.port ?? env.PORT ?? env.port ?? 3000; // env.port
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  if (onBooting) await onBooting(app);

  await app.listen(options.options.port).then(() => console.log(`App Started On Port : ${options.options.port}`));
};
