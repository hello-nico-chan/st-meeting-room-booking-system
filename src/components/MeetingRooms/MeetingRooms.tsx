import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { MeetingRoomResponse } from '../../models/meetingRoomResponse';
import { SERVER_URL } from '../../constants';

export default function MeetingRooms() {
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoomResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomLocation, setNewRoomLocation] = useState('');
  const [newRoomCapacity, setNewRoomCapacity] = useState(0);
  const [newRoomType, setNewRoomType] = useState('');
  const [newRoomRemark, setNewRoomRemark] = useState('');
  const [currentRoom, setCurrentRoom] = useState<MeetingRoomResponse | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  useEffect(() => {
    axios.get<MeetingRoomResponse[]>(`${SERVER_URL}/meeting-room/list`)
      .then(response => {
        setMeetingRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching meeting rooms:', error);
      });
  }, []);

  const handleDelete = (id: string) => {
    axios.delete(`${SERVER_URL}/meeting-room/${id}`)
      .then(() => {
        setMeetingRooms(prevRooms => prevRooms.filter(room => room.id !== id));
      })
      .catch(error => {
        console.error('Error deleting meeting room:', error);
      });
  };

  const handleAddRoomClick = () => {
    setIsEditMode(false);
    setCurrentRoom(null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewRoomName('');
    setNewRoomLocation('');
    setNewRoomCapacity(0);
    setNewRoomType('');
    setNewRoomRemark('');
    setCurrentRoom(null);
  };

  const handleSaveNewRoom = () => {
    if (newRoomName && newRoomLocation && newRoomCapacity && newRoomType && newRoomRemark) {
      axios.post(`${SERVER_URL}/meeting-room`, {
        name: newRoomName,
        location: newRoomLocation,
        capacity: newRoomCapacity,
        type: newRoomType,
        remark: newRoomRemark
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

  const handleViewRoom = (room: MeetingRoomResponse) => {
    setCurrentRoom(room);
    setIsEditMode(false);
    setNewRoomName(room.name);
    setNewRoomLocation(room.location);
    setNewRoomCapacity(room.capacity);
    setNewRoomType(room.type);
    setNewRoomRemark(room.remark);
    setOpen(true);
  };

  const handleEditRoom = (room: MeetingRoomResponse) => {
    setCurrentRoom(room);
    setIsEditMode(true);
    setNewRoomName(room.name);
    setNewRoomLocation(room.location);
    setNewRoomCapacity(room.capacity);
    setNewRoomType(room.type);
    setNewRoomRemark(room.remark);
    setOpen(true);
  };

  const handleSaveEditRoom = () => {
    if (currentRoom && newRoomName && newRoomLocation && newRoomCapacity && newRoomType && newRoomRemark) {
      axios.put(`${SERVER_URL}/meeting-room`, {
        id: currentRoom.id,
        name: newRoomName,
        location: newRoomLocation,
        capacity: newRoomCapacity,
        type: newRoomType,
        remark: newRoomRemark
      })
        .then((response) => {
          setMeetingRooms(prevRooms =>
            prevRooms.map(room => (room.id === currentRoom.id ? response.data : room))
          );
          handleCloseDialog();
        })
        .catch(error => {
          console.error('Error updating room:', error);
        });
    }
  };

  const handleDeleteClick = (id: string) => {
    setRoomToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (roomToDelete) {
      handleDelete(roomToDelete);
      setDeleteDialogOpen(false);
      setRoomToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setRoomToDelete(null);
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
              <TableCell>Capacity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetingRooms.map((room, index) => (
              <TableRow key={room.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleViewRoom(room)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ margin: '0 5px' }}
                    onClick={() => handleEditRoom(room)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(room.id)}
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
        <DialogTitle>
          {currentRoom
            ? isEditMode
              ? 'Edit Meeting Room'
              : 'View Meeting Room'
            : 'Add Meeting Room'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Room Name"
            variant="outlined"
            fullWidth
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            margin="normal"
            disabled={!!currentRoom && !isEditMode}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={newRoomLocation}
            onChange={(e) => setNewRoomLocation(e.target.value)}
            margin="normal"
            disabled={!!currentRoom && !isEditMode}
          />
          <TextField
            label="Capacity"
            variant="outlined"
            type="number"
            fullWidth
            value={newRoomCapacity}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setNewRoomCapacity(value === '' ? 0 : Number(value));
              }
            }}
            margin="normal"
            disabled={!!currentRoom && !isEditMode}
          />
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            value={newRoomType}
            onChange={(e) => setNewRoomType(e.target.value)}
            margin="normal"
            disabled={!!currentRoom && !isEditMode}
          />
          <TextField
            label="Remark"
            variant="outlined"
            fullWidth
            value={newRoomRemark}
            onChange={(e) => setNewRoomRemark(e.target.value)}
            margin="normal"
            disabled={!!currentRoom && !isEditMode}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          {!currentRoom && (
            <Button onClick={handleSaveNewRoom} color="primary">
              Save
            </Button>
          )}
          {currentRoom && isEditMode && (
            <Button onClick={handleSaveEditRoom} color="primary">
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this meeting room?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
