export class CreateUserDto {
    userId!: number;
    userName !: string;
    userEmail ?:string;
    userPassword!: string;
    userRole!: string;    
}
