import { Directive } from "@nestjs/graphql";

@Directive("shareable")
export class AffectedRows {
  count!: number;
}
