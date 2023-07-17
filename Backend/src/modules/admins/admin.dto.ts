import { Role } from "src/enums/role.enum";

export class AdminDto {
    name: string;
    userName: string;
    password: string;
    role: Role;
}