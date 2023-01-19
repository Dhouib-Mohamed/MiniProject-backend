import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IOrder } from "../../interface/order.interface";
import { Order } from "../../schema/order.schema";
import { Client } from "../../schema/client.schema";
import { Product } from "src/schema/product.schema";

@Injectable()
export class OrderService {

  constructor(@InjectModel('Order') private OrderModel:Model<IOrder>) { }
  async createOrder(order:Order): Promise<IOrder> {
    const newOrder = await new this.OrderModel(order);
    return newOrder.save();
  }
  async verifyOrder(OrderId: string,verified:boolean): Promise<IOrder> {
    const existingOrder = await  this.OrderModel.findById(OrderId);
    if (!existingOrder) {
      throw new NotFoundException(`Order #${OrderId} not found`);
    }
    else if (existingOrder.verified!==null) {
      if (existingOrder.verified) {
        throw new NotFoundException(`Order #${OrderId} is already accepted`);
      }
      if (!existingOrder.verified) {
        throw new NotFoundException(`Order #${OrderId} is already rejected`);
      }
    }
    else {
      await  this.OrderModel.findByIdAndUpdate(OrderId,{verified});
    }

    return existingOrder;
  }
  async getAllOrders(): Promise<IOrder[]> {
    const OrderData = await this.OrderModel.find();
    if (!OrderData || OrderData.length == 0) {
      throw new NotFoundException('Orders data not found!');
    }
    return OrderData;
  }
  async getOrdersByVerification(verified:boolean): Promise<IOrder[]> {
    const OrderData = await this.OrderModel.find({verified:verified});
    if (!OrderData || OrderData.length == 0) {
      throw new NotFoundException('Orders data not found!');
    }
    return OrderData;
  }
  async getOrderById(OrderId: string): Promise<IOrder> {
    const existingOrder = await     this.OrderModel.findById(OrderId).exec();
    if (!existingOrder) {
      throw new NotFoundException(`Order #${OrderId} not found`);
    }
    return existingOrder;
  }
  async deleteOrder(OrderId: string): Promise<IOrder> {
    const deletedOrder = await this.OrderModel.findByIdAndDelete(OrderId);
    if (!deletedOrder) {
      throw new NotFoundException(`Order #${OrderId} not found`);
    }
    return deletedOrder;
  }

  async getOrderByFilter(filter) {
    const OrderData = await this.OrderModel.find({filter});
    if (!OrderData || OrderData.length == 0) {
      throw new NotFoundException('Orders data not found!');
    }
    return OrderData;
  }
}
