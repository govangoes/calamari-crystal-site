export default function NavPills(){
  return (
    <nav style={{display:"flex", gap:10, flexWrap:"wrap"}}>
      <a className="pill" href="/">Home</a>
      <a className="pill" href="#about">About</a>
      <a className="pill" href="/shop">Shop</a>
      <a className="pill" href="/contact">Contact</a>
    </nav>
  );
}
