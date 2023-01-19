import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Session } from "@nestjs/common";
import { ClientService } from "../../service/client/client.service";
import { ProductService } from "../../service/product/product.service";
import { CreateClientDto } from "../../dto/createClientDto";
import { UpdateClientDto } from "../../dto/updateClientDto";
import { SignDto } from "../../dto/signDto";
import { OrderService } from "../../service/order/order.service";
import { Order } from "../../schema/order.schema";
import { UserService } from "../../service/user/user.service";

@Controller('client')
export class ClientController {
  constructor(private readonly ClientService: ClientService, private readonly UserService : UserService,private readonly ProductService:ProductService,private readonly OrderService:OrderService) { }
  @Get("/signin")
  async SignIn(@Res() response,@Body() SignDto:SignDto,@Session() session) {
    try {
      const result = await this.UserService.signIn(SignDto,this.ClientService);
      session.Client=session.Client?[...session.Client,result.existingUser]:[result.existingUser];
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Get("/user/:email")
  async getUser(@Res() response,@Param() email:string,@Session() Session) {
    try {
      const result = await this.UserService.getUser(email,Session, "Client");
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Post("/signup")
  async SignUp(@Res() response,@Body() createClientDto:CreateClientDto,@Session() session) {
    try {
      const result = await this.UserService.signUp(createClientDto, this.ClientService)
      if (result.newUser) {
        session.Client=session.Client?[...session.Client,result.newUser]:[result.newUser];
      }
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Put('/update/:id')
  async updateClient(@Res() response,@Param('id') ClientId: string,@Body() updateClientDto:UpdateClientDto) {
    try {
      const result = await this.UserService.updateUser(ClientId,updateClientDto,this.ClientService);
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Delete('/delete/:id')
  async deleteClient(@Res() response, @Param('id') ClientId: string) {
    try {
      const result = await this.UserService.deleteUser(ClientId,this.ClientService);
      return response.json(result);
    } catch (e) {
      return response.json(e.response)
    }
  }
  @Get('/product')
  async ProductList(@Res() response) {
    try {
      const products = await this.ProductService.getAllProducts();
      return response.status(HttpStatus.OK).json({ products })

    } catch (e) {
      return response.status(e.status).json(e.response)
    }
  }
  @Post('/favorite/add/:client&:product')
  async addFavorite(@Res() response,@Param("client")clientId:string,@Param("product")productId:string) {
    try {
      const client = await this.ClientService.getClientById(clientId);
      const product = await this.ProductService.getProductById(productId);
      const favorites = [...client.favorites,product]
      await this.ClientService.updateUser(clientId,{favorites})
      return response.status(HttpStatus.OK).json({response:`Product ${productId} successfully added as a favorite to Client ${clientId}`})
    }
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/favorite/remove/:client&:product')
  async removeFavorite(@Res() response,@Param("client")clientId:string,@Param("product")productId:string) {
    try {
      const client = await this.ClientService.getClientById(clientId);
      const product = await this.ProductService.getProductById(productId);
      const favorites = client.favorites;
      favorites.splice(favorites.findIndex((element)=>{return element===product}),1)
      await this.ClientService.updateUser(clientId,{favorites})
      return response.status(HttpStatus.OK).json({response:`Product ${productId} successfully removed a favorite from Client ${clientId}`})
    }
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/order/list/:id')
  async OrderList(@Res() response, @Param('id') ClientId: string) {
    try {
      const client = await this.ClientService.getClientById(ClientId);
      const orders = await this.OrderService.getOrderByFilter(client);
      return response.status(HttpStatus.OK).json({ orders })
    } catch (e) {
      return response.status(e.status).json(e.response);
    }
  }
  @Post('/order/add/:client&:product')
  async addOrder(@Res() response,@Param("client")clientId:string,@Param("product")productId:string) {
    try {
      const client = await this.ClientService.getClientById(clientId);
      const product = await this.ProductService.getProductById(productId);
      const order = await this.OrderService.createOrder({product,client,verified:null});
      return response.status(HttpStatus.OK).json({message:`Order have been created successfully`,order})
    }
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
