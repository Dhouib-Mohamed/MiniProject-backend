import { Document } from 'mongoose';
import { Merchant } from "../schema/merchant.schema";
export interface IProduct{
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly material: string;
  readonly price: number;
  readonly merchant: Merchant;}
