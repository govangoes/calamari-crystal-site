import SocialIconBase from "./SocialIconBase";
export default function BeRealIcon(props){
  return (
    <SocialIconBase title="BeReal" {...props}>
      <rect x="6" y="9" width="16" height="10" rx="2" opacity=".12"/>
      <text x="10" y="16.5" fontSize="6.2" fill="currentColor" fontFamily="ui-sans-serif,system-ui" fontWeight="700">Be</text>
    </SocialIconBase>
  );
}
