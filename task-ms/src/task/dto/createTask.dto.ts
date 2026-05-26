export class CreateTaskDto {
    taskId!: number;
    taskName!: string;
    taskDescription?: string;
    taskStartDate!: Date;
    taskDueDate!: Date;
    taskStatus!: string;
    taskAssignedMember!: string;
    projectBelong!: string;
}
