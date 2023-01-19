import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { IClient } from "../../interface/Client.interface";
import { Client } from "../../schema/Client.schema";

@Injectable()
export class ClientService{

  constructor(@InjectModel('Client') private ClientModel:Model<IClient>) { }
  async createUser(client:Client): Promise<IClient> {
    const newClient = await new this.ClientModel(client);
    return newClient.save();
  }
  async updateUser(clientId: string,input: UpdateQuery<IClient>): Promise<IClient> {
    const existingClient = await        this.ClientModel.findByIdAndUpdate(clientId,  input);
    if (!existingClient) {
      throw new NotFoundException(`client #${clientId} not found`);
    }
    return existingClient;
  }
  async getClientById(clientId:string): Promise<IClient> {
    const existingClient = await     this.ClientModel.findById(clientId);
    if (!existingClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return existingClient;
  }
  async getUser(input:FilterQuery<IClient>): Promise<IClient> {
    const existingClient = await     this.ClientModel.findOne(input);
    if (!existingClient) {
      return null
    }
    return existingClient;
  }
  async deleteUser(ClientId: string): Promise<IClient> {
    const deletedClient = await this.ClientModel.findByIdAndDelete(ClientId);
    if (!deletedClient) {
      throw new NotFoundException(`Client #${ClientId} not found`);
    }
    return deletedClient;
  }
}
