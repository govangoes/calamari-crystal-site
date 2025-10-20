import "./BackgroundPattern.css";

export default function BackgroundPattern() {
  return (
    <div className="cc-background" aria-hidden="true">
      <span className="cc-background__ripple" />
      <svg className="cc-background__filter" width="0" height="0">
        <filter id="cc-texture">
          <feTurbulence result="noise" numOctaves="3" baseFrequency="0.7" type="fractalNoise" />
          <feSpecularLighting
            result="specular"
            lightingColor="#fff"
            specularExponent="20"
            specularConstant="0.8"
            surfaceScale="2"
            in="noise"
          >
            <fePointLight x="50" y="50" z="120" />
          </feSpecularLighting>
          <feComposite result="litNoise" operator="in" in="specular" in2="SourceGraphic" />
          <feBlend mode="overlay" in="litNoise" in2="SourceGraphic" />
        </filter>
      </svg>
    </div>
  );
}
