import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { User } from "./user.schema";
import { Product } from "./product.schema";
import * as mongoose from "mongoose";
import { IClient } from "../interface/client.interface";
@Schema()
export class Client extends User implements IClient{
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] , isRequired:false})
  favorites: Product[];

  constructor(name: string, email: string, password: string, phoneNumber: string, image: string) {
    super(name, email, password, phoneNumber, image);
    this.favorites = [];
  }

}
export const ClientSchema = SchemaFactory.createForClass(Client);
