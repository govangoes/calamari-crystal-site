import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import SocialLinks from "./components/SocialLinks.jsx";

function Home() {
  return (
    <main>
      <section className="hero">
        <h1 style={{ fontSize: "2.25rem", margin: 0, lineHeight: 1.2 }}>
          GoVanGoes — Be the Vibe. Be the Voice.
        </h1>
        <p style={{ opacity: 0.85, marginTop: ".5rem" }}>
          Bars, mind games & mystery. Wildly influential hip-hop.
        </p>
        <div style={{ marginTop: "1rem" }}>
          <a className="pill" href="/press-kit.pdf">🎤 EPK</a>{" "}
          <a className="pill" href="#music">🔊 Listen</a>{" "}
          <a className="pill" href="#merch">🛍️ Merch</a>
        </div>
        <SocialLinks className="mt-10" />
      </section>

      <section className="section">
        <img
          src="/images/logo2.png"
          alt="Cloutlandish emblem"
          style={{
            maxWidth: "380px",
            width: "100%",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,.12)"
          }}
        />
      </section>
    </main>
  );
}

function About() {
  return <div className="section">About page placeholder.</div>;
}

export default function App() {
  return (
    <>
      <header className="section" style={{ paddingBottom: 0 }}>
        <nav className="nav" style={{ borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: ".75rem" }}>
          <Link className="pill" to="/">Home</Link>
          <Link className="pill" to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<div className="section">Not Found</div>} />
      </Routes>
    </>
  );
}
