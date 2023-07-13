enum ComplaintStatus {
    UNREAD = 'unread',
    READ = 'read-and-unresolved',
    RESOLVED = 'resolved'
}

export class ComplaintDto {
    complaint: string;
    status: ComplaintStatus;
}