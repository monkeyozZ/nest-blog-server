    
import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { AppService } from '../../app.service';
import { AuthModule } from '../../module/auth.module';
import { UsersModule } from '../../module/users.module';

describe('AppController', () => {
  let loginController: LoginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
      controllers: [LoginController],
      providers: [AppService],
    }).compile();

    loginController = app.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(loginController).toBeDefined();
  });
});