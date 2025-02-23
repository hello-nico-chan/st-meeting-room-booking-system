import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { Paper } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BookingResponse } from '../../models/bookingResponse';

const localizer = momentLocalizer(moment);

const Calendar = ({ roomId }: { roomId: string }) => {
  const [events, setEvents] = useState<BookingResponse[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<string>('month');

  useEffect(() => {
    if (!roomId) return;

    axios.get<BookingResponse[]>(`http://localhost:5154/api/booking/list/${roomId}`)
      .then((response) => {
        const bookingEvents = response.data.map((booking: BookingResponse) => ({
          title: `Reserved: ${booking.userId}`,
          start: new Date(booking.startTime),
          end: new Date(booking.endTime),
        }));
        setEvents(bookingEvents);
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

  return (
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
      />
    </Paper>
  );
};

export default Calendar;
