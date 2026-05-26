import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({required: true})
    taskId !: number;

    @Prop({required: true})
    taskName !: string;

    @Prop()
    taskDescription ?:string;

    @Prop({required: true})
    taskStartDate !: Date;

    @Prop({required: true})
    taskDueDate !: Date;

    @Prop({required: true})
    taskStatus !: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    taskAssignedMember !: mongoose.Types.ObjectId;
    
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Project'})
    projectBelong !: mongoose.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);