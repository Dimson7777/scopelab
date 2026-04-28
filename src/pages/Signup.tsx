import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(email, password);
    setIsLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Account created! Check your email to verify.");
      navigate("/dashboard", { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-hero-gradient">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-6">
      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
              <Zap className="h-4 w-4 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              ProjectPilot
            </span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Plan smarter. Quote faster. It's free to start.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
              disabled={isLoading}
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full h-11" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
