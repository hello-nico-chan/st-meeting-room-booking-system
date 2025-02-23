import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { MeetingRoomResponse } from '../../models/meetingRoomResponse';

export default function MeetingRooms() {
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoomResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomLocation, setNewRoomLocation] = useState('');

  useEffect(() => {
    axios.get<MeetingRoomResponse[]>('http://localhost:5154/api/meeting-room/list')
      .then(response => {
        setMeetingRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching meeting rooms:', error);
      });
  }, []);

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:5154/api/meeting-room/${id}`)
      .then(() => {
        setMeetingRooms(prevRooms => prevRooms.filter(room => room.id !== id));
      })
      .catch(error => {
        console.error('Error deleting meeting room:', error);
      });
  };

  const handleAddRoomClick = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewRoomName('');
    setNewRoomLocation('');
  };

  const handleSaveNewRoom = () => {
    if (newRoomName && newRoomLocation) {
      axios.post('http://localhost:5154/api/meeting-room', {
        name: newRoomName,
        location: newRoomLocation
      })
      .then((response) => {
        setMeetingRooms(prevRooms => [...prevRooms, response.data]);
        handleCloseDialog();
      })
      .catch(error => {
        console.error('Error adding new room:', error);
      });
    }
  };

  return (
    <div>
      <h2>Meeting Rooms</h2>

      <Button variant="contained" color="primary" onClick={handleAddRoomClick} sx={{ marginBottom: 2 }}>
        Add Meeting Room
      </Button>

      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '0 auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="meeting rooms table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetingRooms.map((room, index) => (
              <TableRow key={room.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(room.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Meeting Room</DialogTitle>
        <DialogContent>
          <TextField
            label="Room Name"
            variant="outlined"
            fullWidth
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={newRoomLocation}
            onChange={(e) => setNewRoomLocation(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewRoom} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
