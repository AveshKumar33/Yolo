import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Post, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**save users in the database **/
    @Post('create')
    @HttpCode(201)
    async createUser(@Body() userDto: UserDto) {
        try {
            const user = await this.usersService.createUser(userDto);
            console.log('user created ', user)
            if (user.id)
                return user;
            throw new NotAcceptableException()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'This user already available',
            }, HttpStatus.NOT_ACCEPTABLE, {
                cause: error
            });
        }
    }

    /**get user by user id**/
    @Get(':id')
    @HttpCode(200)
    async findUserById(@Param('id') id: string) {
        try {
            const user = await this.usersService.getUserById(id);
            console.log('user found', user);
            if (user)
                return user;
            throw new NotFoundException()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'This user id is not available',
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }

    @Get('health')
    health() {
        throw new UnauthorizedException();
    }

    @Get('ab*cd')
    findAll() {
        return 'This route uses a wildcard';
    }
}