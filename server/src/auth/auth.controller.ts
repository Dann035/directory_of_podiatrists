import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.auth.register(body.username, body.password);
    return user;
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.auth.validate(body.username, body.password);
    if (!user) return { ok: false, message: 'invalid credentials' };
    const token = this.auth.signPayload({ sub: user.id, username: user.username });
    return { ok: true, token };
  }

  @Get('me')
  me(@Headers('authorization') auth?: string) {
    if (!auth) return { ok: false };
    const token = auth.replace(/^Bearer\s+/i, '');
    const payload = this.auth.verifyToken(token);
    if (!payload) return { ok: false };
    return { ok: true, payload };
  }
}
