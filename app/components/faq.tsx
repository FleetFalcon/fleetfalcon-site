import { Plus } from "lucide-react";
import { faqItems } from "../content";

// Native <details> — keyboard-accessible and needs no client JS. The marker rotates via
// the open state; prose stays at a comfortable measure.
export function Faq() {
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqItems.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-lg font-bold text-foreground">{item.question}</span>
            <Plus className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="measure pb-5 text-[15px] leading-relaxed text-foreground-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
