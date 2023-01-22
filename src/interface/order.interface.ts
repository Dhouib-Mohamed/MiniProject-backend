import { Document, ObjectId } from "mongoose";
import { Product } from "../schema/product.schema";
import { Client } from "../schema/client.schema";
export interface IOrder{
  readonly product: Product;
  readonly client: Client;
  readonly verified: boolean;
  readonly date: Date;

}
