import { BOOKING_STEPS } from "../content/services.js";
import CrystalCard from "./ui/CrystalCard.jsx";

/** "How booking works" as four numbered steps. */
export default function BookingSteps({ className = "" }) {
  const rootClassName = ["grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className]
    .filter(Boolean)
    .join(" ");

  return (
    <ol className={rootClassName} aria-label="How booking works">
      {BOOKING_STEPS.map((step, index) => (
        <li key={step.title}>
          <CrystalCard variant="outline" className="h-full p-5">
            <span className="text-sm font-semibold text-crystal">Step {index + 1}</span>
            <h3 className="mt-1 text-base font-semibold text-paperWhite">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.detail}</p>
          </CrystalCard>
        </li>
      ))}
    </ol>
  );
}
