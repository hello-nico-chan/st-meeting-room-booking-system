import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { UserResponse } from '../../models/userResponse';

export default function Users() {
  const [users, setUsers] = useState<UserResponse[]>([]);

  // 获取用户数据
  useEffect(() => {
    axios.get<UserResponse[]>('http://localhost:5154/api/user/list')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:5154/api/user/${id}`)
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h2>Users</h2>

      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '0 auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
