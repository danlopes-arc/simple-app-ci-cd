import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.userService.findByCredentials(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
