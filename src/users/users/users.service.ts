import { Injectable, UseGuards } from '@nestjs/common';
import { prisma } from '../../prisma.service.js';
@Injectable()
export class UsersService {

    async findAll() {
        return prisma.user.findMany();
    }

    async findOne(id: number) {
        return prisma.user.findUnique({ where: { id } });
    }


    async update(id: number, data: { email: string; name?: string; password?: string }) {
        const oldUser = await prisma.user.findUnique({ where: { id } });
        return prisma.user.update({
            where: { id },
            data: {
                email: data.email || oldUser?.email,
                name: data.name || oldUser?.name,
                password: data.password || oldUser?.password,
            },
        });
    }

    async remove(id: number) {
        return prisma.user.delete({ where: { id } });
    }
}
