import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import styles from './Header.module.css';

export default function Header() {
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '24px' }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Meeting Room Booking System
          </Typography>
          <Box>
            <Button className={styles.button}>Meeting Rooms</Button>
            <Button className={styles.button}>Users</Button>
            <Button className={styles.button}>Booking Records</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '24px' }}>
          <Button className={styles.button} >User Name Here</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
