import React from "react";
import Footer from "./Footer";
import MainContent from "./MainContent";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Sidebar />
      <MainContent />
      <Footer />
    </>
  );
};

export default Home;
