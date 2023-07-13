import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Complaint } from "../complaints/complaint.entity";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'user_id'
    })
    userId: number

    @Column({
        nullable: false,
        default: ''
    })
    name: string

    @Column({
        nullable: false,
        default: 0
    })
    phone: number
    
    @Column({
        nullable: false,
        default: 0
    })
    cnic: number

    @Column()
    createdAt: Date

    @OneToMany(() => Complaint, complaint => complaint.user)
    complaints: Complaint[];
}