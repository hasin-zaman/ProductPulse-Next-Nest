enum ComplaintStatus {
    UNREAD = 'unread',
    READ = 'read-and-unresolved',
    RESOLVED = 'resolved'
}

export type ComplaintParams = {
    complaint: string;
    status: ComplaintStatus;
}