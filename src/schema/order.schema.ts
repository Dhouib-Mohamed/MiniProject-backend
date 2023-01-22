import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { User } from "./user.schema";
import { Product } from "./product.schema";
import { Client } from "./client.schema";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";
import * as mongoose from "mongoose";
import { IOrder } from "../interface/order.interface";
@Schema()
export class Order implements IOrder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
  client: Client;
  @Prop()
  verified: boolean;
  @Prop()
  date: string;

  constructor(product: Product, client: Client,date:string) {
    this.product = product;
    this.client = client;
    this.verified = null;
    this.date = date;
  }
}
export const OrderSchema = SchemaFactory.createForClass(Order);
