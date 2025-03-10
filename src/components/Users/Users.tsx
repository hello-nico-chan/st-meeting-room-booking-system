import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { UserResponse } from '../../models/userResponse';
import { SERVER_URL } from '../../constants';

export default function Users() {
  const [users, setUsers] = useState<UserResponse[]>([]);

  const userIsAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    axios.get<UserResponse[]>(`${SERVER_URL}/user/list`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDelete = (id: string) => {
    axios.delete(`${SERVER_URL}/user/${id}`)
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
              <TableCell>User Type</TableCell>
              {userIsAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                {userIsAdmin && <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
