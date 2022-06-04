import { Button, TextField, Typography } from '@mui/material'
import styled from 'styled-components'
import React, {useState} from 'react'
// import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

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

export default function Signin() {

    const navigate = useNavigate()

    const [UserName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [salary, setSalary] = useState(0)
    const [image, setfile] = useState({})
    const [galary, setgalary] = useState({})

    const hadleSubmit=(e)=>{
        e.preventDefault()
    

        var formData = new FormData();
        var formData1 = new FormData();
        formData.append('avatar', image)
        formData.append('username', UserName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('salary', salary)
        
        for (var i = 0; i < galary.length; i++) {
            var file = galary[i];
            formData1.append('galary', file);
        }
        formData1.append('username', UserName)
        axios.post('http://localhost:3001/mongoose/multiple',
            formData1, {
                headers: { crossdomain: true,
                    'Content-Type': 'undefined'
                }
            }
        ).then(function (response) {

            console.log(response,"dsbhjisbc");
        })
        .catch(function (error) {
        });

        // console.log(formData.getAll('galary'))        


        // axios.post('http://localhost:3001/mongoose/multiple', formData)
        //     .then(()=>{
        //         console.log('multiple file is sent')
        //     }).catch((err)=>{
        //         console.log(err, 'err')
        //     })

        axios.post('http://localhost:3001/mongoose/uploadFile', formData)
        .then((response)=>{
           console.log(response);
            navigate('/login')
        }).catch(err=>{
            console.log(err,'err');
        }) 

    }
    return (
        <Container>
            <Typography variant='h3'>Signin Here</Typography>
            <Form method='post' onSubmit={hadleSubmit} enctype="multipart/form-data" name="myForm" id="myForm">
                <TextField label="UserName"  name="username" fullWidth required onChange={(e)=>{setUserName(e.target.value)}}></TextField> <br/><br/>
                <TextField label="Email" name="email" fullWidth required onChange={(e)=>{setEmail(e.target.value)}}></TextField><br/><br/>
                <TextField label="Password" name="password" type="password" onChange={(e)=>{setPassword(e.target.value)}}fullWidth required ></TextField><br/><br/>
                <TextField label="Salary" name="salary" fullWidth required onChange={(e)=>{setSalary(e.target.value)}}></TextField> <br/><br/>
                <TextField  type="file" name="file" fullWidth required onChange={(e)=>{setfile(e.target.files[0])}}  inputProps={{ multiple: true }}></TextField> <br/><br/>

                <TextField  type="file" name="galary" fullWidth required onChange={(e)=>{setgalary(e.target.files)}}  inputProps={{ multiple: true }}></TextField> <br/><br/>

                <Button type='submit' variant='contained' size='large' >SignIn</Button>
                <Button variant='contained' size='large' onClick={()=>{navigate('/login')}} sx={{marginLeft : 2}}>Login</Button>
                
            </Form>
        </Container>
    )
}
