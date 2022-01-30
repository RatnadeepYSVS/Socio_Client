import { useState,useContext } from "react"
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
import { url } from "./Api"
import axios from "axios"
import { UserContext } from "../contexts/userContext"
import Home from "./Home";
import { useNavigate } from "react-router";
export default function LoginForm() {
  const [email,setEmail]=useState('')
  const [passcode,setPasscode]=useState('')
  const toast=useToast()
  const { dispatch }=useContext(UserContext)
  const token=localStorage.getItem("token")
  const history = useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    const formData = { email,password:passcode }
    axios.post(`${url}/login`,formData).then(
      ({ data })=>{
      dispatch({type:"LOGIN",user:data.data})
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
  }
    return token?(<Home/>):(
      <Flex width="full" align="center" justifyContent="center">
        <Box p={12} maxW="960px" borderWidth={2} borderRadius={8} boxShadow="lg" className="addMarg">
          <Box textAlign="center">
            <Heading style={{fontFamily:"inherit"}}>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} placeholder="test@test.com" onChange={(e)=>setEmail(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={passcode} placeholder="*******" onChange={e=>setPasscode(e.target.value)} />
              </FormControl>
              <Button width="full" mt={4} type="submit" onClick={handleSubmit}>
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    )
  }
  