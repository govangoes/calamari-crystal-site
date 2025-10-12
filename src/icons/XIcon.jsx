import SocialIconBase from "./SocialIconBase";
export default function XIcon(props) {
  return (
    <SocialIconBase title="X" {...props}>
      <path d="M8 8 L20 20" stroke="currentColor" strokeWidth="2" />
      <path d="M20 8 L8 20" stroke="currentColor" strokeWidth="2" />
    </SocialIconBase>
  );
}
