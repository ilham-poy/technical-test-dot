import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const auth = req.headers['authorization'] || req.headers['Authorization'];
        if (!auth) return false;
        const parts = auth.split(' ');
        if (parts.length !== 2) return false;
        const token = parts[1];
        const payload = this.authService.verifyToken(token);
        if (!payload) return false;
        req.user = payload;
        return true;
    }


}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly allowedRoles: string[]) { }


    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user) return false;

        return this.allowedRoles.includes(user.role);
    }
}