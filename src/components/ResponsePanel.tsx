import { Copy, Check, Share2, Lightbulb, AlertTriangle, Wrench, Code2 } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

export interface AnalysisResult {
  explanation: string;
  whyItHappens: string;
  howToFix: string;
  correctedCode: string;
}

interface ResponsePanelProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  language: string;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
      {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

const langMap: Record<string, string> = {
  JavaScript: "javascript", TypeScript: "typescript", Python: "python", Java: "java",
  "C++": "cpp", "C#": "csharp", Go: "go", Rust: "rust", Ruby: "ruby", PHP: "php",
  Swift: "swift", Kotlin: "kotlin",
};

const Section = ({ icon: Icon, title, children, color }: { icon: any; title: string; children: React.ReactNode; color: string }) => (
  <div className="animate-slide-up">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
    <div className="text-sm text-secondary-foreground leading-relaxed">{children}</div>
  </div>
);

const ResponsePanel = ({ result, isLoading, language }: ResponsePanelProps) => {
  const handleShare = async () => {
    if (!result) return;
    const text = `ExplainMyError Analysis:\n\n📖 ${result.explanation}\n\n⚠️ Why: ${result.whyItHappens}\n\n🔧 Fix: ${result.howToFix}\n\n💻 Code:\n${result.correctedCode}`;
    try {
      await navigator.share({ title: "ExplainMyError Analysis", text });
    } catch {
      await navigator.clipboard.writeText(text);
      toast.success("Analysis copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="glass rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <div className="absolute inset-0 w-12 h-12 rounded-full animate-pulse-glow bg-primary/10" />
        </div>
        <p className="text-sm text-muted-foreground font-mono">Analyzing your error...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] gap-3 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <Code2 className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Paste an error message and click <span className="text-primary font-semibold">Analyze Error</span> to get started.</p>
      </div>
    );
  }

  const syntaxLang = langMap[language] || "javascript";

  return (
    <div className="glass rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">Analysis</h2>
        <button onClick={handleShare} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
      </div>

      <Section icon={Lightbulb} title="Explanation" color="text-primary">
        <p>{result.explanation}</p>
      </Section>

      <Section icon={AlertTriangle} title="Why This Happens" color="text-warning">
        <p>{result.whyItHappens}</p>
      </Section>

      <Section icon={Wrench} title="How to Fix It" color="text-info">
        <p>{result.howToFix}</p>
      </Section>

      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Corrected Code</h3>
          </div>
          <CopyButton text={result.correctedCode} />
        </div>
        <div className="rounded-lg overflow-hidden border border-border">
          <SyntaxHighlighter
            language={syntaxLang}
            style={oneDark}
            customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.8rem", background: "hsl(230 25% 7%)" }}
          >
            {result.correctedCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default ResponsePanel;
