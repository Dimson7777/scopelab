import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-subtle px-6">
      <h1 className="font-display text-6xl font-bold text-foreground">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        This page doesn't exist.
      </p>
      <Button className="mt-6" asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
