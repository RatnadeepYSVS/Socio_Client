import LoginForm from './signin';
import Posts from './posts';
import { Heading } from '@chakra-ui/react';

const Home = () => {
    const token=localStorage.getItem("token")
    return token?(
        <div>
            <Heading style={{textAlign:"center",fontFamily:"inherit",marginBottom:"20px"}}>Posts</Heading>
            <Posts/>
        </div>

    ):<LoginForm/>
};

export default Home;
