import { Role } from "src/utils/role.enum";

export type AdminParams = {
    name: string;
    userName: string;
    password: string;
    role: Role;
}