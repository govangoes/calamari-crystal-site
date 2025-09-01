import SocialIconBase from "./SocialIconBase";
export default function SpotifyIcon(props){
  return (
    <SocialIconBase title="Spotify" {...props}>
      <path d="M7.5 12.2c4.6-1.3 8.4-.7 12 1.1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8.7 16.1c3.5-1 6.5-.6 9.2.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".9"/>
      <path d="M9.8 19c2.2-.7 4.3-.4 6.2.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".85"/>
    </SocialIconBase>
  );
}
