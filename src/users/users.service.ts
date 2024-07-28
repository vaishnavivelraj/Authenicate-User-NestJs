import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Userentity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';

@Injectable()
export class UsersService {
  static create(email: string, result: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Userentity) private repo: Repository<Userentity>,
  ) {}
  Create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }
  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  async update(id: number, attrs: Partial<Userentity>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User Not Found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User Not Found');
    }
    return this.repo.remove(user);
  }
}
