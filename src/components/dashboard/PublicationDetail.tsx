import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Users, ExternalLink, ArrowLeft, Network } from "lucide-react";
import { Publication } from "@/types/Publication";

interface PublicationDetailProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  human_health: "bg-nasa-red/20 text-nasa-red border-nasa-red/30",
  microbiology: "bg-cosmic-purple/20 text-cosmic-purple border-cosmic-purple/30",
  plants: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  radiation: "bg-stellar-orange/20 text-stellar-orange border-stellar-orange/30",
  immune_system: "bg-space-teal/20 text-space-teal border-space-teal/30",
  bone_density: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  muscle_atrophy: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  psychology: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  nutrition: "bg-lime-500/20 text-lime-400 border-lime-500/30",
  sleep: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  cardiovascular: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

export const PublicationDetail = ({ publication, isOpen, onClose }: PublicationDetailProps) => {
  if (!publication) return null;

  const categoryColor = categoryColors[publication.category] || "bg-muted text-muted-foreground";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-border">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl leading-tight pr-4">
                {publication.title}
              </DialogTitle>
              <DialogDescription className="mt-3 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(publication.publication_date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {publication.authors.join(", ")}
                </span>
              </DialogDescription>
            </div>
            <Badge className={categoryColor}>
              {publication.category.replace('_', ' ')}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Summary */}
          <section>
            <h3 className="text-lg font-semibold mb-3 text-primary">Research Summary</h3>
            <p className="text-foreground/90 leading-relaxed">
              {publication.summary}
            </p>
          </section>

          <Separator />

          {/* Key Findings */}
          <section>
            <h3 className="text-lg font-semibold mb-3 text-primary">Key Findings</h3>
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <p className="text-foreground/90 leading-relaxed">
                {publication.findings}
              </p>
            </div>
          </section>

          <Separator />

          {/* Mars/Moon Relevance */}
          <section>
            <h3 className="text-lg font-semibold mb-3 text-cosmic-purple">
              Relevance to Moon & Mars Exploration
            </h3>
            <div className="bg-cosmic-purple/10 rounded-lg p-4 border border-cosmic-purple/20">
              <p className="text-foreground/90 leading-relaxed">
                {publication.relevance_to_Moon_Mars}
              </p>
            </div>
          </section>

          <Separator />

          {/* Keywords & Related Topics */}
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {publication.keywords.map((keyword) => (
                  <Badge key={keyword} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {publication.related_topics.map((topic) => (
                  <Badge key={topic} className="bg-space-teal/20 text-space-teal border-space-teal/30">
                    <Network className="h-3 w-3 mr-1" />
                    {topic}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="cosmic" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            {publication.doi && (
              <Button variant="outline" asChild>
                <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  View Original Paper
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};