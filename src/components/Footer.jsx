export default function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="section" style={{paddingTop:"3rem", paddingBottom:"3rem"}}>
      <div style={{maxWidth:960, margin:"0 auto", padding:"0 20px", opacity:.85, display:"flex", justifyContent:"space-between", gap:12, flexWrap:"wrap"}}>
        <span>© {year} Cloutlandish™ / GoVanGoes. All rights reserved.</span>
        <a href="#top" className="pill">Back to top</a>
      </div>
    </footer>
  );
}
