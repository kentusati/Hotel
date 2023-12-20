import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import  RegistrationForm  from '../components/RegistrationForm';


const LoginPage: React.FC = () => {
  const [isVisible, setRegVisible] = useState(true);

    const handleChange = () =>
    {
    setRegVisible( prev => !prev);
    }

  return (
    <>
    { isVisible ? <LoginForm onChange={handleChange}/> : <RegistrationForm onChange={handleChange}/> }
    </>
  );
};

export default LoginPage;