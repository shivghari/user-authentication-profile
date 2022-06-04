import React, { useEffect, useState } from 'react'
import AuthData from './AuthData'
import axios from 'axios'
import { Button, ImageList, ImageListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
`;

export default function Galary() {

    const [imgList, setimgList] = useState([])
    const [user, setUser] = useState('')

    useEffect(()=>{
        console.log()
        axios.post('http://localhost:3001/mongoose/getData',{
            name : AuthData.returnUsername(),
        }).then((response)=>{
            setimgList(response.data.data[0].galary)
            setUser(AuthData.returnUsername)
        })

    },[])
    const navigate = useNavigate()
  return (
    <Container>
        <Typography variant='h3' sx={{marginBottom : 2}}>{user}'s Galary</Typography>
        <ImageList  sx={{ width: 600, height : 'auto', margin : 'auto'}} cols={3} rowHeight={230}>
            {   
                imgList.map((i)=>{
                    return(
                        <ImageListItem>
                            <img src={`http://localhost:3001/static/${i}`} alt="galaryImage"/><br/>
                        </ImageListItem>
                    )
                })
            }
        </ImageList>
        <Button variant='contained' sx={{marginTop : 2}} onClick={()=>{navigate('/home')}}>Back</Button>
    </Container>
  )
}
