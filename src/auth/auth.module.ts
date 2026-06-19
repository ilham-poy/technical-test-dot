import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtGuard } from './jwt.guard.js';

@Module({
    providers: [AuthService, JwtGuard],
    controllers: [AuthController],
    exports: [AuthService, JwtGuard],
})
export class AuthModule { }
