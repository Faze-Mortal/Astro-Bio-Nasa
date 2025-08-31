import { Search, Filter, Grid, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterToggle: () => void;
  onViewToggle: (view: 'grid' | 'graph') => void;
  currentView: 'grid' | 'graph';
}

export const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterToggle, 
  onViewToggle, 
  currentView 
}: HeaderProps) => {
  return (
    <header className="bg-gradient-cosmic border-b border-border shadow-cosmic">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col space-y-6">
          {/* Title Section */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-nebula bg-clip-text text-transparent">
              NASA Bioscience Research Dashboard
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Exploring decades of space bioscience research to advance human exploration of the Moon and Mars
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search publications, keywords, findings..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onFilterToggle}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <div className="flex rounded-md border border-border overflow-hidden">
                <Button
                  variant={currentView === 'grid' ? 'nasa' : 'ghost'}
                  size="sm"
                  onClick={() => onViewToggle('grid')}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentView === 'graph' ? 'nasa' : 'ghost'}
                  size="sm"
                  onClick={() => onViewToggle('graph')}
                  className="rounded-none"
                >
                  <Network className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};