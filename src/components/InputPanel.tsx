import { useState } from "react";
import { Zap, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const LANGUAGES = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin",
];

const EXAMPLE_ERRORS = [
  { label: "Cannot read property of undefined", error: "TypeError: Cannot read properties of undefined (reading 'map')", lang: "JavaScript" },
  { label: "Unexpected token", error: "SyntaxError: Unexpected token '<'", lang: "JavaScript" },
  { label: "Null pointer exception", error: "java.lang.NullPointerException: Cannot invoke method on null object reference", lang: "Java" },
  { label: "Module not found", error: "ModuleNotFoundError: No module named 'pandas'", lang: "Python" },
];

interface InputPanelProps {
  onAnalyze: (data: { language: string; error: string; code: string; beginnerMode: boolean }) => void;
  isLoading: boolean;
}

const InputPanel = ({ onAnalyze, isLoading }: InputPanelProps) => {
  const [language, setLanguage] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [beginnerMode, setBeginnerMode] = useState(true);

  const handleSubmit = () => {
    if (!error.trim() || !language) return;
    onAnalyze({ language, error, code, beginnerMode });
  };

  const handleExample = (ex: typeof EXAMPLE_ERRORS[0]) => {
    setError(ex.error);
    setLanguage(ex.lang);
    setCode("");
  };

  return (
    <div className="space-y-5">
      <div className="glass rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">Input</h2>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <Label htmlFor="beginner" className="text-xs text-muted-foreground cursor-pointer">Beginner Mode</Label>
            <Switch id="beginner" checked={beginnerMode} onCheckedChange={setBeginnerMode} />
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Programming Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="bg-muted border-border font-mono text-sm">
              <SelectValue placeholder="Select language..." />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Error Message *</Label>
          <Textarea
            value={error}
            onChange={(e) => setError(e.target.value)}
            placeholder="Paste your error message here..."
            className="bg-muted border-border font-mono text-sm min-h-[100px] resize-none"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Code Snippet (optional)</Label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste the relevant code here..."
            className="bg-muted border-border font-mono text-sm min-h-[120px] resize-none"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !error.trim() || !language}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold glow-primary transition-all"
          size="lg"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
          ) : (
            <><Zap className="w-4 h-4 mr-2" /> Analyze Error</>
          )}
        </Button>
      </div>

      <div className="glass rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Example Errors</h3>
        <div className="grid grid-cols-1 gap-2">
          {EXAMPLE_ERRORS.map((ex) => (
            <button
              key={ex.label}
              onClick={() => handleExample(ex)}
              className="text-left text-xs font-mono px-3 py-2.5 rounded-lg bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 text-muted-foreground hover:text-foreground transition-all"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
