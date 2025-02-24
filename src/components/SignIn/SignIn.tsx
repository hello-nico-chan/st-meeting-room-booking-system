import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { UserLoginResponse } from '../../models/userLoginResponse';
import { setUserId, setUserName, setUserIsAdmin, setUserAccessToken, setUserRefreshToken } from '../../store/actionCreators';
import { useDispatch } from 'react-redux';
import { SERVER_URL } from '../../constants';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post<UserLoginResponse>(`${SERVER_URL}/user/login`, {
      username: username,
      password: password
    })
      .then(response => {
        dispatch(setUserId(response.data.id));
        dispatch(setUserName(response.data.username));
        dispatch(setUserIsAdmin(response.data.isAdmin));
        dispatch(setUserAccessToken(response.data.accessToken));
        dispatch(setUserRefreshToken(response.data.refreshToken));
      })
      .catch(error => {
        if (error.response?.status === 401) {
          setErrorMessage('Invalid username or password.');
          setOpenDialog(true);
        } else {
          console.error('Error:', error);
        }
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: 2
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-descriptiga on"
      >
        <DialogTitle id="alert-dialog-title">Login failed</DialogTitle>
        <DialogContent>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
