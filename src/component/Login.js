import { Button, TextField, Typography } from '@mui/material'
import styled from 'styled-components'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import AuthData from './AuthData'
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Form = styled.form`
    width : 600px;
    margin : auto;
    margin-top : 50px
`;

const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
`;

export default function Login() {
    const [UserName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const hadleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/mongoose/login', {
            username : UserName,
            password : password
        }).then((response)=>
        {
            AuthData.setAuthentication(response.data.authenticate)
            AuthData.setUser(response.data.username)
            if(response.data.authenticate){
                navigate('/home')
            }else{
                setError(
                    <Alert severity="error" sx={{width : '400px', margin : 'auto', marginTop : '50px'}}>
                        <AlertTitle>Error</AlertTitle>
                        Login Credentials Invalid - <strong>Login failed.</strong>
                    </Alert>
                )
            }
        }).then(()=>{
            console.log('Login Finish')
        })
    }

    return (
        <Container>
            <Typography variant='h3'>Login Here</Typography>
            <Form method='post' onSubmit={hadleSubmit}>
                <TextField label="UserName" fullWidth required onChange={(e)=>{setUserName(e.target.value)}}></TextField> <br/><br/>
                <TextField label="Password" fullWidth required onChange={(e)=>{setPassword(e.target.value)}}></TextField><br/><br/>
                <Button type='submit' variant='contained' size='large'>Login</Button>
                <Button variant='contained' size='large' onClick={()=>{navigate('/signin')}} sx={{marginLeft : 2}}>Signin</Button>
            </Form>
            {error}
        </Container>
    )
}
