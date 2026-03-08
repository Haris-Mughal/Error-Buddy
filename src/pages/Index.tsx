import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import InputPanel from "@/components/InputPanel";
import ResponsePanel, { AnalysisResult } from "@/components/ResponsePanel";

const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("");

  const handleAnalyze = async (data: { language: string; error: string; code: string; beginnerMode: boolean }) => {
    setIsLoading(true);
    setResult(null);
    setLanguage(data.language);

    try {
      const { data: fnData, error } = await supabase.functions.invoke("analyze-error", {
        body: data,
      });

      if (error) throw error;
      if (fnData?.error) throw new Error(fnData.error);

      setResult(fnData as AnalysisResult);
    } catch (e: any) {
      console.error("Analysis failed:", e);
      toast.error(e.message || "Failed to analyze error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <InputPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
          <ResponsePanel result={result} isLoading={isLoading} language={language} />
        </div>
      </main>
    </div>
  );
};

export default Index;
