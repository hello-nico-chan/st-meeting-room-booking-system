import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { signOut } from '../../store/actionCreators';

export default function Header() {
  const username = useSelector((state: RootState) => state.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignout = () => {
    dispatch(signOut());
    localStorage.clear();
    navigate('/');
  }
  
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '50px' }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            <Button component={Link} to="/" className={styles.title}>Meeting Room Booking System</Button>
          </Typography>
          <Box>
            <Button component={Link} to="/Book" className={styles.button}>Book</Button>
            <Button component={Link} to="/MeetingRooms" className={styles.button}>Meeting Rooms</Button>
            <Button component={Link} to="/Users" className={styles.button}>Users</Button>
            <Button component={Link} to="/BookingRecords" className={styles.button}>Booking Records</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '50px' }}>
          {username === "" ? (
            <div>NOT LOGGED IN</div>
          ) : (
            <Button color="inherit" onClick={onSignout}>{username} (Logout)</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}