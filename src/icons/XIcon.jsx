import SocialIconBase from "./SocialIconBase";

export default function XIcon(props) {
  return (
    <SocialIconBase title="X" {...props}>
      <path d="M7.8 8.4 12 12.6" strokeWidth="1.6" />
      <path d="M16.2 16.8 20.4 21" strokeWidth="1.6" />
      <path d="M20.4 8.4 7.6 21.2" strokeWidth="1.6" />
      <path d="M16.6 7c-.9-.9-2.1-1.4-3.4-1.4-1.5 0-2.9.7-3.7 1.9" opacity="0.75" />
    </SocialIconBase>
  );
}
