import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { authService } from './users.auth.services';
import { CurrentUser } from './decorators/user.decorators';

@Controller('auth')
export default class UsersController {
  constructor(
    private userService: UsersService,
    private authService: authService,
  ) {}


  @Get('colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }


  @Get('colors')
  getColor(@Session() session: any) {
    return session.color;
  }


  /*@Get('whoami')
  whoAmI(@Session() session: any) {
    return this.userService.findOne(session.whoAmI);
  }*/


  @Get('whoami')
  whoAmI(@CurrentUser() user: string) {
    return user;
  }


  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }


  @Post('signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }


  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }


  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }


  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }


  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  
  @Patch(':/id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
