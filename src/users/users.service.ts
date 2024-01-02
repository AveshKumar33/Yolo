// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class UsersService {
//     constructor(@Inject(ConfigService) public configService: ConfigService) { }
//     getHello(): string {

//         const uri = this.configService.get<string>('DATABASE_USER')
//         console.log('MONGOD sss', uri);
//         console.log('All Config:', this.configService.get<string>('MONGO_URI'));
//         return 'Hello World! users';
//     }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { UserModel } from './models/users.model';
const saltOrRounds = 10;


@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private userModel: Model<UserModel>) { }
    async signup(user: User) {
        const newUser = new this.userModel({
            userName: user.userName,
            email: user.email,
            password: user.password
            // password: await bcrypt.hash(user.password, saltOrRounds)
            // password: await bcrypt.hash(user.password, 10)
        })
        try {
            await newUser.save()
            return 'signup successfully'
        } catch (error) {
            console.log('Sign up failed', error);
        }
    }
}
