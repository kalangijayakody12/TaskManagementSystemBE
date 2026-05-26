import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({required: true})
    userId !: number;

    @Prop({required: true})
    userName !: string;

    @Prop({required: true})
    userEmail !: string;

    @Prop({required: true})
    userPassword !: string;
    
    @Prop({required: true})
    userRole !: string; 
}

export const UserSchema = SchemaFactory.createForClass(User);