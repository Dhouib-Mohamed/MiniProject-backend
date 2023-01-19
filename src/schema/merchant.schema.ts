import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { User } from "./user.schema";
import { Product } from "./product.schema";
import * as mongoose from "mongoose";
import { IMerchant } from "../interface/merchant.interface";
@Schema()
export class Merchant extends User implements IMerchant{

  constructor(name: string, email: string, password: string, phoneNumber: string, image: string) {
    super(name, email, password, phoneNumber, image);
  }
}
export const MerchantSchema = SchemaFactory.createForClass(Merchant);
