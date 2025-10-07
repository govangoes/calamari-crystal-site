import SocialIconBase from "./SocialIconBase";

export default function TikTokIcon(props) {
  return (
    <SocialIconBase title="TikTok" {...props}>
      <path
        d="M11 10.2c0-1.8 1.5-3.2 3.3-3.2h1.4c0 2.8 2.3 4.8 4.8 4.8"
        strokeWidth="1.5"
      />
      <path
        d="M10 18.4c-.3-2.1 1.1-4 3.1-4.4 1.8-.4 3.5.6 3.9 2.3.6 2.6-1.8 4.9-4.6 4"
        strokeWidth="1.5"
      />
      <path d="M11 12.9v6.3" strokeWidth="1.4" />
      <circle cx="18.9" cy="8" r="1.4" fill="currentColor" opacity="0.75" />
    </SocialIconBase>
  );
}
