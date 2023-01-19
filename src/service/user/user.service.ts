import { SignDto } from "../../dto/signDto";
import { Session } from "@nestjs/common";


export class UserService {
  async signIn(signDto:SignDto,Service) {
    try {
      const existingUser = await
        Service.getUser({email:signDto.email});
      if (existingUser.password===signDto.password) {
        return { message: 'User Connected successfully',existingUser};
      }
      else {
        return { message: 'Incorrect Password',};
      }

    } catch (err) {
      return {
        statusCode:400,
        message: 'Error: Email not Found!',
        error: 'Bad Request',}
    }
  }
  async getUser(email,session,userType) {
    try {
      let user;
      if (userType==="Merchant") {
        if (!session.Merchant) {
          console.log(1);
          return { message: 'Please Sign In',};
        }
        user =session.Merchant.find((e)=>e.email===email.email)
      } else {
        if (!session.Client) {
          return { message: 'Please Sign In',};
        }
        user =session.Client.find((e)=>e.email===email.email)
      }
      console.log(user);
      if (!user) {
        return { message: 'Please Sign In',};
      }
      return user
    } catch (err) {
      return {
        statusCode:400,
        message: 'Error !',
        error: 'Bad Request',}
    }
  }
  async signUp(createDto,Service) {
    try {
      if (await Service.getUser({ email: createDto.email }) === null) {
        const newUser = await Service.createUser(createDto);
        return ({
          message: 'User has been created successfully',
          newUser,
        });
      } else {
        return ({
          statusCode: 400,
          message: 'Error: Email is already used!',
          error: 'Bad Request',
        });
      }

    } catch (err) {
      console.log(err);
      return ({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }

  async updateUser(UserId: string,updateDto,Service) {
    try {
      console.log(updateDto);
      const existingUser = await Service.updateUser(UserId,updateDto);
      return ({
        message: 'User has been successfully updated', });
    } catch (err) {
      return (err.response);
    }
  }
  async deleteUser(UserId: string,Service)
  {
    try {
      const deletedUser = await Service.deleteUser(UserId);
      return ({
        message: 'User deleted successfully',
        deletedUser,});
    }catch (err) {
      return (err.response);
    }
  }
}
