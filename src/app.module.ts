import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { UserService } from './service/user/user.service';
import { UserController } from './controller/user/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://<username>:<password>@localhost:27017',{dbName: 'studentdb'}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
