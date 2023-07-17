import { Role } from "src/enums/role.enum";

export type AdminParams = {
    name: string;
    userName: string;
    password: string;
    role: Role;
}