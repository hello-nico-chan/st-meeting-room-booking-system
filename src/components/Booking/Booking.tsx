import { Container, Paper, Typography } from '@mui/material';
import { useState } from 'react'
import MeetingRoomSelect from '../MeetingRoomSelect';
import Calendar from '../Calendar';

export default function Booking() {
    const [selectedRoomId, setSelectedRoomId] = useState<string>('');

    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Book A Meeting Room
        </Typography>
        <Paper style={{ padding: 16, marginBottom: 16 }}>
          <MeetingRoomSelect onRoomChange={setSelectedRoomId} />
        </Paper>
        <Calendar roomId={selectedRoomId} />
      </Container>
    );
}
