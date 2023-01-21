import { Document, ObjectId } from "mongoose";
export interface IUser {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;

  readonly image: string;
}
