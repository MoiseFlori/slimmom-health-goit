import React from 'react'
import LoginForm from '../components/form/LoginForm'
import { useSelector } from "react-redux";
import ImagesContainer from '../components/hero/ImagesContainer'

const Login = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <LoginForm />
      {!user && <ImagesContainer  variant="login"/>}
    </>
  );
}

export default Login