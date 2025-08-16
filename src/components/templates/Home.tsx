//add "use client" for lottie files to work in Next.js
'use client';
import React from 'react';
import './Home.scss';


const Home: React.FC = () => {
  return (
    <section className="fullPageSection">
      <h1>Welcome to My Page</h1>
      <p>Add your page content here.</p>
    </section>
  );
};

export default Home;
