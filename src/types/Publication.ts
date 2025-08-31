export interface Publication {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  findings: string;
  related_topics: string[];
  relevance_to_Moon_Mars: string;
  category: PublicationCategory;
  authors: string[];
  publication_date: string;
  doi?: string;
  abstract?: string;
}

export type PublicationCategory = 
  | 'human_health'
  | 'microbiology' 
  | 'plants'
  | 'radiation'
  | 'immune_system'
  | 'bone_density'
  | 'muscle_atrophy'
  | 'psychology'
  | 'nutrition'
  | 'sleep'
  | 'cardiovascular';

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'entity' | 'concept' | 'finding';
  category?: PublicationCategory;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relationship: string;
  strength: number;
}

export interface SearchFilters {
  categories: PublicationCategory[];
  keywords: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}