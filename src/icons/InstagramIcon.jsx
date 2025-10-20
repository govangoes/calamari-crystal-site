import SocialIconBase from "./SocialIconBase";
export default function InstagramIcon(props) {
  return (
    <SocialIconBase title="Instagram" {...props}>
      <rect
        x="6"
        y="6"
        width="16"
        height="16"
        rx="4"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="14" cy="14" r="4.2" />
      <circle cx="19.4" cy="8.6" r="1.4" />
    </SocialIconBase>
  );
}
