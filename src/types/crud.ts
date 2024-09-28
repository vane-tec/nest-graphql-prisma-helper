export enum EnumCrud {
  findFirst,
  findUnique,
  findMany,
  groupBy,
  aggregate,
  create,
  createMany,
  update,
  updateMany,
  delete,
  deleteMany,
}

export type TypeCrudMethods = {
  [K in keyof typeof EnumCrud]: (args: any) => Promise<any>;
};

export interface InterfaceCrud extends TypeCrudMethods {}

export type TypeCrudGuard = {
  [K in keyof typeof EnumCrud]?: String[];
};

export type TypeDBProvider = {};

/**
 * Ex: admin | customer | support | all | public
 */
export interface InterfaceGuard extends TypeCrudGuard {}
