import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IProduct } from "../../interface/product.interface";
import { Product } from "../../schema/product.schema";
import { MerchantService } from "../merchant/merchant.service";

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private ProductModel:Model<IProduct>,private readonly MerchantService:MerchantService) { }
  async createProduct(product:Product): Promise<IProduct> {
    const newProduct = await new this.ProductModel(product);
    return newProduct.save();
  }
  async updateProduct(ProductId: string,): Promise<IProduct> {
    const existingProduct = await        this.ProductModel.findByIdAndUpdate(ProductId,  { new: true });
    if (!existingProduct) {
      throw new NotFoundException(`Product #${ProductId} not found`);
    }
    return existingProduct;
  }
  async getAllProducts(): Promise<IProduct[]> {
    const ProductData = await this.ProductModel.find();
    if (!ProductData || ProductData.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return ProductData;
  }
  async getProductById(ProductId: string): Promise<IProduct> {
    const existingProduct = await     this.ProductModel.findById(ProductId).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product #${ProductId} not found`);
    }
    return existingProduct;
  }
  async deleteProduct(ProductId: string): Promise<IProduct> {
    const deletedProduct = await this.ProductModel.findByIdAndDelete(ProductId);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${ProductId} not found`);
    }
    return deletedProduct;
  }

  async getProductByMerchant(merchant) {
    const ProductData = await this.ProductModel.find({merchant});
    if (!ProductData || ProductData.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return ProductData;
  }
}
