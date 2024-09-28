import { UnauthorizedException } from "@nestjs/common";
import { TypeUser } from "../types";

export class ModelUser {
  private static _user: TypeUser;

  public static get user() {
    return ModelUser._user;
  }

  public static set user(user: TypeUser) {
    ModelUser._user = user;
  }

  public static get<T>(key: keyof typeof ModelUser._user) {
    if (!ModelUser._user) throw new UnauthorizedException();
    key = ModelUser.user[key] ?? null;
    return key;
  }
}
