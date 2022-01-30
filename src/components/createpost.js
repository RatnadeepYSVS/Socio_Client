import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    Textarea,
    Heading
  } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { UserContext } from '../contexts/userContext';
import Home from './Home';
import { url } from './Api';
export default function PostForm(){
    const toast = useToast()
    const [title,setTitle]=useState('')
    const [post,setPost]=useState('')
    const token = localStorage.getItem("token")
    const { auth }=useContext(UserContext)
    const { postdataid } = useParams()
    const { user }=auth
    const id = user._id
    const history = useNavigate()
    useEffect(()=>{
        if(postdataid){        
            axios.get(`${url}/getpost/${postdataid}`,{
            headers:{
                "Authorization":token
            }
        }).then(({ data })=>{
            console.log(data.post)
            setTitle(data.post.title)
            setPost(data.post.post)
        }).catch(e=>{
            console.log(e.response.data)
        })
        } 
    },[token])
    const updateData =async()=>{
        if(!title || !post){
            return  toast({
                variant:"top-accent",
                status:"error",
                isClosable:true,
                position:"top-right",
                title:"Enter Fields"
            })
        }
        const { data } = await axios.put(`${url}/updatepost/${postdataid}`,{
            title,
            post,
        },{
            headers:{
                "Authorization":token
            }
        })
        console.log(data)
        toast({
            variant:"top-accent",
            status:"success",
            isClosable:true,
            position:"top-right",
            title:"Post Updated"
        })
        setTitle("");setPost("");
        history("/")
    }
    const handleSubmit = async()=>{
        if(!title || !post){
            return  toast({
                variant:"top-accent",
                status:"error",
                isClosable:true,
                position:"top-right",
                title:"Enter Fields"
            })
        }
        const { data } = await axios.post(`${url}/createpost`,{
            title,
            post,
            user:id
        },{
            headers:{
                "Authorization":token
            }
        })
        console.log(data)
        toast({
            variant:"top-accent",
            status:"success",
            isClosable:true,
            position:"top-right",
            title:"Post Created"
        })
        setTitle("");setPost("");
        history("/")
    }
    return token?(
        <div style={{maxWidth:"600px",display:"block",margin:"20px auto"}}>
        <Heading style={{fontFamily:"inherit",textAlign:"center"}}>
            {postdataid?"UpdatePost":"CreatePost"}
        </Heading>
        <form>
            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                type="text"
                placeholder="title"
                size="lg"
                value={title}
                onChange={event => setTitle(event.target.value)}
                />
            </FormControl>
            <FormControl isRequired mt={6}>
                <FormLabel>PostData</FormLabel>
                <Textarea
                placeholder="Enter your post...."
                size="lg"
                h='250px'
                value={post}
                onChange={event => setPost(event.target.value)}
                />
            </FormControl>
            <Button
                variantColor="teal"
                variant="outline"
                width="full"
                mt={4}
                bgColor='tomato'
                style={{
                    maxWidth:"100px",display:"block",
                    margin:"20px auto",color:"white"
                }}
                onClick={postdataid?updateData:handleSubmit}
            >
                Submit
            </Button>
    </form>
    </div>
    ):<Home/>
}