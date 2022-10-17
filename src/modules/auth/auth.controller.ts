import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { ResponseService } from 'src/utils/response/response.service';
import { AuthResponse } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<AuthResponse> {
    const res = await this.authService.login(req.user);
    return this.responseService.handleResponse(res);
  }

  @Post('signup')
  async signUp(@Body() user: UserDto): Promise<AuthResponse> {
    const res = await this.authService.create(user);
    return this.responseService.handleResponse(res);
  }
}
