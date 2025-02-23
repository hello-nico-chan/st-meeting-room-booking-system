import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ width: '100%', position: 'relative', backgroundColor: '#f8f8f8', padding: '20px 0', textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} <strong>Shinetech</strong>. All rights reserved.
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        <Typography variant="body2" color="textSecondary">
          Meeting Room Booking System
        </Typography>
      </Box>
    </Box>
  );
}
