import { FAQ_ITEMS } from "../content/services.js";
import CrystalCard from "./ui/CrystalCard.jsx";

/** Plain <details> accordion: works without JavaScript and is keyboard friendly. */
export default function Faq({ className = "" }) {
  return (
    <div className={["space-y-3", className].filter(Boolean).join(" ")}>
      {FAQ_ITEMS.map((item) => (
        <CrystalCard key={item.question} variant="outline" className="p-0">
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-paperWhite marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-crystal transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
          </details>
        </CrystalCard>
      ))}
    </div>
  );
}
