import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { isAuthorized } from "../decorators/authorization.decorator";
import { Reflector } from "@nestjs/core";
import { isPublic } from "../decorators";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (isPublic({ context, reflector: this.reflector })) {
      return true;
    }
    return isAuthorized({ context, reflector: this.reflector });
  }
}
