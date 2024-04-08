import {Button, TextField, Typography} from '@mui/material'
import React, { useState, useEffect } from 'react';
import { userStorage } from './Storage/UserStorage';
import { useNavigate } from 'react-router-dom';
import {VisibleProps} from './InterfacesAndProps/Props'
import { UserInterface } from './InterfacesAndProps/Interfaces';
import { Sync } from '@mui/icons-material';


const LoginForm: React.FC<VisibleProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {currentUser,setCurrentUser ,error,isLoading, logIn} = userStorage();
  const [isAuth, setAuth] = useState(Boolean)
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await logIn(email,password);
    localStorage.setItem("CurUser",JSON.stringify(currentUser))
    if(currentUser?.role?.name === "Admin"){ 
      localStorage.setItem("isAuth", JSON.stringify(true))
      navigate('/adminPage');
      setCurrentUser(currentUser);
    }
    if(currentUser?.role?.name==="User" && currentUser?.isBlocked==false){
      localStorage.setItem("isAuth", JSON.stringify(true))
      navigate('/home');
      setCurrentUser(currentUser);
      console.log(currentUser)
    }
    if(currentUser?.role?.name==="Manager"){
      localStorage.setItem("isAuth", JSON.stringify(true))
      navigate('/managerPage');
      setCurrentUser(currentUser);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
        <Typography variant="h3">Добро пожаловать</Typography>
      <div>
      <TextField id="username" required
       label="email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
      <TextField required 
       id="password" label="password"  type="password"
          autoComplete="current-password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      </div>
        <div style={{padding: '10px'}}>

          <Button variant="contained" type="submit" > Войти </Button>

        </div>
        <div style={{padding: '3px'}}>
        <Button variant="text" onClick={props.onChange}>Зарегистрироваться</Button>
        </div>

    </form>
  );
};

export default LoginForm;