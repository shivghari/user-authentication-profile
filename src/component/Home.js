import { Button, TextField, Typography } from '@mui/material'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import AuthData from './AuthData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = styled.form`
    width : 600px;
    margin : auto;
    margin-top : 50px
`;

const Container = styled.div`
    margin-top : 10px;
`;

export default function Home() {
  
    const navigate = useNavigate()

    const [UserName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [salary, setSalary] = useState(0)
    const [file, setfile] = useState({})
    const [id, setId] = useState('')
    const [show, setShow] = useState('')

    useEffect(()=>{
        console.log()
        axios.post('http://localhost:3001/mongoose/getData',{
            name : AuthData.returnUsername(),
        }).then((response)=>{
            setUserName(response.data.data[0].username)
            setEmail(response.data.data[0].email)
            setPassword(response.data.data[0].password)
            setSalary(response.data.data[0].salary)
            setId(response.data.data[0]._id)
            setShow(response.data.data[0].file)
        })

    },[])

    const handleUpdate=(e)=>{
        e.preventDefault()
        var formData = new FormData();
        formData.append('avatar', file)
        formData.append('username', UserName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('salary', salary)
        formData.append('id', id)
        
        axios.post('http://localhost:3001/mongoose/updateData',formData)
          .then(()=>{
            toast.success('Update Successful', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }).catch((err)=>{console.log(err, 'err')})
    }  
    return (
    <Container>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Typography variant='h3'>Update Here</Typography>
            <img src={process.env.REACT_APP_BACKEND_IMAGE_LINK+show} alt="current Profile" height="200px" width="300px"/>
            <Form method='post'>
                <TextField label="UserName" fullWidth required value={UserName} onChange={(e)=>{setUserName(e.target.value)}}></TextField> <br/><br/>
                <TextField label="Email" fullWidth required value={email} onChange={(e)=>{setEmail(e.target.value)}}></TextField><br/><br/>
                <TextField label="Password" fullWidth required value={password} onChange={(e)=>{setPassword(e.target.value)}}></TextField><br/><br/>
                <TextField label="Salary" fullWidth required value={salary} onChange={(e)=>{setSalary(e.target.value)}}></TextField> <br/><br/>
                <TextField  type="file" name="file" fullWidth onChange={(e)=>{setfile(e.target.files[0])}}  inputProps={{ multiple: true }}></TextField> <br/><br/>


                <Button variant='contained' size='large' onClick={(e)=>{
                    handleUpdate(e) 
                }}>Update</Button>
                <Button variant='contained' size='large' sx={{marginLeft : 2}} onClick={()=>{
                    AuthData.logout()
                    navigate('/')
                }}>Logout</Button>
                <Button variant='contained' size='large' sx={{marginLeft : 2}} onClick={()=>{
                    navigate('/display')
                }}>View All Data</Button>
                <Button variant='contained' size='large' sx={{marginLeft : 2}} onClick={()=>{
                    navigate('/galary')
                }}>View Galary</Button>
            </Form>
        </Container>
  )
}


            // username : UserName,
            // email : email,
            // password : password,
            // salary : salary,
            // id : id