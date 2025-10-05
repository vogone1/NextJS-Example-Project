'use client';
import React from 'react';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <section className="fullPageSection">
      <div className="container">
        <header className="hero">
          <p className="eyebrow">Frontend Engineer</p>
          <h1>
            Build{' '}
            {' '}
            UIs
          </h1>
          <p className="lede">I design and ship modern web experiences with performance, DX, and delightful details at the core.</p>
          <div className="actions">
            <a className="primary" href="/projects">View Projects</a>
            <a className="ghost" href="/cv">View CV</a>
          </div>
        </header>
      </div>
    </section>
  );
};

export default Home;
