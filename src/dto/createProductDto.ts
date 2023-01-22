import { Prop } from "@nestjs/mongoose";

export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly material :string;
}
