import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Search, Sparkles, ArrowRight } from "lucide-react";
import { Publication } from "@/types/Publication";

interface AIAssistantProps {
  publications: Publication[];
}

interface QAResponse {
  question: string;
  answer: string;
  relatedPublications: string[];
  confidence: number;
}

const suggestedQuestions = [
  "What has NASA learned about muscle atrophy in microgravity?",
  "How does radiation affect astronaut health during Mars missions?",
  "What are the best countermeasures for bone loss in space?",
  "How can plants be grown on the lunar surface?",
  "What psychological challenges do astronauts face on Mars missions?",
  "How does the immune system change during long space flights?",
];

// Simulated AI responses based on the publication data
const generateAIResponse = (question: string, publications: Publication[]): QAResponse => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("muscle") || lowerQuestion.includes("atrophy")) {
    return {
      question,
      answer: "NASA research shows that astronauts lose significant muscle mass in microgravity, with studies demonstrating up to 20% loss in weight-bearing muscles during 6-month missions. Advanced countermeasures include personalized AI-driven exercise protocols that reduce muscle mass loss by 60% compared to standard regimens. Electrical muscle stimulation (EMS) combined with resistance exercise shows superior results for Mars transit where exercise equipment may be limited.",
      relatedPublications: ["4", "9"],
      confidence: 0.92
    };
  }
  
  if (lowerQuestion.includes("radiation") || lowerQuestion.includes("cosmic")) {
    return {
      question,
      answer: "Galactic cosmic radiation poses a major threat to Mars crews outside Earth's magnetic field. NASA has developed advanced shielding materials including hydrogenated carbon nanotubes and polyethylene composites that provide 50% better protection than aluminum while reducing mass by 40%. These materials are critical for protecting crews during the 6-9 month Mars transit and multi-year surface operations.",
      relatedPublications: ["5"],
      confidence: 0.89
    };
  }
  
  if (lowerQuestion.includes("bone") || lowerQuestion.includes("density")) {
    return {
      question,
      answer: "Bone loss is a critical concern for Mars missions. Astronauts lose 1-2% bone mass per month in microgravity. Recent NASA research shows that combined bisphosphonate therapy with zoledronic acid and resistance exercise reduces bone loss to just 0.3% per month - an 80% improvement. This pharmaceutical approach is essential for multi-year Mars missions where bone fractures could be mission-critical emergencies.",
      relatedPublications: ["6"],
      confidence: 0.94
    };
  }
  
  if (lowerQuestion.includes("plant") || lowerQuestion.includes("grow") || lowerQuestion.includes("lunar") || lowerQuestion.includes("food")) {
    return {
      question,
      answer: "NASA's Veggie system demonstrates that AI-enhanced plant production can achieve 95% automation with 35% yield improvement in simulated lunar conditions. The system uses machine learning to optimize LED spectra and nutrient timing based on real-time plant health sensors. This technology is fundamental for establishing self-sustaining lunar bases and Mars colonies with reliable fresh food production.",
      relatedPublications: ["3"],
      confidence: 0.91
    };
  }
  
  if (lowerQuestion.includes("psychology") || lowerQuestion.includes("mental") || lowerQuestion.includes("isolation")) {
    return {
      question,
      answer: "Psychological resilience is crucial for Mars mission success. NASA research shows that AI-powered mental health monitoring combined with VR therapy and peer support reduces psychological distress by 55% in isolated crews. The studies validate comprehensive psychological support protocols including autonomous mental health interventions for situations where Earth communication delays make real-time support impossible.",
      relatedPublications: ["10"],
      confidence: 0.87
    };
  }
  
  if (lowerQuestion.includes("immune") || lowerQuestion.includes("infection")) {
    return {
      question,
      answer: "Space environments cause significant immune system dysfunction. Mars analog studies show combined stressors cause 40% reduction in T-cell proliferation and 60% reduction in vaccine efficacy. NASA has identified specific immune pathways affected by space conditions and developed targeted pharmaceutical countermeasures to maintain crew health during missions where infectious diseases could be catastrophic.",
      relatedPublications: ["2", "7"],
      confidence: 0.88
    };
  }
  
  // Default response
  return {
    question,
    answer: "Based on NASA's extensive bioscience research, space environments present multiple physiological challenges for human crews. The publications in this database cover critical areas including bone and muscle loss, immune dysfunction, radiation protection, psychological health, and life support systems. These research findings are essential for planning safe and successful Moon and Mars missions.",
    relatedPublications: ["1", "2", "3"],
    confidence: 0.75
  };
};

export const AIAssistant = ({ publications }: AIAssistantProps) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<QAResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const aiResponse = generateAIResponse(question, publications);
    setResponse(aiResponse);
    setIsLoading(false);
  };

  const handleSuggestedQuestion = (suggestedQ: string) => {
    setQuestion(suggestedQ);
    handleAsk();
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <Bot className="h-5 w-5 text-cosmic-purple" />
          AI Research Assistant
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ask questions about NASA bioscience research and space exploration
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Question Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask about space biology research..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
            className="flex-1"
          />
          <Button
            onClick={handleAsk}
            disabled={isLoading || !question.trim()}
            variant="cosmic"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Suggested Questions */}
        {!response && (
          <div>
            <h4 className="text-sm font-medium mb-3 text-primary">Suggested Questions</h4>
            <div className="grid gap-2">
              {suggestedQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(q)}
                  className="justify-start text-left h-auto py-2 px-3"
                  disabled={isLoading}
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-cosmic-purple" />
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* AI Response */}
        {response && (
          <div className="space-y-4">
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-primary flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cosmic-purple" />
                AI Analysis
              </h4>
              
              <div className="bg-cosmic-purple/10 rounded-lg p-4 border border-cosmic-purple/20">
                <p className="text-sm font-medium text-foreground mb-2">
                  Q: {response.question}
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {response.answer}
                </p>
                
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="bg-cosmic-purple/20 text-cosmic-purple border-cosmic-purple/30">
                    Confidence: {Math.round(response.confidence * 100)}%
                  </Badge>
                  <Badge variant="outline">
                    {response.relatedPublications.length} related papers
                  </Badge>
                </div>
              </div>
            </div>

            {/* Related Publications */}
            {response.relatedPublications.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-primary">Related Publications</h4>
                <div className="space-y-2">
                  {response.relatedPublications.map(pubId => {
                    const pub = publications.find(p => p.id === pubId);
                    if (!pub) return null;
                    
                    return (
                      <div key={pubId} className="bg-muted/30 rounded p-3 border border-border">
                        <p className="text-sm font-medium text-foreground">
                          {pub.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {pub.authors.join(", ")} • {pub.publication_date}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setResponse(null);
                setQuestion("");
              }}
            >
              Ask Another Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};