import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet()
  }, [])
  
  const UsersGet = () => {
    fetch("http://localhost:3335/listuser")
      .then(res => res.json())
    

      .then(
        (result) => {
          setUsers(result)
          console.log(result)
        }
      )
  }

  const UpdateUser = id => {
    window.location = '/update/'+id
  }

  const UserDelete = id => {
    var data = {
      'id': id
    }
    fetch('http://localhost:3335/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert('delete success')
        console.log(result)
        if (result['status'] === 'ok') {
          UsersGet();
        }
      }
    )
  }

  return (
    <Container sx={{ p:2 }} maxWidth="lg">    
      <Paper sx={{ p:2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              USERS
            </Typography>
          </Box>
          <Box>
            <Link to="/create">
            <Button variant="contained" color="success">
        สร้าง
      </Button>
            </Link>
            <Link to="/repicture">
            <Button variant="contained" color="primary">
        Gallery
      </Button>
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="center">รูป</TableCell>
              <TableCell align="left">ชื่อ</TableCell>
              <TableCell align="left">นามสกุล</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="center">control</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.ID}>
                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Avatar src={user.avatar} />
                  </Box>
                </TableCell>
                <TableCell align="left">{user.fname}</TableCell>
                <TableCell align="left">{user.lname}</TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="center">
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={() => UpdateUser(user.id)}>แก้ไข</Button>
                    <Button variant="contained" color="error" onClick={() => UserDelete(user.id)}>ลบ</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </Container>
    
  );
}