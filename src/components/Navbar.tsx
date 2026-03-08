import { Terminal } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="glass border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center glow-primary">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">ExplainMyError</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">Understand errors instantly</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
