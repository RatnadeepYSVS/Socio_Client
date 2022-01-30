import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Home from './Home';
import { url } from './Api';
import { Heading,Button,Container,Box } from '@chakra-ui/react';
import { CloseIcon, StarIcon } from '@chakra-ui/icons';
const Viewpost = () => {
    const { post } = useParams()
    const [postData,setPostData]=useState({})
    const [user,setUser]=useState({})
    const token = localStorage.getItem("token")
    useEffect(()=>{
      axios.get(`${url}/getpost/${post}`,{
        headers:{
          "Authorization":token
        }
      }).then(({ data })=>{
        const { post,username } = data
        setPostData(post)
        setUser(username)
      }).catch(e=>{
        console.log(e.response.data)
      })
    },[token])
    return token?(
    <Container  mt='10' mb='10' border='2px' p="10px" borderColor='gray.200' maxW='xl' centerContent>
      <Box padding='4' maxW='3xl'>
        <Heading style={{fontFamily:"inherit"}}>
            {postData.title}
        </Heading>
      </Box>
      {   
        [postData.post,`posted by ${user}`].map((i,index)=>(
          <Box key={index} padding='4' maxW='3xl'>
              {i}
          </Box>
        ))
      }
      <Box >
          <StarIcon mr='2' color='pink.300'>
          </StarIcon>
           {postData.likes} Upvotes
          <CloseIcon ml='6' mr='2' color='red.500'>
          </CloseIcon>
          {postData.dislikes} Downvotes
      </Box>
    </Container>
        ):<Home/>;
};

export default Viewpost;
