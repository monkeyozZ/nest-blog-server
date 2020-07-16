    
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
    console.log(err, user)
    if (err || !user) {
      return false
      // throw err || new UnauthorizedException();
    }
    return user;
  }
}
