import logo from './logo.svg';
import './App.css';
import LoginForm from "./LoginForm"
import Login  from "./API/Login"
import {useEffect, useState} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from "react-router-dom";
import NavBar from "./Navbar";
import API_Profile from "./API/API_Profile";
import SideBar from "./SideBar";
function App() {
  return (<Router>
        <Layout></Layout>

      </Router>

  );
}
function Layout(){
  return (
      <div className="container-fluid" style={{height: '90vh'}}>
        <div className="row align-items-start">
          <Content></Content>
        </div>
      </div>
  )
}

function Content(){


  const [errorMsg,setErrorMsg]=useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [jwtToken, setJwtToken] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const navigate = useNavigate();

  const path = useLocation().pathname.toString();


  useEffect(()=>{
    if(jwtToken!==""){
      localStorage.setItem("jwt", jwtToken)
    }

    else {
      const jwt=localStorage.getItem("jwt");
      if(jwt!==null){
        setJwtToken(jwt);
        setLoggedIn(true);
      }

    }
    if(user!==""){
      localStorage.setItem("username",user.username);
    }else{
      const username=localStorage.getItem("username");
      if(username!==null){
        API_Profile.getProfile(username).then((loggedUser)=>{
          setUser(loggedUser);
          if(path=='/login' ||path=='/signup')
            navigate('/');
        }).catch((err)=>{
          setErrorMsg(err.detail)
          setJwtToken('');
          setUser('');
          setLoggedIn(false);
          setSignedUp(false);
          navigate("login");
        });
      }
    }


  },[jwtToken,user])


  const doLogIn = async (username,password) => {

    Login.login(username,password).then((token)=>{
      setJwtToken(token);
      setLoggedIn(true);
      API_Profile.getProfile(username).then((loggedUser)=>{
        setUser(loggedUser);
        if(path=='/login' ||path=='/signup')
          navigate('/');

      }).catch((err)=>{
        setErrorMsg(err.detail)
        setJwtToken('');
        setUser('');
        setLoggedIn(false);
        setSignedUp(false);
        navigate("login");
      });

    })
        .catch((err)=>{
          setErrorMsg(err.detail)
          navigate("login");
        })



  }

  const doLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("jwt")
    setJwtToken('');
    setUser('');
    setLoggedIn(false);
    setSignedUp(false);
    navigate("/");
  }




  switch (path){
    case '':
    case '/':
    case '/login':
      if(loggedIn && errorMsg!=="")
        return (<><NavBar loggedIn={loggedIn} user={user} logout={doLogout} login={doLogIn}></NavBar><SideBar loggedIn={loggedIn} user={user}></SideBar><div className="col-9">{errorMsg}</div></>)
      if(loggedIn)
          return (<><NavBar loggedIn={loggedIn} user={user} logout={doLogout} login={doLogIn}></NavBar><SideBar loggedIn={loggedIn} user={user}></SideBar><div className="col-9">You are already logged in!</div></>)
      return (<><NavBar loggedIn={loggedIn} user={user} logout={doLogout} login={doLogIn}></NavBar><SideBar loggedIn={loggedIn} user={user}></SideBar><div className="col-9"><LoginForm login={doLogIn} loggedIn={loggedIn} logout={doLogout} errorMsg={errorMsg} setErrorMsg={setErrorMsg} isLoggedIn={loggedIn}></LoginForm></div></>);
    default:
      return <h1>Path not found</h1>
  }
}

export default App;
