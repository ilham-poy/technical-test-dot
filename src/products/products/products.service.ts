import { Injectable } from '@nestjs/common';
import { prisma } from '../../prisma.service.js';

@Injectable()
export class ProductsService {
    async create(data: { name: string; quantity: number; price: number; decription?: string }) {
        return prisma.product.create({ data: data as any });
    }

    async findAll() {
        return prisma.product.findMany();
    }

    async findOne(id: number) {
        return prisma.product.findUnique({ where: { id } });
    }

    async update(id: number, data: any) {
        return prisma.product.update({ where: { id }, data });
    }

    async remove(id: number) {
        return prisma.product.delete({ where: { id } });
    }
}

