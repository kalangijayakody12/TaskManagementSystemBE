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

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] })
    taskAssignedMembers !: string[] | undefined;
    
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Project'})
    projectBelong !: string;

    @Prop([
    {
      status:String,
      changedAt:Date,
      changedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
    }])
    taskActivityHistory !: any[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);