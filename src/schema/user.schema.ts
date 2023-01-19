import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Exclude, Transform } from "class-transformer";
import { ObjectId } from "mongoose";
import { IUser } from "../interface/user.interface";
@Schema()
export class User implements IUser {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  @Exclude()
  password: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  image: string;


  constructor(name: string, email: string, password: string, phoneNumber: string, image: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.image = image;
  }
}
export const UserSchema = SchemaFactory.createForClass(User);
