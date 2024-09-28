import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ModelUser } from "../models";
import { Reflector } from "@nestjs/core";
import { isPublic } from "../decorators";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (isPublic({ context, reflector: this.reflector })) return true;
    return ModelUser.user != null;
  }
}
