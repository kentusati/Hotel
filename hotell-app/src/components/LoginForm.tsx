import {Button, TextField, Typography} from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useStorage } from './Storage/StorageUsers';
import { useNavigate } from 'react-router-dom';
import {VisibleProps} from './InterfacesAndProps/Props'


const LoginForm: React.FC<VisibleProps> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fetchUsers = useStorage((state) => state.users);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', username, password);
    if(username === "Admin"){ 
      navigate('/adminPanel');
      useEffect(() => {
        getAllUsers(); // Получаем пользователей с сервера при монтировании компонента
      }, [fetchUsers]);
    }
    else navigate('/home');
  };


  return (
    <form onSubmit={handleSubmit}>
        <Typography variant="h3">Добро пожаловать</Typography>
      <div>
      <TextField id="username" required 
       label="username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)}/>
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