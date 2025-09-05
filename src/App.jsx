import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div style={{padding:'2rem'}}>
      <h1 style={{fontSize:'2rem'}}>GoVanGoes — It lives 🦑</h1>
      <p>If you can read this, routing works.</p>
      <img src="/logo2.png" alt="logo" style={{maxWidth:'200px', display:'block', marginTop:'1rem'}} />
    </div>
  );
}

function About() {
  return <div style={{padding:'2rem'}}>About page placeholder.</div>;
}

export default function App(){
  return (
    <>
      <header style={{padding:'1rem', borderBottom:'1px solid rgba(255,255,255,.15)'}}>
        <nav style={{display:'flex', gap:'1rem'}}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<div style={{padding:'2rem'}}>Not Found</div>} />
      </Routes>
    </>
  );
}
