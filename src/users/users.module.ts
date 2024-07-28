import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import UsersController from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from './entities/user.entity';
import { authService } from './users.auth.services';

@Module({
  imports: [TypeOrmModule.forFeature([Userentity])],
  controllers: [UsersController],
  providers: [UsersService, authService],
})
export class UsersModule {}
