import { Resolver, Query, Args, Mutation, ResolveReference } from "@nestjs/graphql";
import { InterfaceCrud } from "../types";
import { Type } from "@nestjs/common";
import { AffectedRows } from "../schemas/prisma/affected-rows";

export function BaseCrudResolver<T, Aggregate, CreateMany, CreateOne, DeleteMany, DeleteOne, FindFirst, FindMany, FindUnique, UpdateMany, UpdateOne, GroupBy, GroupByEntity, AggregateEntity>(args: { classRef: Type<T>; AggregateArgs: Type<Aggregate>; CreateManyArgs: Type<CreateMany>; CreateOneArgs: Type<CreateOne>; DeleteManyArgs: Type<DeleteMany>; DeleteOneArgs: Type<DeleteOne>; FindFirstArgs: Type<FindFirst>; FindManyArgs: Type<FindMany>; FindUniqueArgs: Type<FindUnique>; UpdateManyArgs: Type<UpdateMany>; UpdateOneArgs: Type<UpdateOne>; GroupByArgs: Type<GroupBy>; GroupBy: Type<GroupByEntity>; Aggregate: Type<AggregateEntity> }) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    public constructor(public readonly service: InterfaceCrud) {}

    @Query(() => args.classRef, { nullable: true, name: `getFirst${args.classRef.name}` })
    public async findFirst(@Args({ type: () => args.FindFirstArgs }) args: FindFirst) {
      return await this.service.findFirst(args);
    }

    @Query(() => args.classRef, { nullable: false, name: `getUnique${args.classRef.name}` })
    public async findUnique(@Args({ type: () => args.FindUniqueArgs }) args: FindUnique) {
      return await this.service.findUnique(args);
    }

    @Query(() => [args.classRef], { nullable: false, name: `list${args.classRef.name}` })
    public async list(@Args({ type: () => args.FindManyArgs }) args: FindMany) {
      return await this.service.findMany(args);
    }

    @Query(() => [args.GroupBy], { nullable: false, name: `group${args.classRef.name}` })
    public async groupBy(@Args({ type: () => args.GroupByArgs }) args: GroupBy) {
      return await this.service.groupBy(args);
    }

    @Query(() => args.Aggregate, { nullable: false, name: `aggregate${args.classRef.name}` })
    public async aggregate(@Args({ type: () => args.AggregateArgs }) args: Aggregate) {
      return await this.service.aggregate(args);
    }

    @Mutation(() => args.classRef, { nullable: true, name: `add${args.classRef.name}` })
    public async create(@Args({ type: () => args.CreateOneArgs }) args: CreateOne) {
      return await this.service.create(args);
    }

    @Mutation(() => AffectedRows, { nullable: true, name: `add${args.classRef.name}` })
    public async createMany(@Args({ type: () => args.CreateManyArgs }) args: CreateMany) {
      return await this.service.createMany(args);
    }

    @Mutation(() => args.classRef, { nullable: true, name: `update${args.classRef.name}` })
    public async update(@Args({ type: () => args.UpdateOneArgs }) args: UpdateOne) {
      return await this.service.update(args);
    }

    @Mutation(() => AffectedRows, { nullable: true, name: `updateMany${args.classRef.name}` })
    public async updateMany(@Args({ type: () => args.UpdateManyArgs }) args: UpdateMany) {
      return await this.service.updateMany(args);
    }

    @Mutation(() => args.classRef, { nullable: true, name: `remove${args.classRef.name}` })
    public async delete(@Args({ type: () => args.DeleteOneArgs }) args: DeleteOne) {
      return await this.service.delete(args);
    }

    @Mutation(() => AffectedRows, { nullable: true, name: `removeMany${args.classRef.name}` })
    public async deleteMany(@Args({ type: () => args.DeleteManyArgs }) args: DeleteMany) {
      return await this.service.deleteMany(args);
    }

    @ResolveReference()
    public async resolveReference(reference: { __typename: string; id: number }): Promise<T> {
      return await this.findFirst({ where: { id: { equals: reference.id } } } as FindFirst);
    }
  }

  return BaseResolver;
}
