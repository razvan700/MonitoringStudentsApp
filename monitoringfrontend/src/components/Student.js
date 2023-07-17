import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  // Function to fetch the CSRF token from the backend
  async function fetchCsrfToken() {
    try {
      const response = await fetch("http://localhost:8080/api/csrf-token", {
        credentials: "include",
      });
      const csrfToken = await response.text();
      // Store the CSRF token in a cookie or local storage.
      document.cookie = `X-CSRF-Token=${csrfToken}; path=/`;
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  }

  // Function to retrieve the CSRF token from the cookie
  function getCsrfTokenFromCookie() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "X-CSRF-Token") {
        return value;
      }
    }
    return null;
  }

  // Fetch CSRF token when the component mounts
  useEffect(() => {
    fetchCsrfToken();
    // Fetch the students data from the backend
    fetch("http://localhost:8080/student/getAll")
      .then(res => res.json())
      .then(result => setStudents(result))
      .catch(error => console.error("Failed to fetch students:", error));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const Student = { name, address };
    console.log(Student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": getCsrfTokenFromCookie(),
      },
      body: JSON.stringify(Student),
    })
      .then(() => {
        console.log("New student added");
        // Fetch updated students data after adding a new student
        fetch("http://localhost:8080/student/getAll")
          .then(res => res.json())
          .then(result => setStudents(result))
          .catch(error => console.error("Failed to fetch students:", error));
      })
      .catch(error => console.error("Failed to fetch:", error));
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "green" }}><u> Add student</u></h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Student name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Student address"
            variant="standard"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>
        <Button variant="contained" color="success" onClick={handleClick}>
          Add
        </Button>
      </Paper>
      <h1>Students</h1>
      <Paper elevation={3} style={paperStyle}>
        {students.map(student => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
            Id:{student.id}<br />
            Name:{student.name}<br />
            Address:{student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
