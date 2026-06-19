import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(201)
    @Post('register')
    async register(@Body() body: { email: string; name?: string; password: string }) {
        const user = await this.authService.register(body);
        return { status: 'success', data: user };
    }

    @HttpCode(201)
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) return { status: 'error', message: 'User not found' };
        const token = this.authService.signToken(user);
        return { status: 'success', token };
    }
}
