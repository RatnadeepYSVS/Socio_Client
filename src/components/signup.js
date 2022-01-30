import { useState,useContext } from 'react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast
  } from '@chakra-ui/react';
import { UserContext } from "../contexts/userContext"
import axios from "axios"
import { url } from "./Api"
import { useNavigate } from 'react-router';
import Home from './Home';
export default function SignUpForm() {
  const toast = useToast()
  const [email,setEmail]=useState('')
  const [passcode,setPasscode]=useState('')
  const [username,setUsername]=useState('')
  const history = useNavigate()
  const { dispatch }=useContext(UserContext)
  const token = localStorage.getItem("token")
  const handleSubmit=(e)=>{
    e.preventDefault()
    const formData = { email,password:passcode,username }
    const emailReg = /\S+@\S+\.\S+/;
    const validEmail = emailReg.test(email)
    const passReg=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$$/
    const validPass = passReg.test(passcode)
    let errMess
    errMess=validEmail?"":"Invalid Email"
    if(!errMess)errMess=validPass?"":"Password must contain a capital letter,small letter,a number,a special character and should have 6 minimum letters"
    if(!errMess){
        axios.post(`${url}/signup`,formData).then(
          ({data})=>{
            const { msg }=data
            toast({
              title: msg,
              status: 'success',
              variant:'top-accent',
              isClosable: true,
              position:'top-right'
            })
            dispatch({type:"SIGNUP",user:data.data})
            localStorage.setItem("token",data.token)
            history("/")
        }).catch(e=>{
          const { msg } = e.response.data
          toast({
            title: msg,
            status: 'error',
            variant:'top-accent',
            isClosable: true,
            position:'top-right'
          })
        }) 
        setEmail('')
        setPasscode('')
        setUsername('') 
    }else{
      toast({
        title: errMess,
        status: 'error',
        variant:'top-accent',
        isClosable: true,
        position:'top-right'
      })
    }
  }
    return token? (<Home/>): (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={12} maxW="960px" mx="auto" borderWidth={2} borderRadius={8} boxShadow="lg" className="addMarg">
          <Box textAlign="center">
            <Heading style={{fontFamily:"inherit"}}>SignUp</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} placeholder="test@test.com" onChange={(e)=>setEmail(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={passcode} placeholder="*******" onChange={(e)=>setPasscode(e.target.value)} />
              </FormControl>
              <Button width="full" mt={4} onClick={handleSubmit} type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    );
}
  