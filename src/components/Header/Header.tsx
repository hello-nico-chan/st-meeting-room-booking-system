import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '24px' }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            <Button component={Link} to="/" className={styles.title}>Meeting Room Booking System</Button>
          </Typography>
          <Box>
            <Button component={Link} to="/MeetingRooms" className={styles.button}>Meeting Rooms</Button>
            <Button component={Link} to="/Users" className={styles.button}>Users</Button>
            <Button component={Link} to="/BookingRecords" className={styles.button}>Booking Records</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '24px' }}>
          <Button className={styles.button}>User Name Here</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}