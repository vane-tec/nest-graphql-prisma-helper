import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const isPublic = (data: { reflector: Reflector; context: ExecutionContext }) => {
  const { context, reflector } = data;
  return reflector.getAllAndOverride<boolean[]>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);
};
