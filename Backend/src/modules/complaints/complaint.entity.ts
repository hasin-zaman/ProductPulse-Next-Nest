import { ComplaintAgainst } from "src/enums/complaintAgainst";
import { ComplaintOffice } from "src/enums/complaintOffice";
import { ComplaintStatus } from "src/enums/complaintStatus";
import { ComplaintType } from "src/enums/complaintType";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Response } from "../responses/response.entity";
import { User } from "../users/user.entity";

@Entity({ name: 'complaints'})
export class Complaint {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'complaint_id'
    })
    complaintId: number

    @Column({
        nullable: false,
        type: 'enum',
        enum: ComplaintType
    })
    type: ComplaintType

    @Column({
        nullable: false,
        type: 'enum',
        enum: ComplaintOffice
    })
    complaintOffice: ComplaintOffice

    @Column({
        nullable: false,
        default: ''
    })
    subject: string

    @Column({
        nullable: false,
        type: 'enum',
        enum: ComplaintAgainst
    })
    complaintAgainst: ComplaintAgainst

    @Column({
        nullable: false,
        default: ''
    })
    complaint: string
    
    @Column({
        nullable: false,
        type: 'enum',
        enum: ComplaintStatus,
        default: ComplaintStatus.UNREAD
    })
    status: ComplaintStatus

    @Column()
    createdAt: Date

    @ManyToOne(() => User, user => user.complaints)
    user: User

    @OneToMany(() => Response, response => response.complaint)
    responses: Response[];
}