import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Post('create')
    signup(@Body() userDto: UserDto) {
        console.log('signupDto created', userDto);
        return this.usersService.signup(userDto)
    }
    @Get('health')
    health() {
        return 'server is running and running on the server'
    }
}