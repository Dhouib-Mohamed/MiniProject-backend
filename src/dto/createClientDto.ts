import { SignDto } from "./signDto";
import { Product } from "../schema/product.schema";

export class CreateClientDto extends SignDto{

  readonly name: string;
  readonly phoneNumber: string;

  readonly image: string;

  readonly favorites: Product[];

}
