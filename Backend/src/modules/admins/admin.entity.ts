import { Role } from "src/enums/role.enum";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Response } from "../responses/response.entity";

@Entity({ name: 'admins' })
export class Admin {

  @PrimaryColumn({
    type: 'varchar',
    length: 255
  })
  userName: string;

  @Column({
    nullable: false,
    default: ''
  })
  name: string;

  @Column({
    nullable: false,
    default: ''
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN
  })
  role: Role;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @OneToMany(() => Response, (response) => response.admin)
  responses: Response[];
}
