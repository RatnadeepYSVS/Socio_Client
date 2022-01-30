import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext"
import { useContext } from "react";
import axios from "axios"
import {url} from "./Api"
const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const { auth,dispatch }=useContext(UserContext)
  const { isAuth }=auth
  const history = useNavigate()
  const toast = useToast()
  const token = localStorage.getItem("token")
  useEffect(()=>{
    console.log(isAuth)
  },[isAuth])
  const logOut=()=>{
    axios.get(`${url}/logout`,{headers:{
      "Authorization":token
    }}).then(
      res=>{
        console.log(res.data)
      }).catch(e=>{
        console.log(e.response.data)
      })
    dispatch({type:"LOGOUT"})
    history("/")
    toast({
      title: "Logged Out Successfully",
      status: 'success',
      variant:'top-accent',
      isClosable: true,
      position:'top-right'
    })
    localStorage.removeItem("token")
  }
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={8}>
        <WrapItem>
        <Heading as='h1' size='xl' style={{fontFamily:"inherit"}}>
            <Link to="/">
                Socio!!
            </Link>
        </Heading>
        </WrapItem>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>
      {token?
      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 15, md: 0 }}
      >
      <Link to="/createpost">Create-Post</Link>
      </Stack>
      :<Stack/>
      }
      {token?      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          variant="outline"
          _hover={{ bg: "teal.700", borderColor: "teal.700" }}
          onClick={logOut}
        >
          Logout
        </Button>
      </Box>:      <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      mt={{ base: 4, md: 0 }}
    >
      <Button
        variant="outline"
        _hover={{ bg: "teal.700", borderColor: "teal.700" }}
      >
      <Link to="/signup">
          Create Account
      </Link>
      </Button>
    </Box>}
    </Flex>
  );
};

export default Navbar;
