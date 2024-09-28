import { UnauthorizedException } from "@nestjs/common";
import { EnumCrud, InterfaceCrud, InterfaceGuard } from "../types";
import { ModelUser } from "../models";
import { EventEmitter2 } from "@nestjs/event-emitter";

export abstract class BaseCrudService<T, PrismaService, FindFirstArg, FindUniqueArg, FindManyArg, GroupByArg, AggregateArg, CreateArg, CreateManyArg, UpdateArg, UpdatedManyArg, DeleteArg, DeleteManyArg> implements InterfaceCrud {
  protected _guards: InterfaceGuard | undefined;

  protected abstract readonly guards: InterfaceGuard;

  readonly [x: number]: (args: unknown) => Promise<T | T[]>;

  public constructor(protected readonly prisma: PrismaService, protected readonly eventEmitter: EventEmitter2, protected readonly args?: { guards?: InterfaceGuard }) {
    this._guards = args?.guards ?? {};
  }

  public async findFirst<P>(args: FindFirstArg): Promise<T | null> {
    this.guard({ method: "findFirst", data: args });
    const record = await (this.prisma as any).db[this.getModelName()].findFirst(args);
    return record;
  }

  public async findUnique<P>(args: FindUniqueArg): Promise<T | null> {
    this.guard({ method: "findUnique", data: args });
    const record = await (this.prisma as any).db[this.getModelName()].findUnique(args);
    return record;
  }

  public async findMany<P>(args: FindManyArg): Promise<T[]> {
    this.guard({ method: "findMany", data: args });
    const records = (this.prisma as any).db[this.getModelName()].findMany(args);
    return records;
  }

  public async groupBy<P>(args: GroupByArg): Promise<P[]> {
    this.guard({ method: "groupBy", data: args });
    const records = await (this.prisma as any).db[this.getModelName()].groupBy(args);
    return records;
  }

  public async aggregate<P>(args: AggregateArg): Promise<P> {
    this.guard({ method: "aggregate", data: args });
    const record = await (this.prisma as any).db[this.getModelName()].aggregate(args);
    return record;
  }

  public async create<P>(args: CreateArg): Promise<T> {
    this.guard({ method: "create", data: args });
    const [record] = await (this.prisma as any).db["$transaction"]([(this.prisma as any).db[this.getModelName()].create(args)]);
    return record;
  }

  public async createMany<P>(args: CreateManyArg): Promise<P> {
    this.guard({ method: "createMany", data: args });
    const [record] = await (this.prisma as any).db["$transaction"]([(this.prisma as any).db[this.getModelName()].createMany(args)]);
    return record;
  }

  public async update(args: UpdateArg): Promise<T> {
    this.guard({ method: "update", data: args });
    const [record] = await (this.prisma as any).db["$transaction"]([(this.prisma as any).db[this.getModelName()].update(args)]);
    return record;
  }

  public async updateMany<P>(args: UpdatedManyArg): Promise<P> {
    this.guard({ method: "updateMany", data: args });
    const [record] = await (this.prisma as any).db["$transaction"]([(this.prisma as any).db[this.getModelName()].updateMany(args)]);
    return record;
  }

  public async delete(args: DeleteArg): Promise<T> {
    this.guard({ method: "delete", data: args });
    const [record] = await (this.prisma as any).db["$transaction"]([(this.prisma as any).db[this.getModelName()].delete(args)]);
    return record;
  }

  public async deleteMany<P>(args: DeleteManyArg): Promise<P> {
    this.guard({ method: "deleteMany", data: args });
    const [record] = await await (this.prisma as any).db["$transaction"]([(this.prisma as any).db[this.getModelName()].deleteMany(args)]);
    return record;
  }

  private getModelName(): string {
    return this.constructor.name.replace("Service", "");
  }

  protected setGuards(guards: InterfaceGuard) {
    this._guards = guards;
  }

  public getGuards() {
    return this._guards ?? {};
  }

  private guard(args: { method: keyof typeof EnumCrud; data?: any }) {
    const { method, data } = args;

    if (!this._guards) throw new UnauthorizedException();
    if (this._guards[method]?.includes("public")) return;
    if (!this._guards[method]?.includes(ModelUser.user.role) || !this._guards[method]?.includes("all")) throw new UnauthorizedException();

    // dispach event data methods
    return this.eventEmitter.emit(`service.${method}.input`, data);
  }
}
