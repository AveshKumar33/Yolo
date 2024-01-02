import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class User {
    @Prop()
    userName: string;
    @Prop({ unique: true })
    email: string;
    @Prop()
    password: string;
}
export type UserModel = User & Document
export const UserSchema = SchemaFactory.createForClass(User)