import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
    @Prop({required: true})
    projectId !: number;

    @Prop({required: true})
    projectName !: string;

    @Prop()
    projectDescription ?:string;

    @Prop({required: true})
    projectStartDate !:Date;

    @Prop({required: true, default: "Not Started"})
    projectStatus !:string;

    @Prop({required: true, type:mongoose.Schema.Types.ObjectId, ref:'User'})
    projectOwner !:mongoose.Types.ObjectId;

    @Prop([{type:mongoose.Schema.Types.ObjectId , ref:'User'}])
    assignedMembers:mongoose.Types.ObjectId[] | undefined;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);