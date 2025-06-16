import React from "react";
import Hero from "../components/hero/Hero";
import ImagesContainer from "../components/hero/ImagesContainer";
import useLoadProfile from "../hooks/useLoadProfile";
import { useSelector } from "react-redux";

const Home = () => {
  useLoadProfile();
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Hero />
      {!user && <ImagesContainer variant="home" />}
    </>
  );
};

export default Home;
