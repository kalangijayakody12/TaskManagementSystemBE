    export class CreateProjectDto {
        projectId!: number;
        projectName!: string;
        projectDescription?: string;
        projectStartDate!: Date;
        projectStatus!: string;
        // projectOwner!: string;
        assignedMembers?: number[];
    }
