//add "use client" for lottie files to work in Next.js
'use client';
import React from 'react';
import Navbar from '../organisms/Navbar/Navbar';
import './Home.scss';


const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <section className="fullPageSection"></section>
    </>
  );
};

export default Home;
