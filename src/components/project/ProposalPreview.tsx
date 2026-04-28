import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"projects">;

/**
 * Print-friendly proposal layout.
 * Used both on screen and when the user hits "Export to PDF" (window.print).
 */
const ProposalPreview = ({ project }: { project: Project }) => {
  const today = format(new Date(), "MMMM d, yyyy");

  return (
    <div
      id="proposal-print"
      className="rounded-2xl border border-border bg-card text-foreground shadow-card print:rounded-none print:border-0 print:shadow-none"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border p-8 print:p-10">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Project proposal
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {project.title}
          </h1>
        </div>
        <div className="text-right">
          <p className="font-display text-sm font-semibold text-foreground">ProjectPilot</p>
          <p className="mt-1 text-xs text-muted-foreground">{today}</p>
        </div>
      </div>

      <div className="space-y-8 p-8 print:p-10">
        {/* Intro message */}
        <section>
          <p className="text-sm leading-relaxed text-foreground/90">
            Hi there — thanks for sharing the brief. Below is a structured plan
            covering scope, timeline and investment. Everything here is a
            starting point; happy to adjust before we kick off.
          </p>
        </section>

        {/* Brief */}
        <section>
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Your brief
          </h2>
          <p className="mt-3 rounded-lg border border-border bg-surface-subtle p-4 text-sm italic text-muted-foreground">
            "{project.client_brief}"
          </p>
        </section>

        {/* Scope */}
        <section>
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Scope
          </h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
            {project.scope}
          </p>
        </section>

        {/* Timeline + Price */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Timeline
            </p>
            <p className="mt-2 font-display text-xl font-bold text-foreground">
              {project.timeline}
            </p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Investment
            </p>
            <p className="mt-2 font-display text-xl font-bold text-foreground">
              {project.price_range}
            </p>
          </div>
        </section>

        {/* Deliverables */}
        <section>
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Deliverables
          </h2>
          <ol className="mt-3 space-y-2">
            {project.tasks.map((task, i) => (
              <li
                key={i}
                className="flex items-start gap-3 border-b border-border/60 pb-2 last:border-0"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground">{task}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Sign-off */}
        <section className="border-t border-border pt-6">
          <p className="text-sm leading-relaxed text-foreground/90">
            If this looks right, reply to confirm and I'll send a kickoff
            invoice and a calendar invite for the first call.
          </p>
          <p className="mt-4 text-sm font-medium text-foreground">— Your Name</p>
        </section>
      </div>
    </div>
  );
};

export default ProposalPreview;