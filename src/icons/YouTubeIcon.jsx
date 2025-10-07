import SocialIconBase from "./SocialIconBase";

export default function YouTubeIcon(props) {
  return (
    <SocialIconBase title="YouTube" {...props}>
      <path
        d="M7 11.2c.4-1.7 1.9-2.9 3.6-2.9h6.8c1.7 0 3.2 1.2 3.6 2.9.6 2.5.6 4.2 0 6.7-.4 1.7-1.9 2.9-3.6 2.9h-6.8c-1.7 0-3.2-1.2-3.6-2.9-.6-2.5-.6-4.2 0-6.7Z"
        strokeWidth="1.4"
      />
      <path d="M12.2 12.6c0-.6.6-.9 1.1-.6l4 2.4a.7.7 0 0 1 0 1.2l-4 2.4c-.5.3-1.1 0-1.1-.6v-4.8Z" fill="currentColor" />
      <path d="M8.8 8.4c1.1-1.4 2.7-2.3 4.5-2.4" opacity="0.7" />
    </SocialIconBase>
  );
}
