import SocialIconBase from "./SocialIconBase";

export default function LinkedInIcon(props) {
  return (
    <SocialIconBase title="LinkedIn" {...props}>
      <circle cx="9.4" cy="8.4" r="1.2" fill="currentColor" />
      <path d="M8.6 11.4v9.4" strokeWidth="1.4" />
      <path d="M12.6 11.4v9.4" strokeWidth="1.4" />
      <path d="M12.6 14.4c.5-1.6 1.9-2.6 3.4-2.6 2 0 3.6 1.6 3.6 3.6v5.4" strokeWidth="1.4" />
      <path d="M19.6 10.4c-1.5-1.4-3.6-2.2-5.7-2.1" opacity="0.7" />
    </SocialIconBase>
  );
}
