import React from "react";
import Hero from "../components/hero/Hero";

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
