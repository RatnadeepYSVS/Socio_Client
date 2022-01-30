import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "./post";
import axios from "axios"
import { url } from "./Api";
const Posts = () => {
  const [posts,setPosts]=useState([])
  const token = localStorage.getItem("token")
  useEffect(()=>{
      axios.get(`${url}/allposts`,{headers:{
          "Authorization":token
             }}).then(({ data }) => {
            setPosts(data.msg)
          }).catch(e=>{
            console.log(e)
          })
         },[token])
  return (
  <div className="pract">
    {
         posts.length>0?<Flex>
            {
              posts.map(i=><Post key={i._id} title={i.title} likes={i.likes} dislikes={i.dislikes} userid={i.user} postid={i._id}/>)
            }
        </Flex>:<Heading style={{fontFamily:"inherit",textAlign:"center"}}>No posts.</Heading>
    }
  </div>);
};

export default Posts;
