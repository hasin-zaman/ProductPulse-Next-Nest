import { ComplaintAgainst } from "../../enums/complaint-against";
import { ComplaintOffice } from "../../enums/complaint-office";
import { ComplaintState } from "../../enums/complaint-state";
import { ComplaintStatus } from "../../enums/complaint-status";
import { ComplaintType } from "../../enums/complaint-type";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
        type: 'text'
    })
    complaint: string
    
    @Column({
        nullable: false,
        type: 'enum',
        enum: ComplaintStatus,
        default: ComplaintStatus.UNREAD
    })
    status: ComplaintStatus

    @Column({
        nullable: false,
        type: 'enum',
        enum: ComplaintState,
        default: ComplaintState.NEW
    })
    state: ComplaintState

    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date

    @ManyToOne(() => User, user => user.complaints)
    user: User

    @OneToMany(() => Response, response => response.complaint)
    responses: Response[];
}