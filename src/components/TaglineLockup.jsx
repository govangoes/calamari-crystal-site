// src/components/TaglineLockup.jsx

const TaglineLockup = () => {
  return (
    <h1 className="gvg-tagline" aria-label="Wildly Influential. Unapologetically Different.">
      <span className="wildly">Wildly</span>{" "}
      <span className="influential">Influential.</span>
      <br />
      <span className="unapologetic">Unapologetically</span>{" "}
      <span className="different">Different.</span>
      <svg className="underline" viewBox="0 0 800 80" aria-hidden="true" focusable="false">
        <path d="M10,60 C160,10 360,10 790,60" fill="none" />
      </svg>
    </h1>
  );
};

export default TaglineLockup;
