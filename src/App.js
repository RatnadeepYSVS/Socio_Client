import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Navbar from './components/navbar';
import LoginForm from './components/signin';
import SignUpForm from './components/signup';
import Test from './components/posts';
import Home from './components/Home';
import Viewpost from './components/viewpost';
import { useContext, useEffect } from 'react';
import { UserContext } from './contexts/userContext';
import { url } from './components/Api';
import axios from 'axios';
import PostForm from './components/createpost';
function App() {
  const {dispatch}=useContext(UserContext)
    const token=localStorage.getItem("token")
    const alreadyLoggedin = async()=>{
      const { data }= await axios.get(`${url}/userdet`,{
        headers:{
          "Authorization":token
        }
      })
      dispatch({type:"LOGIN",user:data.msg})
    }
    useEffect(()=>{
      alreadyLoggedin()
    },[token])
  return (
    <Router>
    <div className="App">  
          <Navbar/>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/signin" element={<LoginForm/>}/>
              <Route exact path="/signup" element={<SignUpForm/>}/>
              <Route exact path="/test" element={<Test/>}/>
              <Route exact path="/viewpost/:post" element={<Viewpost/>}/>
              <Route exact path="/createpost" element={<PostForm/>} />
              <Route exact path="/updatepost/:postdataid" element={<PostForm/>} />
          </Routes>
    </div>
    </Router>
  );
}

export default App;
