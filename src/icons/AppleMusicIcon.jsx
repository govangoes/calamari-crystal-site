import SocialIconBase from "./SocialIconBase";

export default function AppleMusicIcon(props) {
  return (
    <SocialIconBase title="Apple Music" {...props}>
      <rect x="12" y="6" width="2" height="10" rx="1" />
      <rect x="18" y="5" width="2" height="10" rx="1" />
      <path d="M12 7 L20 5.2 L20 7.2 L12 9 Z" />
      <circle cx="10.5" cy="20" r="2.6" />
      <circle cx="17" cy="18" r="2.6" />
    </SocialIconBase>
  );
}
