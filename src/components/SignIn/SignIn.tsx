import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { UserLoginResponse } from '../../models/userLoginResponse';
import { setUserName, setUserAccessToken, setUserRefreshToken } from '../../store/actionCreators';
import { useDispatch } from 'react-redux';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post<UserLoginResponse>('http://localhost:5154/api/user/login', {
      username: username,
      password: password
    })
      .then(response => {
        dispatch(setUserName(response.data.username));
        dispatch(setUserAccessToken(response.data.accessToken));
        dispatch(setUserRefreshToken(response.data.refreshToken));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>登录</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="用户名"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          label="密码"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          登录
        </Button>
      </form>
    </div>
  );
}