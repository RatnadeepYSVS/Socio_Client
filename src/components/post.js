import { 
  Box,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay, 
} from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/userContext'
import { url } from './Api'
import { useNavigate } from 'react-router'
export default function Post({title,likes,dislikes,postid,userid}) {
    const [user,setUser]=useState('')
    const [isOpen, setIsOpen] =useState(false)
    const cancelRef = useRef()
    const token = localStorage.getItem("token")
    const { auth }=useContext(UserContext)
    const userr=auth.user
    const id = userr._id
    const checkUser = userid===id
    const history = useNavigate()
    const upurl = `/updatepost/${postid}`
    useEffect(()=>{
        axios.get(`${url}/getpost/${postid}`,{
          headers:{
            "Authorization":token
          }
        }).then(res=>{
          setUser(res.data.username)
        }).catch(e=>{
          console.log(e.response.data)
        })
    },[token])
    const posturl=`/viewpost/${postid}`
    const updatePost=()=>{
        return history(upurl)
    } 
    const deletePost=()=>{
      setIsOpen(true)
    }
    const onClose = () => {
      setIsOpen(false)
      axios.delete(`${url}/deletepost/${postid}`,{
        headers:{
          "Authorization":token
        }
      }).then(({data})=>{
        console.log(data)
        window.location.reload()
      }).catch((e)=>{
        console.log(e)
      })
    }
    const addUpvote=async()=>{
        const data =await axios.put(`${url}/addlike/${postid}`,{},{
          headers:{
              "Authorization":token
          }
        })
        window.location.reload(window.location.href)
    }
    const addDownvote=async ()=>{
      const data = await axios.put(`${url}/adddislike/${postid}`,{},{
        headers:{
            "Authorization":token
        }
      })
      window.location.reload(window.location.href)
  }
    return (
      <Box w='300px' mt="5" mr="10" borderWidth='1px' borderRadius='lg' overflow='hidden'>
       
        <Box p='6'>
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
            style={{textAlign:"center"}}
          >
          <Link to={posturl}>
              {title}
          </Link>
          </Box>
          
          <Box display='flex' mt='2' alignItems='center'>
            <Button
            color={'white'}
            background={'pink.300'}
            onClick={checkUser?updatePost:addUpvote}
            >
            {checkUser?"UpdatePost":"Upvote"}
            </Button>
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {likes} Upvotes
            </Box>
          </Box>
          <Box display='flex' mt='2' alignItems='center'>
            <Button
                color={'white'}
                background={'red.600'}
                onClick={ checkUser?deletePost:addDownvote}
            >{
              checkUser?"DeletePost":"Downvote"
            }
            </Button>
            <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={()=>setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                {dislikes} Downvotes
                </Box>
        </Box>
        <Box
        mt='1'
        fontWeight='semibold'
        as='h5'
        lineHeight='tight'
        isTruncated
        style={{textAlign:"center"}}
      >
        Posted by {user}
      </Box>
        </Box>
        
      </Box>
    )
  }