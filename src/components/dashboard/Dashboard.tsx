import { useState, useMemo } from "react";
import { Header } from "./Header";
import { PublicationCard } from "./PublicationCard";
import { PublicationDetail } from "./PublicationDetail";
import { FilterPanel } from "./FilterPanel";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { AIAssistant } from "./AIAssistant";
import { StatsOverview } from "./StatsOverview";
import { Publication, SearchFilters, PublicationCategory } from "@/types/Publication";
import { mockPublications } from "@/data/mockPublications";

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState<'grid' | 'graph'>('grid');
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    keywords: []
  });

  // Filter and search publications
  const filteredPublications = useMemo(() => {
    let filtered = mockPublications;

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(pub => filters.categories.includes(pub.category));
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pub =>
        pub.title.toLowerCase().includes(query) ||
        pub.summary.toLowerCase().includes(query) ||
        pub.findings.toLowerCase().includes(query) ||
        pub.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
        pub.related_topics.some(topic => topic.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, filters]);

  // Count publications by category
  const publicationCounts = useMemo(() => {
    const counts: Record<PublicationCategory, number> = {
      human_health: 0,
      microbiology: 0,
      plants: 0,
      radiation: 0,
      immune_system: 0,
      bone_density: 0,
      muscle_atrophy: 0,
      psychology: 0,
      nutrition: 0,
      sleep: 0,
      cardiovascular: 0
    };

    mockPublications.forEach(pub => {
      counts[pub.category] = (counts[pub.category] || 0) + 1;
    });

    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterToggle={() => setShowFilters(!showFilters)}
        onViewToggle={setCurrentView}
        currentView={currentView}
      />

      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClose={() => setShowFilters(false)}
                publicationCounts={publicationCounts}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {currentView === 'grid' ? (
              <>
                {/* Stats Overview */}
                <StatsOverview 
                  publications={mockPublications} 
                  filteredCount={filteredPublications.length} 
                />
                
                {/* AI Assistant */}
                <AIAssistant publications={filteredPublications} />
                
                {/* Results Summary */}
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Research Publications
                  </h2>
                  <p className="text-muted-foreground">
                    Showing {filteredPublications.length} of {mockPublications.length} publications
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                {/* Publications Grid */}
                {filteredPublications.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPublications.map((publication) => (
                      <PublicationCard
                        key={publication.id}
                        publication={publication}
                        onViewDetails={setSelectedPublication}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                      No publications found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                )}
              </>
            ) : (
              <KnowledgeGraph publications={filteredPublications} />
            )}
          </div>
        </div>
      </main>

      {/* Publication Detail Modal */}
      <PublicationDetail
        publication={selectedPublication}
        isOpen={!!selectedPublication}
        onClose={() => setSelectedPublication(null)}
      />
    </div>
  );
};