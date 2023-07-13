import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

enum ComplaintStatus {
    UNREAD = 'unread',
    READ = 'read-and-unresolved',
    RESOLVED = 'resolved'
}

@Entity({ name: 'complaints'})
export class Complaint {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'complaint_id'
    })
    complaintId: number

    @Column({
        nullable: false,
        default: ''
    })
    complaint: string
    
    @Column({
        type: 'enum',
        enum: ComplaintStatus,
        default: ComplaintStatus.UNREAD
    })
    status: ComplaintStatus

    @Column()
    createdAt: Date

    @ManyToOne(() => User, user => user.complaints)
    user: User
}