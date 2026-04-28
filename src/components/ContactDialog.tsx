import { useState, type ReactNode } from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CONTACT_EMAIL = "dimibukejlovic@icloud.com";

interface ContactDialogProps {
  trigger: ReactNode;
}

const initialForm = { name: "", email: "", message: "" };

const ContactDialog = ({ trigger }: ContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetAndClose = () => {
    setForm(initialForm);
    setError(null);
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Quick client-side validation — server validates again.
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("That email doesn't look right.");
      return;
    }

    setSending(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "send-contact-message",
        {
          body: {
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
          },
        },
      );

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      toast.success("Message sent successfully", {
        description: "I'll get back to you within a day or two.",
      });
      resetAndClose();
    } catch (err) {
      console.error(err);
      setError(
        "Couldn't send your message. Please try again, or email me directly.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (sending ? null : setOpen(v))}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md border-border bg-card/95 backdrop-blur-xl">
        {/* Soft glow accent */}
        <div className="pointer-events-none absolute -top-20 -right-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

        <DialogHeader className="relative">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary shadow-glow">
            <Mail className="h-4.5 w-4.5" />
          </div>
          <DialogTitle className="font-display text-xl">Get in touch</DialogTitle>
          <DialogDescription>
            Questions, feedback, or just saying hi — drop a line.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
              maxLength={100}
              disabled={sending}
              autoComplete="name"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              maxLength={255}
              disabled={sending}
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What's on your mind?"
              rows={4}
              maxLength={2000}
              disabled={sending}
            />
            <p className="text-right text-[11px] text-muted-foreground/70">
              {form.message.length}/2000
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="hero"
            className="w-full"
            disabled={sending}
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Or email directly:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;