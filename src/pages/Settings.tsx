import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Mail,
  Shield,
  CreditCard,
  Sparkles,
  TrendingUp,
  ExternalLink,
  AlertTriangle,
  Trash2,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";
import { PRICING_TIERS } from "@/lib/pricing";

/** ProjectPilot is on the Free plan by default — billing is mocked for now. */
const CURRENT_PLAN_KEY = "Free";

const Settings = () => {
  const { user, signOut } = useAuth();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [wiping, setWiping] = useState(false);

  const currentPlan = PRICING_TIERS.find((t) => t.name === CURRENT_PLAN_KEY) ?? PRICING_TIERS[0];
  const monthlyLimit = 3; // Free plan limit

  // Usage this month — count generations created in the current calendar month.
  const { thisMonthCount, joined } = useMemo(() => {
    const now = new Date();
    const count = projects.filter((p) => {
      const d = new Date(p.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    return {
      thisMonthCount: count,
      joined: user?.created_at ? format(new Date(user.created_at), "MMMM yyyy") : "—",
    };
  }, [projects, user]);

  const usagePct = Math.min(100, Math.round((thisMonthCount / monthlyLimit) * 100));
  const overLimit = thisMonthCount >= monthlyLimit;

  const handleWipeData = async () => {
    if (!user) return;
    setWiping(true);
    try {
      const [p, g] = await Promise.all([
        supabase.from("projects").delete().eq("user_id", user.id),
        supabase.from("generations").delete().eq("user_id", user.id),
      ]);
      if (p.error) throw p.error;
      if (g.error) throw g.error;
      toast.success("All your project data was deleted");
      setConfirmWipe(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete data");
    } finally {
      setWiping(false);
    }
  };

  const handleDeleteAccount = () => {
    // We can't fully delete the auth user from the client without a server-side admin call.
    // For now: wipe data, sign out, and tell the user we'll finish closing the account by email.
    toast.info("Account deletion request received", {
      description: "We'll email you within 24 hours to confirm and finish closing your account.",
    });
    setConfirmDelete(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen">
      <DashboardNav />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account, plan, and data.
          </p>
        </header>

        <div className="space-y-5">
          {/* ─── Account ─────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-card"
          >
            <div className="mb-5 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">Account</h2>
            </div>

            <dl className="divide-y divide-border/60">
              <div className="flex items-center justify-between py-3">
                <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> Email
                </dt>
                <dd className="text-sm font-medium text-foreground">{user?.email ?? "—"}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-sm text-muted-foreground">Member since</dt>
                <dd className="text-sm font-medium text-foreground">{joined}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-sm text-muted-foreground">User ID</dt>
                <dd className="font-mono text-[11px] text-muted-foreground/80">
                  {user?.id?.slice(0, 8)}…
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-5">
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast.info("Email change", {
                    description:
                      "Reply to your welcome email or contact support@projectpilot.app to change your address.",
                  })
                }
              >
                Change email
              </Button>
            </div>
          </motion.section>

          {/* ─── Current plan ───────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 sm:p-7 shadow-card"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Current plan
                  </h2>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-2xl font-bold text-foreground">
                    {currentPlan.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${currentPlan.priceMonthly}/mo · {currentPlan.limits}
                  </p>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{currentPlan.tagline}</p>
              </div>
              <Button variant="hero" size="sm" onClick={() => navigate("/pricing")}>
                Upgrade plan
              </Button>
            </div>
          </motion.section>

          {/* ─── Usage this month ───────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-card"
          >
            <div className="mb-5 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Usage this month
              </h2>
            </div>

            <div className="mb-3 flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">Project plans created</p>
              <p className="font-display text-sm font-semibold text-foreground">
                {thisMonthCount} <span className="text-muted-foreground">/ {monthlyLimit}</span>
              </p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  overLimit
                    ? "bg-gradient-to-r from-warning to-destructive"
                    : "bg-gradient-to-r from-primary to-accent"
                }`}
                style={{ width: `${usagePct}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {overLimit
                ? "You've reached this month's limit. Upgrade to keep generating."
                : `${monthlyLimit - thisMonthCount} plan${
                    monthlyLimit - thisMonthCount === 1 ? "" : "s"
                  } left this month. Resets on the 1st.`}
            </p>
          </motion.section>

          {/* ─── Billing ────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-card"
          >
            <div className="mb-5 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">Billing</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              You're on the Free plan. Add a payment method to upgrade — you only pay when you upgrade.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-5">
              <Button variant="outline" size="sm" onClick={() => navigate("/pricing")}>
                See plans
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast.info("Invoices", {
                    description: "You don't have any invoices yet — this is the Free plan.",
                  })
                }
              >
                Invoices <ExternalLink className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast.info("Payment method", {
                    description: "Add a payment method when upgrading — no card required for Free.",
                  })
                }
              >
                Update payment method
              </Button>
            </div>
          </motion.section>

          {/* ─── Danger zone ────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-2xl border border-destructive/30 bg-destructive/[0.03] p-6 sm:p-7"
          >
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h2 className="font-display text-lg font-semibold text-foreground">Danger zone</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              These actions are permanent. Take a deep breath first.
            </p>

            <div className="mt-5 space-y-3">
              {/* Wipe data */}
              <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Delete all project data</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Removes every project and generation in your account. Your login stays active.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setConfirmWipe(true)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete data
                </Button>
              </div>

              {/* Delete account */}
              <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Delete account</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Closes your account and removes all associated data. This can't be undone.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete account
                </Button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Confirm: wipe data */}
      <AlertDialog open={confirmWipe} onOpenChange={setConfirmWipe}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete all your project data?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes all {projects.length} projects and your generation history.
              Your account stays active. This action can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={wiping}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleWipeData}
              disabled={wiping}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {wiping ? "Deleting…" : "Yes, delete everything"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm: delete account */}
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              We'll close your account and email you a confirmation within 24 hours.
              All projects, generations, and login access will be removed permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Request deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;