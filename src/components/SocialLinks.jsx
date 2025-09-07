export default function SocialLinks({ className="" }){
  const links = [
    { href:"https://tiktok.com/@govangoes", label:"TikTok" },
    { href:"https://instagram.com/govangoes", label:"Instagram" },
    { href:"https://youtube.com/@govangoes", label:"YouTube" },
    { href:"https://twitter.com/govangoes", label:"X/Twitter" },
  ];
  return (
    <div className={className} style={{display:"flex",gap:"14px",flexWrap:"wrap",marginTop:18}}>
      {links.map(l=>(
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="pill">{l.label}</a>
      ))}
    </div>
  );
}
