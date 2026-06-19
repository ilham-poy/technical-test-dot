import { Injectable } from '@nestjs/common';
import { prisma } from '../../prisma.service.js';

@Injectable()
export class ProductsService {
    async create(data: { name: string; quantity: number; price: number; decription?: string }) {
        return prisma.product.create({
            data: {
                name: data.name,
                quantity: Number(data.quantity),
                price: Number(data.price),
                decription: data.decription,
            },
        });
    }

    async findAll() {
        return prisma.product.findMany();
    }

    async findOne(id: number) {
        return prisma.product.findUnique({ where: { id } });
    }

    async update(id: number, data: { name?: string; quantity?: number; price?: number; decription?: string }) {
        const oldProduct = await prisma.product.findUnique({ where: { id } });

        return prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                quantity: Number(data.quantity) || oldProduct?.quantity,
                price: Number(data.price) || oldProduct?.price,
                decription: data.decription || oldProduct?.decription,
            },
        });
    }

    async remove(id: number) {
        return prisma.product.delete({ where: { id } });
    }
}

