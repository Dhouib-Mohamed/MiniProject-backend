import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Session } from "@nestjs/common";
import { MerchantService } from 'src/service/merchant/merchant.service';
import { SignDto } from "../../dto/signDto";
import { CreateClientDto } from "../../dto/createClientDto";
import { UserService } from "../../service/user/user.service";
import { UpdateMerchantDto } from "../../dto/updateMerchantDto";
import { ProductService } from "../../service/product/product.service";
import { CreateProductDto } from "../../dto/createProductDto";
import { Merchant } from "../../schema/merchant.schema";
import { OrderService } from "../../service/order/order.service";
import { isBoolean, validate } from "class-validator";
import { Product } from "../../schema/product.schema";

@Controller('merchant')
export class MerchantController {


  constructor(private readonly MerchantService: MerchantService, private readonly UserService: UserService, private readonly ProductService:ProductService, private readonly OrderService:OrderService) {}

  @Post("/signin")
  async SignIn(@Res() response, @Body() SignDto: SignDto,@Session() session: Record<string, any>) {
    try {
      const result = await this.UserService.signIn(SignDto, this.MerchantService);
      if (result.existingUser) {
        session.Merchant=session.Merchant?[...session.Merchant,result.existingUser]:[result.existingUser];
      }
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Get("/user/:id")
  async getUser(@Res() response,@Param("id") id:string,@Session() session: Record<string, any>) {
    console.log(session);
    try {
      const merchant = await this.MerchantService.getMerchantById(id);
      return response.json({merchant});
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Post("/signup")
  async SignUp(@Res() response, @Body() createClientDto: CreateClientDto,@Session() session: Record<string, any>) {
    try {
      const result = await this.UserService.signUp(createClientDto, this.MerchantService)
      if (result.newUser) {
        session.hi=1;
        session.Merchant=session.Merchant?[...session.Merchant,result.newUser]:[result.newUser];
      }
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Put('/update/:id')
  async updateMerchant(@Res() response, @Param('id') MerchantId: string, @Body() updateMerchantDto:UpdateMerchantDto) {
    try {
      const result = await this.UserService.updateUser(MerchantId,updateMerchantDto,this.MerchantService);
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Delete('/delete/:id')
  async deleteMerchant(@Res() response, @Param('id') MerchantId: string) {
    try {
      const result = await this.UserService.deleteUser(MerchantId, this.MerchantService);
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Get('/product/list/:id')
  async ProductList(@Res() response, @Param('id') MerchantId: string) {
    try {
      const merchant = await this.MerchantService.getMerchantById(MerchantId);
      const products = await this.ProductService.getProductByMerchant(merchant);
      return response.status(HttpStatus.OK).json({ products })
    } catch (e) {
      return response.status(e.status).json(e.response)
    }
  }
  @Post('/product/add/:id')
  async AddProduct(@Res() response, @Param('id') MerchantId: string, @Body() createProductDto:CreateProductDto) {
    try {
      const merchant:Merchant =  await this.MerchantService.getMerchantById(MerchantId);
      const product = await this.ProductService.createProduct({ ...createProductDto,merchant });
      return response.status(HttpStatus.OK).json({message:`Product have been created successfully`,product})
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/product/delete/:id')
  async DeleteProduct(@Res() response,@Param('id') ProductId: string) {
    try {
      await this.ProductService.deleteProduct(ProductId);
      return response.status(HttpStatus.OK).json({message:`Product have been deleted successfully`})
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/order/list/:id')
  async OrderList(@Res() response, @Param('id') MerchantId: string) {
    try {
      const merchant = await this.MerchantService.getMerchantById(MerchantId);
      const products = await this.ProductService.getProductByMerchant(merchant);
      let orders =[];
      for (const product in products){
        const result = await this.OrderService.getOrderByFilter(product);
        orders.push(result);
      }
      return response.status(HttpStatus.OK).json({ orders })
    } catch (e) {
      return response.status(e.status).json(e.response);
    }
  }
  @Put('/order/reply/:id&:validate')
  async ReplyToOrder(@Res() response, @Param('id')OrderId: string, @Param('validate')reply: boolean) {
    try {
      await this.OrderService.verifyOrder(OrderId,reply)
      if (reply==true) {
        return response.status(HttpStatus.OK).json({message:`Order ${OrderId} have been accepted successfully`})
      } else {
        return response.status(HttpStatus.OK).json({message:`Order ${OrderId} have been refused successfully`})
      }
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
