import { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { MeetingRoomResponse } from '../../models/meetingRoomResponse';

const MeetingRoomSelect = ({ onRoomChange }: { onRoomChange: (roomId: string) => void }) => {
  const [rooms, setRooms] = useState<MeetingRoomResponse[]>([]);

  useEffect(() => {
    axios.get<MeetingRoomResponse[]>('http://localhost:5154/api/meeting-room/list')
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch meeting rooms", error);
      });
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Choose A Meeting Room</InputLabel>
      <Select
        label="Choose A Meeting Room"
        onChange={(e) => onRoomChange(e.target.value)}
      >
        {rooms.map((room: MeetingRoomResponse) => (
          <MenuItem key={room.id} value={room.id}>
            {room.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MeetingRoomSelect;
