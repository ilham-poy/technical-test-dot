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


    async update(id: number, data: any) {

        return prisma.user.update({ where: { id }, data });
    }

    async remove(id: number) {
        return prisma.user.delete({ where: { id } });
    }
}
