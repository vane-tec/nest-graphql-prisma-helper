import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ModelUser } from "../models";

export const AUTHORIZATION_KEY = "authorization";
export const Authorize = (...authorizations: String[]) => SetMetadata(AUTHORIZATION_KEY, authorizations);

export const isAuthorized = (data: { reflector: Reflector; context: ExecutionContext }) => {
  const { reflector, context } = data;

  const authorizations = reflector.getAllAndOverride<String[]>(AUTHORIZATION_KEY, [context.getHandler(), context.getClass()]);

  if (!authorizations) return false;

  if(authorizations.includes("all")) return true;

  return authorizations.includes(ModelUser.get("role").toString());
};
