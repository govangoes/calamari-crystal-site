import SocialIconBase from "./SocialIconBase";

export default function RedditIcon(props) {
  return (
    <SocialIconBase title="Reddit" {...props}>
      <path d="M14 6.6c1.5 0 2.9.4 4.1 1.2" opacity="0.7" />
      <path d="M9 12.6c-1.7 1.1-2.7 2.6-2.7 4.3 0 3.1 3.2 5.6 7.7 5.6s7.7-2.5 7.7-5.6c0-1.7-1-3.3-2.7-4.3" strokeWidth="1.4" />
      <circle cx="9" cy="11.4" r="1.3" fill="currentColor" />
      <circle cx="19" cy="11.4" r="1.3" fill="currentColor" />
      <circle cx="12.2" cy="15.4" r=".8" fill="currentColor" />
      <circle cx="16" cy="15.4" r=".8" fill="currentColor" />
      <path d="M12.5 19.4c.9.5 2.1.5 3 0" strokeWidth="1.3" />
      <path d="M14 9.8l1-4.4 3.2 1" strokeWidth="1.3" />
    </SocialIconBase>
  );
}
