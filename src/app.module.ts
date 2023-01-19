import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { ClientService } from './service/client/client.service';
import { ClientController } from './controller/client/client.controller';
import { MerchantController } from './controller/merchant/merchant.controller';
import { ProductService } from './service/product/product.service';
import { OrderService } from './service/order/order.service';
import { ClientSchema } from "./schema/client.schema";
import { MerchantSchema } from "./schema/merchant.schema";
import { ProductSchema } from "./schema/product.schema";
import { OrderSchema } from "./schema/order.schema";
import { MerchantService } from "./service/merchant/merchant.service";
import { UserService } from "./service/user/user.service";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://junior:nZIzCqu7DfPsp6Zy@junior.ramt11i.mongodb.net/?retryWrites=true&w=majority",{dbName: 'Junior'}),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Client', schema: ClientSchema },
      { name: 'Merchant', schema: MerchantSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Order', schema: OrderSchema }])
  ],
  controllers: [AppController, ClientController, MerchantController],
  providers: [AppService,UserService, ClientService,MerchantService, ProductService, OrderService],
})
export class AppModule {}
