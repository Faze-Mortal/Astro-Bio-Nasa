import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X, RotateCcw } from "lucide-react";
import { PublicationCategory, SearchFilters } from "@/types/Publication";

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClose: () => void;
  publicationCounts: Record<PublicationCategory, number>;
}

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

export const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClose, 
  publicationCounts 
}: FilterPanelProps) => {
  
  const handleCategoryToggle = (category: PublicationCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleReset = () => {
    onFiltersChange({
      categories: [],
      keywords: []
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.keywords.length > 0;

  return (
    <Card className="bg-card/95 backdrop-blur-sm border-border shadow-cosmic">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3 text-primary">Research Categories</h3>
          <div className="space-y-2">
            {Object.entries(categoryLabels).map(([category, label]) => {
              const count = publicationCounts[category as PublicationCategory] || 0;
              return (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category as PublicationCategory)}
                    onCheckedChange={() => handleCategoryToggle(category as PublicationCategory)}
                  />
                  <label
                    htmlFor={category}
                    className="text-sm flex-1 cursor-pointer hover:text-primary transition-colors"
                  >
                    {label}
                    <span className="text-muted-foreground ml-1">({count})</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {filters.categories.length > 0 && 
                `${filters.categories.length} category filter${filters.categories.length > 1 ? 's' : ''} active`
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};