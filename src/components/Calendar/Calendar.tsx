import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Box, TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BookingResponse } from '../../models/bookingResponse';

const localizer = momentLocalizer(moment);

const Calendar = ({ roomId }: { roomId: string }) => {
  const [events, setEvents] = useState<BookingResponse[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<string>('month');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [participants, setParticipants] = useState<string>('');
  const [startTime, setStartTime] = useState<moment.Moment | null>(null);
  const [endTime, setEndTime] = useState<moment.Moment | null>(null);

  useEffect(() => {
    if (!roomId) return;

    axios.get<BookingResponse[]>(`http://localhost:5154/api/booking/list/${roomId}`)
      .then((response) => {
        const bookings = response.data.map((booking: BookingResponse) => ({
          id: booking.id,
          userId: booking.userId,
          meetingRoomId: booking.meetingRoomId,
          title: booking.title,
          participants: booking.participants,
          start: new Date(booking.startTime),
          end: new Date(booking.endTime),
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

  const handleViewChange = (view: string) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Paper style={{ padding: 16 }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
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
          <DialogContent sx={{width: 500}}>
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
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
                <DateTimePicker
                  label="End Time"
                  value={endTime}
                  ampm={false}
                  onChange={(newValue) => setEndTime(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" color="primary">
              submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </LocalizationProvider>
  );
};

export default Calendar;
