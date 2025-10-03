import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, CheckCircle2, User, LogIn } from "lucide-react";
import { toast } from "sonner";

const PIPELINE_STEPS = [
  { id: 1, name: "Role + Goal + Guardrails" },
  { id: 2, name: "Dial Model Eagerness" },
  { id: 3, name: "Tool Preambles" },
  { id: 4, name: "Responses API" },
  { id: 5, name: "Verbosity ≠ Reasoning" },
  { id: 6, name: "Minimal Reasoning Mode" },
  { id: 7, name: "Kill Contradictions" },
  { id: 8, name: "Prime with Examples" },
  { id: 9, name: "Chain of Verification" },
  { id: 10, name: 'Honest "I Don\'t Know"' },
  { id: 11, name: "Markdown On-Demand" },
  { id: 12, name: "Metaprompting" },
];

export default function PromptOptimizer() {
  const [userPrompt, setUserPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [changeLog, setChangeLog] = useState("");
  const [selfCritique, setSelfCritique] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const handleOptimize = async () => {
    if (!userPrompt.trim()) {
      toast.error("Please enter a prompt to optimize");
      return;
    }

    setIsProcessing(true);
    setHasResult(false);
    setCurrentStep(0);

    // Simulate pipeline processing
    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCurrentStep(i + 1);
    }

    // Mock results (replace with actual AI processing later)
    setOptimizedPrompt(`Role: You are an expert assistant.
Goal: ${userPrompt}
Guardrails:
- Be clear and concise
- Use proper formatting
- Verify accuracy before responding

Preamble: Before starting, outline your approach.
Verbosity: Medium
Reasoning Effort: 2

Examples:
✅ Good: Clear, structured response
❌ Bad: Vague, unstructured response

Verification: Self-check against requirements.
Honest "IDK": If uncertain, state clearly.

Output: Provide well-formatted response with critique.`);

    setChangeLog(`• Added Role definition
• Added Goal specification
• Added Guardrails
• Set reasoning_effort to 2
• Added tool preamble
• Configured verbosity to medium
• Added example boundaries
• Enabled chain of verification
• Added fallback for uncertainty
• Configured Markdown output
• Applied metaprompting`);

    setSelfCritique(`**Strengths:**
- Clear role and goal definition
- Proper guardrails in place
- Good example boundaries
- Verification enabled

**Areas for Improvement:**
- Could add more specific examples
- Consider task complexity for reasoning effort
- May need domain-specific constraints`);

    setIsProcessing(false);
    setHasResult(true);
    toast.success("Prompt optimized successfully!");
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)]">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center glow">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Prompt Optimizer</h1>
                <p className="text-xs text-muted-foreground">12-Step AI Enhancement Pipeline</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="gradient" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] pointer-events-none" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Powered by Advanced AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Transform Your Prompts
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Apply 12 proven optimization rules to create better AI prompts. Get detailed analysis,
            change logs, and self-critique in seconds.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6 glow border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold">Your Prompt</h3>
            </div>
            <Textarea
              placeholder="Enter your prompt here... 

Example: Write a blog post about AI"
              className="min-h-[300px] mb-4 font-mono text-sm resize-none"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <Button
              onClick={handleOptimize}
              disabled={isProcessing}
              variant="gradient"
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <span className="animate-pulse">Processing Step {currentStep}/12</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Optimize Prompt
                </>
              )}
            </Button>
          </Card>

          {/* Pipeline Progress */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold">Pipeline Status</h3>
            </div>
            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-2">
              {PIPELINE_STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    currentStep >= step.id
                      ? "border-primary/50 bg-primary/5"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep >= step.id ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                  </div>
                  <span
                    className={`text-sm ${
                      currentStep >= step.id ? "font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Results Section */}
        {hasResult && (
          <Card className="mt-6 p-6 animate-fade-in glow">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold">Optimized Results</h3>
            </div>
            <Tabs defaultValue="optimized" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="optimized">Optimized Prompt</TabsTrigger>
                <TabsTrigger value="log">Change Log</TabsTrigger>
                <TabsTrigger value="critique">Self-Critique</TabsTrigger>
              </TabsList>
              <TabsContent value="optimized" className="mt-4">
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{optimizedPrompt}</pre>
                </div>
              </TabsContent>
              <TabsContent value="log" className="mt-4">
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{changeLog}</pre>
                </div>
              </TabsContent>
              <TabsContent value="critique" className="mt-4">
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <div className="prose prose-sm max-w-none">
                    {selfCritique.split("\n").map((line, i) => (
                      <p key={i} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
}
