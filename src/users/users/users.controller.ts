import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtGuard } from '../../auth/jwt.guard.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get('me/profile')
    me(@Req() req: any) {
        return { status: 'success', user: req.user };
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(Number(id));
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.usersService.update(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(Number(id));
    }
}

