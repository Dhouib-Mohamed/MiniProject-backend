import { IUser } from "./user.interface";
import { Product } from "../schema/product.schema";
import { Order } from "../schema/order.schema";
export interface IClient extends IUser{
  readonly favorites: Product[];
}
