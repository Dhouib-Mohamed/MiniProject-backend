import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Merchant } from "./merchant.schema";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";
import * as mongoose from "mongoose";
import { IProduct } from "../interface/product.interface";
@Schema()
export class Product implements IProduct{
  constructor(name: string, description: string, image: string, price: number, merchant: Merchant , material:string) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.merchant = merchant;
    this.material = material;
  }

  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  image: string;
  @Prop()
  material: string;
  @Prop()
  price: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
  merchant: Merchant;

}
export const ProductSchema = SchemaFactory.createForClass(Product);
