import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Box, TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BookingResponse } from '../../models/bookingResponse';
import { SERVER_URL } from '../../constants';

const localizer = momentLocalizer(moment);

const Calendar = ({ roomId }: { roomId: string }) => {
  const [events, setEvents] = useState<BookingResponse[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<View>('month');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [participants, setParticipants] = useState<string>('');
  const [startTime, setStartTime] = useState<moment.Moment | null>(null);
  const [endTime, setEndTime] = useState<moment.Moment | null>(null);

  useEffect(() => {
    if (!roomId) return;

    axios.get<BookingResponse[]>(`${SERVER_URL}/booking/list/${roomId}`)
      .then((response) => {
        const bookings = response.data.map((booking: BookingResponse) => ({
          id: booking.id,
          userId: booking.userId,
          meetingRoomId: booking.meetingRoomId,
          title: booking.title,
          participants: booking.participants,
          startTime: new Date(booking.startTime),
          endTime: new Date(booking.endTime),
        }));
        setEvents(bookings);
      })
      .catch((error) => {
        console.error("Failed to fetch bookings", error);
      });
  }, [roomId]);

  const handleNavigate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleViewChange = (view: View) => {
    setSelectedView(view);
  };

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    const date = moment(slotInfo.start);
    setStartTime(date.hour(9).minute(0));
    setEndTime(date.hour(10).minute(0));
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmitBooking = () => {
    const bookingRequest = {
      userId: localStorage.getItem('userId'),
      meetingRoomId: roomId,
      title,
      participants,
      startTime: startTime?.toDate(),
      endTime: endTime?.toDate(),
    };

    axios.post<BookingResponse>(`${SERVER_URL}/booking`, bookingRequest)
      .then((response) => {
        setEvents(prevEvents => [...prevEvents, {
          id: response.data.id,
          userId: response.data.userId,
          meetingRoomId: response.data.meetingRoomId,
          title: response.data.title,
          participants: response.data.participants,
          startTime: new Date(response.data.startTime),
          endTime: new Date(response.data.endTime),
        }]);
        setDialogOpen(false);
        setTitle('');
        setParticipants('');
        setStartTime(null);
        setEndTime(null);
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          alert('The selected time slot is already booked.');
        } else {
          console.error('Failed to book meeting room:', error);
        }
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Paper style={{ padding: 16 }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="startTime"
          endAccessor="endTime"
          style={{ height: 500 }}
          views={['month', 'week', 'day']}
          date={selectedDate}
          onNavigate={handleNavigate}
          view={selectedView}
          onView={handleViewChange}
          selectable
          onSelectSlot={handleSelectSlot}
        />

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Book a meeting room</DialogTitle>
          <DialogContent sx={{ width: 500 }}>
            <Box p={2}>
              <Stack spacing={3}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Participants"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  margin="normal"
                />
                <DateTimePicker
                  label="Start Time"
                  value={startTime}
                  ampm={false}
                  onChange={(newValue) => setStartTime(newValue)}
                  slots={{
                    textField: TextField,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />
                <DateTimePicker
                  label="End Time"
                  value={endTime}
                  ampm={false}
                  onChange={(newValue) => setEndTime(newValue)}
                  slots={{
                    textField: TextField,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmitBooking}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </LocalizationProvider>
  );
};

export default Calendar;