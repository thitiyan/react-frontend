import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function UserCreate() {  
  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'fname': fname,
      'lname': lname,
      'username': username,
      'email': email,
      'password':password,
      'avatar': avatar,
    }
    fetch('http://localhost:3335/create', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (id) => {
        alert('test')
        if (id['status'] === 'ok') {
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
  const [avatar, setAvatar] = useState('');
  return (
    <Container sx={{ p:2 }} maxWidth="sm">    
      <div>
        <Typography component="h1" variant="h5">
          Create Account User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt:2 }} spacing={2}>
            <Grid item xs={7} >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="ชื่อ"
                onChange={(e) => setFname(e.target.value)}
                autoFocus
              />   
            </Grid>

            <Grid item xs={7} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="นามสกุล"
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            





            
            { <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avatar"
                label="รูป"
                onChange={(e) => setAvatar(e.target.value)}
              />       
            </Grid> }
  
  
            <Grid item xs={12}>
              <Button
                type="submit" 
                fullWidth
                variant="contained"
                color="success"
              >
                Create
            </Button>
          
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}