import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const result = user.toJSON();
    delete result['password'];
    return result;
  }

  public async login(user: UserDto) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user: UserDto) {
    // hash the password
    const pass = await this.hashPassword(user.password);
    const userExist = await this.userService.findOneByEmail(user.email);
    if (userExist) {
      throw new BadRequestException('This email already exist');
    }
    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });

    const result = newUser.toJSON();
    delete result['password'];

    // generate token
    const token = await this.generateToken(result);

    // return the user and the token
    return { user: result, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
