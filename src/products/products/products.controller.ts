import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { JwtGuard, RoleGuard } from '../../auth/jwt.guard.js';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @UseGuards(JwtGuard, new RoleGuard(['ADMIN']))
    @Post()
    create(@Body() body: any) {
        return this.productsService.create(body);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(Number(id));
    }

    @UseGuards(JwtGuard, new RoleGuard(['ADMIN']))
    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.productsService.update(Number(id), body);
    }

    @UseGuards(JwtGuard, new RoleGuard(['ADMIN']))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(Number(id));
    }
}

