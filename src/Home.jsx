import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import axios from 'axios'
import VoteView from './VoteView';


const Register = (props) => {


    const {setUser, setRegist} = props;


    const [user, setUsername] = useState(null);
    const [em, setEm] = useState(null);
    const [pass, setPassword] = useState(null);
    const [message, setMessage] = useState(null);
    

    const submitHandler = (e)=>{
        e.preventDefault();
        const data = {
            username : user,
            email: em,
            password : pass
        }

        axios.post('http://127.0.0.1:5000/register', data)
        .then((resp)=>{
            console.log(resp)
            const response = resp.data;
            setMessage(response.message)

            if(response.message === "Successfull"){
                localStorage.setItem("USER_ID", response.user_id)
                localStorage.setItem("USERNAME", user);
                setUser(true);
            }
        })
        .catch((err)=>{
            setMessage("Enter valid details")
            console.log(err)
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <h1 style={{ textAlign : "center"}}>Register</h1>
            <h3 style={{ textAlign : "center"}}>{message ? message : null }</h3>


        <Box component="form" onSubmit={(e)=>submitHandler(e)} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
                value={user}
                onChange={(e)=> setUsername(e.target.value)}
            />
             <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                autoComplete="off"
                autoFocus
                value={em}
                onChange={(e)=> setEm(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={pass}
                onChange={(e)=> setPassword(e.target.value)}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Register
            </Button>
           
        </Box>
        <Button
                onClick={()=>setRegist(false)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >

            Already a user ?
        </Button>
      </Container>
    );
}



const Login = (props) => {


    const {setUser, setRegist} = props;


    const [user, setUsername] = useState(null);
    const [pass, setPassword] = useState(null);
    const [message, setMessage] = useState(null);
    

    const submitHandler = (e)=>{
        e.preventDefault();
        const data = {
            username : user,
            password : pass
        }

        axios.post('http://127.0.0.1:5000/login', data)
        .then((resp)=>{
            const response = resp.data;
            setMessage(response.message)

            if(response.message === "Successful"){
                console.log(response)
                localStorage.setItem("USER_ID", response.user_id)
                localStorage.setItem("USERNAME", user);
                setUser(true);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <h1 style={{ textAlign : "center"}}>Login</h1>

        <Box component="form" onSubmit={(e)=>submitHandler(e)} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
                value={user}
                onChange={(e)=> setUsername(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={pass}
                onChange={(e)=> setPassword(e.target.value)}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
           
            <h3 style={{ textAlign : "center"}}>{message ? "Login " + message : null }</h3>
        </Box>

        <Button
                onClick={()=> setRegist(true)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            New User ?
        </Button>
      </Container>
    );
}




const Home = ()=>{

    const [user, setUser] = useState(false);

    const [regist, setRegist] = useState(false);


    const SignOut = (e)=>{
        e.preventDefault();
        localStorage.removeItem("USER_ID")
        localStorage.removeItem("USERNAME")

        setUser(false);
    }


    return (
      <div>

        
            {user ? 

            <div style={{textAlign: 'center'}}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color='warning'
                sx={{ width : '300px', margin: '20px'}}
                onClick={(e)=> SignOut(e)}
                >
                Sign out
                </Button>
                
                <VoteView/> 
            </div> : 

            regist ? <Register setUser = {setUser} setRegist = {setRegist}/> : <Login setUser = {setUser} setRegist = {setRegist}/>
            
            }
      </div>
    )
  }

  
export default Home;