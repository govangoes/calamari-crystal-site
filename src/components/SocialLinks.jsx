const links = [
  { href:"https://instagram.com/govangoes", label:"Instagram", icon:"instagram" },
  { href:"https://x.com/govangoes",        label:"X",         icon:"x" },
  { href:"https://tiktok.com/@govangoes",  label:"TikTok",    icon:"tiktok" },
  { href:"https://youtube.com/@govangoes", label:"YouTube",   icon:"youtube" },
];

function Icon({name}){
  const stroke = "currentColor";
  switch(name){
    case 'instagram':
      return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke={stroke} strokeWidth="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke={stroke} strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill={stroke}/></svg>;
    case 'x':
      return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M17.53 3H20l-6.56 7.49L21 21h-6.56l-4.3-5.07L4.8 21H2.33l7.1-8.11L3 3h6.56l3.9 4.6L17.53 3Zm-2.31 16.05h2.02L8.86 4.86H6.77l8.45 14.19Z"/></svg>;
    case 'tiktok':
      return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M20 8.1a6.5 6.5 0 0 1-4.2-1.54v7.1a5.66 5.66 0 1 1-4.8-5.6v2.5a3.17 3.17 0 1 0 2.2 3.03V3h2.6A6.5 6.5 0 0 0 20 6.6v1.5Z"/></svg>;
    case 'youtube':
      return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M23 12s0-3.3-.42-4.78a3 3 0 0 0-2.1-2.1C18.99 4.7 12 4.7 12 4.7s-6.99 0-8.48.42a3 3 0 0 0-2.1 2.1C.99 8.7 1 12 1 12s0 3.3.42 4.78a3 3 0 0 0 2.1 2.1c1.49.42 8.48.42 8.48.42s6.99 0 8.48-.42a3 3 0 0 0 2.1-2.1C23 15.3 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg>;
    default: return null;
  }
}

export default function SocialLinks({className=""}){
  return (
    <nav aria-label="Social" className={className} style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
      {links.map((l)=>(
        <a key={l.href} className="pill" href={l.href} target="_blank" rel="noreferrer">
          <Icon name={l.icon} />
          <span>{l.label}</span>
        </a>
      ))}
    </nav>
  );
}
