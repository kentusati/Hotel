import {Button, TextField, Typography} from '@mui/material';
import React, { useState } from 'react';
import { VisibleProps } from './InterfacesAndProps/Props';


const RegistrationForm: React.FC<VisibleProps> = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', username, password, email);
  };

  return (
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
  );
};

export default RegistrationForm;