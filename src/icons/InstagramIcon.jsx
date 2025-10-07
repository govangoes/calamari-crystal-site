import SocialIconBase from "./SocialIconBase";

export default function InstagramIcon(props) {
  return (
    <SocialIconBase title="Instagram" {...props}>
      <path
        d="M8.2 9.1C8.2 7.4 9.6 6 11.3 6h5.4c1.7 0 3.1 1.4 3.1 3.1v5.4c0 1.7-1.4 3.1-3.1 3.1h-1.6"
        strokeWidth="1.4"
      />
      <path
        d="M9.2 18.6c1.3 1.9 4.1 2.5 6 1.2 1.9-1.2 2.4-3.6 1.1-5.4-1.1-1.4-3.1-1.8-4.7-.9"
        strokeWidth="1.4"
      />
      <circle cx="19.1" cy="8.4" r="1.1" fill="currentColor" opacity="0.9" />
      <path d="M8.2 11.4v4.5" strokeWidth="1.4" />
    </SocialIconBase>
  );
}
