import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma.service.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    async register(data: { email: string; name?: string; password?: string }) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        let role = 'PEMBELI';
        if (data.email.match(/@admin\.mail\.id$/)) {
            role = 'ADMIN';
        }
        const user = await prisma.user.create({ data: { ...data, role: role, password: passwordHash } as any });
        return user;
    }

    async validateUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const passwordMatch = await bcrypt.compare(password, user?.password);
        if (passwordMatch) {

            return user;
        }
    }


    signToken(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (e) {
            return null;
        }
    }
}
