import React from "react";
import RegistrationForm from "../components/form/RegistrationForm";
import { useSelector } from "react-redux";
import ImagesContainer from "../components/hero/ImagesContainer";

const Register = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <RegistrationForm />
      {!user && <ImagesContainer variant="login" />}
    </>
  );
};

export default Register;
