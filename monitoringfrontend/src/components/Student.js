import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';
export default function Student() {
  const paperStyle = {padding:'50px 20px', width:600, margin:"20px auto"}
  const [name, setName]=useState('')
  const [address, setAddress]=useState('')
  const handleClick=(e)=>{
    e.preventDefault()
    const Student={name,address}
    console.log(Student)
    fetch("http://localhost:8080/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(Student)
  }).then(()=>{
    console.log("New student added")
  })}
  return (
    
    <Container>
      <Paper elevation={3} style = {paperStyle}>
        <h1 style={{color:"green"}}><u> Add student</u></h1>
    <Box
        
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Student name" variant="standard" fullWidth
      value = {name}
      onChange ={(e)=>setName(e.target.value)}
      />
      <TextField id="standard-basic" label="Student address" variant="standard" fullWidth
      value = {address}
      onChange = {(e)=>setAddress(e.target.value)}
      />
    </Box>
    <Button variant="contained" color="success" onClick={handleClick}>
      Add
    </Button>
    </Paper>
    </Container>
  );
} 
