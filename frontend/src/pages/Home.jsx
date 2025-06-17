import React from "react";
import Hero from "../components/hero/Hero";
import ImagesContainer from "../components/hero/ImagesContainer";
import useLoadProfile from "../hooks/useLoadProfile";

const Home = () => {
  useLoadProfile();

  return (
    <>
      <Hero />
    </>
  );
};

export default Home;
