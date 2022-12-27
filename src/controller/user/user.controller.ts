import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {

  constructor(private readonly UserService: UserService) { }
  @Post()
  async createUser(@Res() response) {
    try {
      const newUser = await this.UserService.createUser();
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }
  @Put('/:id')
  async updateUser(@Res() response,@Param('id') UserId: string,) {
    try {
      const existingUser = await this.UserService.updateUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,});
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getUsers(@Res() response) {
    try {
      const UserData = await this.UserService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found successfully',UserData,});
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getUser(@Res() response, @Param('id') UserId: string) {
    try {
      const existingUser = await
        this.UserService.getUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',existingUser,});
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') UserId: string)
  {
    try {
      const deletedUser = await this.UserService.deleteUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,});
    }catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
