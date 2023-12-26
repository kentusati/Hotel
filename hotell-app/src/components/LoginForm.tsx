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
  const {users, currentUser,setCurrentUser ,error,isLoading ,fetchUsers, logIn} = userStorage();
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await logIn(email,password);
    if(currentUser?.roleId === "18fa538e-486f-4fb2-a3ac-d68169daf39a"){ 
      navigate('/adminPanel');
      setCurrentUser(currentUser);
    }
    if(currentUser?.roleId==="e6150860-337f-4d3b-81f3-270e23266a8c" && currentUser?.isBlocked==false){
      navigate('/home');
      setCurrentUser(currentUser);
    }
    if(currentUser?.roleId==="2cf25159-a39f-4873-9f77-308f8854ac6c"){
      navigate('/managerPanel');
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