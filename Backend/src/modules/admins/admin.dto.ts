import { Role } from "src/utils/role.enum";

export class AdminDto {
    name: string;
    userName: string;
    password: string;
    role: Role;
}