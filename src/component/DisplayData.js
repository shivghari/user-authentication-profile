import React, { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { DeleteOutlined } from "@mui/icons-material"
import Avatar from "@mui/material/Avatar";
import { Typography } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import AuthData from './AuthData';

import { useNavigate } from 'react-router-dom';

export default function DisplayData() {

    const [notes, setNotes] = useState([])
    console.log(notes)

    useEffect(()=>{
        axios.get('http://localhost:3001/mongoose/allData').then((res)=>{
            setNotes(res.data.data)
        })
    },[])

  const navigate = useNavigate()
  return (
    <Box sx={{width : '85%', margin : 'auto', marginTop : '20px'}}>
        <Typography variant='h2'  sx={{marginBottom : '20px'}}>All Users</Typography>
        <Grid container spacing={3} elevation={3}>
                {
                    notes.map((i) => {
                        return (
                            <Grid item key={i._id} xs={12} sm={6} md={4} sx={{width : '200px'}}>
                                <Paper>
                                    <Card>
                                        <CardHeader sx={{textAlign : 'initial'}}
                                            action={
                                                <IconButton>
                                                    <DeleteOutlined color="error" />
                                                </IconButton>
                                            }
                                            avatar={
                                                <Avatar alt="Travis Howard" src={process.env.REACT_APP_BACKEND_IMAGE_LINK+i.file}>
                                                    {/* {i.username[0].toUpperCase()} */}
                                                </Avatar>
                                            }
                                            title={i.username}
                                            subheader={i.email}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary">
                                                Salary : {i.salary}
                                            </Typography>
                                            <img src={process.env.REACT_APP_BACKEND_IMAGE_LINK+i.file} alt="profile" height={100} width={200}/>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Button variant='contained' size='large' sx={{marginLeft : 2, marginTop : 4}} onClick={()=>{
                    AuthData.logout()
                    navigate('/')
                }}>Logout</Button>

            <Button variant='contained' size='large' sx={{marginLeft : 2, marginTop : 4}} onClick={()=>{
                    navigate('/home')
                }}>Update Your Data</Button>
    </Box>
    
  )
}


// sx={{
//     backgroundColor : ()=>{
//         if(i.gender === "Male"){
//             return '#242bf2'
//         }else if (i.gender === "Female"){
//             return '#e96af7'
//         }else{
//             return '#685f69'
//         }
//     }
// }}