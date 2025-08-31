import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ExternalLink, BookOpen } from "lucide-react";
import { Publication } from "@/types/Publication";

interface PublicationCardProps {
  publication: Publication;
  onViewDetails: (publication: Publication) => void;
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

export const PublicationCard = ({ publication, onViewDetails }: PublicationCardProps) => {
  const categoryColor = categoryColors[publication.category] || "bg-muted text-muted-foreground";

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
              {publication.title}
            </CardTitle>
            <CardDescription className="mt-2 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(publication.publication_date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {publication.authors.length} authors
              </span>
            </CardDescription>
          </div>
          <Badge className={categoryColor}>
            {publication.category.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/90 line-clamp-3">
          {publication.summary}
        </p>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Key Findings</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {publication.findings}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-cosmic-purple mb-2">Mars/Moon Relevance</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {publication.relevance_to_Moon_Mars}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {publication.keywords.slice(0, 3).map((keyword) => (
            <Badge key={keyword} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {publication.keywords.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{publication.keywords.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="cosmic"
            size="sm"
            onClick={() => onViewDetails(publication)}
            className="flex-1"
          >
            <BookOpen className="h-4 w-4" />
            View Details
          </Button>
          {publication.doi && (
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};