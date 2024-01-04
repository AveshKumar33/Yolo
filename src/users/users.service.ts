import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { UserModel } from './models/users.model';
const saltOrRounds = 10;


@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private userModel: Model<UserModel>) { }

    /**save new user in to database **/
    async createUser(user: User) {
        const newUser = new this.userModel({
            userName: user.userName,
            email: user.email,
            password: user.password
            // password: await bcrypt.hash(user.password, saltOrRounds)
            // password: await bcrypt.hash(user.password, 10)
        })
        try {
            return await newUser.save()
        } catch (error) {
            console.log('Sign up failed', error);
            return error;
        }
    }

    /**get user by id from database **/
    async getUserById(userId: string): Promise<User> {
        try {
            return await this.userModel.findById({ _id: userId });
        } catch (error) {
            return error;
        }
    }
}
