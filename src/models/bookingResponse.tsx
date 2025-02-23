export class BookingResponse {
    constructor(
        public id: string,
        public startTime: Date,
        public endTime: Date,
        public meetingRoomId: string,
        public userId: string,
        public title: string,
        public participants: string
    ) { }
}