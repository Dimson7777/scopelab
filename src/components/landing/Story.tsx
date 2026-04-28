const Story = () => {
  return (
    <section className="relative border-t border-border/50 py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Problem */}
        <div className="mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The problem
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-[1.05]">
            Scoping shouldn't take{" "}
            <span className="text-muted-foreground">a whole afternoon.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A client sends a vague email. You spend two hours guessing the scope,
            another hour pricing it, and a third writing the proposal — and half
            the time the deal goes cold before you hit send.
          </p>
        </div>

        {/* Solution */}
        <div className="mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            What it does
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-[1.05]">
            A first draft of the plan,{" "}
            <span className="text-gradient">ready in a minute.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Paste the brief. You get a scope breakdown, week-by-week timeline,
            a fair price range, and a proposal draft you can edit and send.
            It's a starting point — not a replacement for your judgment.
          </p>
        </div>

        {/* Story */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-card p-10 shadow-elevated">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Why I built this
            </p>
            <p className="text-lg leading-relaxed text-foreground">
              I run a small dev studio. Last year I tracked how long I spent on
              unpaid scoping calls and proposal writing — almost a full day a
              week. I built ProjectPilot for myself first, to get that day back.
              Now a few friends use it too, so I'm opening it up.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">Dimitrije B.</p>
                <p className="text-xs text-muted-foreground">Indie dev · Building in public</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
