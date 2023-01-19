import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { IMerchant } from "../../interface/merchant.interface";
import { Merchant } from "../../schema/merchant.schema";
import { IUser } from "../../interface/user.interface";
import { IClient } from "../../interface/client.interface";

@Injectable()
export class MerchantService {
  constructor(@InjectModel('Merchant') private MerchantModel:Model<IMerchant>) { }
  async createUser(merchant:Merchant): Promise<IMerchant> {
    const newMerchant = await new this.MerchantModel(merchant);
    return newMerchant.save();
  }
  async updateUser(merchantId: string,input: UpdateQuery<IMerchant>): Promise<IMerchant> {
    const existingMerchant = await this.MerchantModel.findByIdAndUpdate(merchantId,  input);
    if (!existingMerchant) {
      throw new NotFoundException(`merchant #${merchantId} not found`);
    }
    return existingMerchant;
  }
  async getUser(input:FilterQuery<IMerchant>): Promise<IMerchant> {
    const existingMerchant = await     this.MerchantModel.findOne(input);
    if (!existingMerchant) {
      return null;
    }
    return existingMerchant;
  }
  async deleteUser(MerchantId: string): Promise<IMerchant> {
    const deletedMerchant = await this.MerchantModel.findByIdAndDelete(MerchantId);
    if (!deletedMerchant) {
      throw new NotFoundException(`Merchant #${MerchantId} not found`);
    }
    return deletedMerchant;
  }

  async getMerchantById(merchantId: string) {
    const existingMerchant = await     this.MerchantModel.findById(merchantId);
    if (!existingMerchant) {
      throw new NotFoundException(`Client #${merchantId} not found`);
    }
    return existingMerchant;
  }

}
