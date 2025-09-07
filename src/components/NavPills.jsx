import { Link } from "react-router-dom";

export default function NavPills(){
  return (
    <nav style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
      <Link to="/" className="pill">Start Here</Link>
      <Link to="/story" className="pill">About</Link>
      <Link to="/merch" className="pill">Shop</Link>
      <a href="https://youtube.com/@govangoes" target="_blank" rel="noreferrer" className="pill">YouTube</a>
      <a href="https://tiktok.com/@govangoes" target="_blank" rel="noreferrer" className="pill">TikTok</a>
      <a href="https://instagram.com/govangoes" target="_blank" rel="noreferrer" className="pill">Instagram</a>
    </nav>
  );
}
