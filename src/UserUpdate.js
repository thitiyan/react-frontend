import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function UserUpdate() {  
  const { id } = useParams();
  const [result, setUsers] = useState([])
  useEffect(() => {
    fetch("http://localhost:3335/select/"+id)
      .then(res => res.json())
      
      .then(
        
        (result) => { 
          setUsers(result)
        }
      )
  }, [id])

  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'id': id,
      'fname': fname,
      'lname': lname,
      'username': username,
      'email': email,
      'password': password,
    }
    fetch('http://localhost:3335/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert('update success')
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      }
    )
  }

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container sx={{ p:2 }} maxWidth="sm">    
      <div>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        {result.map((user) => (
        
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt:2 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                defaultValue={user.fname}
                onChange={(e) => setFname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                defaultValue={user.lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                defaultValue={user.username}
                onChange={(e) => setUsername(e.target.value)}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="password"
                defaultValue={user.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
           
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
            </Button>
            </Grid>
          </Grid>
        </form>
        ))}
      </div>
    </Container>
  );
}