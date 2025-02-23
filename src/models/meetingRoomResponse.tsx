export class MeetingRoomResponse {
    constructor(
        public id: string,
        public name: string,
        public location: string,
        public capacity: number,
        public type: string,
        public remark: string,
    ) { }
}