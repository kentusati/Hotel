import {Button,Alert, TextField, Typography} from '@mui/material';
import React, { useState } from 'react';
import { VisibleProps } from './InterfacesAndProps/Props';
import { userStorage } from './Storage/UserStorage';


const RegistrationForm: React.FC<VisibleProps> = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {succes , isLoading, error,register} = userStorage();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', username, password, email);
    await register(username,email,password);
  };

  if(isLoading){
    <div>Loading...</div>
  }
  if(error){
    <div>{error.message}
    </div>
  }

  return (
    <div>
      {succes && (<Alert severity="success">This is a success alert — check it out!</Alert>)}


    <form onSubmit={handleSubmit}>
      <Typography variant="h3">Регистрация</Typography>
      <div>
      <TextField required
       id="username" label="username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
      <TextField required
       id="email" label="email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
      <TextField required
       id="password" label="password"  type="password"
          autoComplete="current-password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div style={{padding: '5px'}}>
        <Button variant="contained" type="submit"> Регистрация </Button>
        <Button variant="text" onClick={props.onChange}>Войти</Button>
      </div>

    </form>
    </div>


  );
};

export default RegistrationForm;