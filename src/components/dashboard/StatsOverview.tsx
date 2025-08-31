import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Publication, PublicationCategory } from "@/types/Publication";
import { TrendingUp, Users, Calendar, BookOpen, Target, Rocket } from "lucide-react";

interface StatsOverviewProps {
  publications: Publication[];
  filteredCount: number;
}

export const StatsOverview = ({ publications, filteredCount }: StatsOverviewProps) => {
  // Calculate statistics
  const totalPublications = publications.length;
  const totalAuthors = new Set(publications.flatMap(p => p.authors)).size;
  const averageAuthorsPerPaper = Math.round(
    publications.reduce((sum, p) => sum + p.authors.length, 0) / publications.length * 10
  ) / 10;
  
  const currentYear = new Date().getFullYear();
  const recentPublications = publications.filter(
    p => new Date(p.publication_date).getFullYear() === currentYear
  ).length;

  const categoryStats = publications.reduce((acc, pub) => {
    acc[pub.category] = (acc[pub.category] || 0) + 1;
    return acc;
  }, {} as Record<PublicationCategory, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const categoryLabels: Record<PublicationCategory, string> = {
    human_health: "Human Health",
    microbiology: "Microbiology",
    plants: "Plant Biology", 
    radiation: "Radiation Studies",
    immune_system: "Immune System",
    bone_density: "Bone Density",
    muscle_atrophy: "Muscle Atrophy",
    psychology: "Psychology",
    nutrition: "Nutrition",
    sleep: "Sleep Research",
    cardiovascular: "Cardiovascular"
  };

  const impactKeywords = publications.flatMap(p => p.keywords);
  const topKeywords = impactKeywords
    .reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  const mostFrequentKeywords = Object.entries(topKeywords)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Publications */}
      <Card className="bg-gradient-nebula text-white border-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Total Publications</p>
              <p className="text-2xl font-bold">{totalPublications}</p>
              <p className="text-white/70 text-xs">
                {filteredCount !== totalPublications && `${filteredCount} filtered`}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-white/80" />
          </div>
        </CardContent>
      </Card>

      {/* Research Areas */}
      <Card className="bg-gradient-stellar text-white border-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Research Areas</p>
              <p className="text-2xl font-bold">{Object.keys(categoryStats).length}</p>
              <p className="text-white/70 text-xs">Active disciplines</p>
            </div>
            <Target className="h-8 w-8 text-white/80" />
          </div>
        </CardContent>
      </Card>

      {/* Active Researchers */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Researchers</p>
              <p className="text-2xl font-bold text-foreground">{totalAuthors}</p>
              <p className="text-muted-foreground text-xs">
                Avg {averageAuthorsPerPaper} per paper
              </p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Research */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">2024 Publications</p>
              <p className="text-2xl font-bold text-foreground">{recentPublications}</p>
              <p className="text-muted-foreground text-xs">Current year</p>
            </div>
            <TrendingUp className="h-8 w-8 text-cosmic-purple" />
          </div>
        </CardContent>
      </Card>

      {/* Top Research Categories */}
      <Card className="bg-card/50 backdrop-blur-sm border-border md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            Top Research Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topCategories.map(([category, count]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                {categoryLabels[category as PublicationCategory]}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(count / totalPublications) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-primary w-8 text-right">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Key Research Areas */}
      <Card className="bg-card/50 backdrop-blur-sm border-border md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Most Studied Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mostFrequentKeywords.map(([keyword, count]) => (
              <Badge 
                key={keyword} 
                variant="outline" 
                className="text-xs"
              >
                {keyword} ({count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};