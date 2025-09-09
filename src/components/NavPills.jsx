export default function NavPills(){
  return (
    <nav style={{display:"flex", gap:10, flexWrap:"wrap"}}>
      <a className="pill" href="/">Home</a>
      <a className="pill" href="#about">About</a>
      <a className="pill" href="/story">Story</a>
      <a className="pill" href="/listen">Listen</a>
      <a className="pill" href="/videos">Videos</a>
      <a className="pill" href="/shop">Shop</a>
      <a className="pill" href="/marketing">Marketing</a>
      <a className="pill" href="/business">Business</a>
      <a className="pill" href="/contact">Contact</a>
    </nav>
  );
}
