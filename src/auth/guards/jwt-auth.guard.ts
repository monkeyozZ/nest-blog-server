    
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
type User = {
  _id: string,
  username: string
}

type Err = {
  error?: string
}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: Err, user: User): any {
    if (err || !user) {
      return {
        code: 201,
        message: 'access_token已过期或无效'
      }
      // throw err || new UnauthorizedException();
    }
    return user;
  }
}
