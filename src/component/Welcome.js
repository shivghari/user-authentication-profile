import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
 
export default function Welcome() {
  const navigate = useNavigate()
  
  return (
    <div>
        <Typography variant="h1" sx={{
            marginTop : 35
        }}>
            Welcome
        </Typography>
        <Button variant='contained' onClick={()=>{navigate('/signin')}}>Signin</Button>
        <Button variant='contained'
            sx={{
                marginLeft : 2
            }}
            onClick={()=>{navigate('/login')}}
        >
            Login
        </Button>
    </div>
  )
}
