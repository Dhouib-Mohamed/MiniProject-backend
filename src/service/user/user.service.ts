import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../../interface/user.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel:Model<IUser>) { }
  async createUser(): Promise<IUser> {
    const newUser = await new this.UserModel();
    return newUser.save();
  }
  async updateUser(UserId: string,): Promise<IUser> {
    const existingUser = await        this.UserModel.findByIdAndUpdate(UserId,  { new: true });
    if (!existingUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existingUser;
  }
  async getAllUsers(): Promise<IUser[]> {
    const UserData = await this.UserModel.find();
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return UserData;
  }
  async getUser(UserId: string): Promise<IUser> {
    const existingUser = await     this.UserModel.findById(UserId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existingUser;
  }
  async deleteUser(UserId: string): Promise<IUser> {
    const deletedUser = await this.UserModel.findByIdAndDelete(UserId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return deletedUser;
  }
}
