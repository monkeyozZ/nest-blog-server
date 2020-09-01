
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { LoginDto } from '../dto/login.dto';
import { Login } from '../schemas/login.schema';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('admin') private readonly loginModel: Model<Login>) {}

  async findOne(username: string): Promise<Login> {
    const res = await this.loginModel.findOne({username});
    if (res) {
      return res
    } else {
      return null
    }
  }
}

/* @Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'monkey',
        password: '123456',
      },
      {
        id: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        id: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
} */