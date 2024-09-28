import { OnModuleInit, OnModuleDestroy, INestApplication } from "@nestjs/common";
import { DBProivers } from "../conf";
import { env } from "process";

type TypePrismaClien = new (...args: any[]) => any;

export function BasePrismaService<T>(PrismaClientClass: TypePrismaClien, args: { provider: keyof typeof DBProivers; dbname: string; dbhost?: string; dbuser?: string; dbpassword?: string; schema?: string; dbprefix?: string }) {
  abstract class Base implements OnModuleInit, OnModuleDestroy {
    public readonly db: T;

    public constructor() {
      try {
        const db_prefix = args.dbprefix ?? env.DB_PREFIX ?? "";
        const url =
          `${db_prefix}` +
          DBProivers[args.provider]
            .replace("$dbuser", args.dbuser ?? env.DB_USER ?? "test")
            .replace("$dbpassword", args.dbpassword ?? env.DB_PASSWORD ?? "")
            .replace("$dbhost", args.dbhost ?? env.DB_HOST ?? "localhost")
            .replace("$dbname", args.dbname)
            .replace("$schema", args.schema ?? env.DB_SCHEMA ?? "public");
        this.db = new PrismaClientClass()({ datasources: { db: { url } }, errorFormat: "colorless", log: [] });
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    }

    public async onModuleInit() {
      await (this.db as any).$connect();
    }

    public async onModuleDestroy() {
      await (this.db as any).$disconnect();
    }

    public async enableShutdownHooks(app: INestApplication) {
      await app.close();
    }
  }
  return Base;
}
