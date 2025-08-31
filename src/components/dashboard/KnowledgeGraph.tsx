import { useEffect, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  Controls,
  MiniMap,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Publication } from "@/types/Publication";

interface KnowledgeGraphProps {
  publications: Publication[];
}

const categoryColors: Record<string, string> = {
  human_health: "#ef4444",
  microbiology: "#8b5cf6", 
  plants: "#10b981",
  radiation: "#f97316",
  immune_system: "#06b6d4",
  bone_density: "#f59e0b",
  muscle_atrophy: "#f43f5e",
  psychology: "#8b5cf6",
  nutrition: "#84cc16",
  sleep: "#6366f1",
  cardiovascular: "#ec4899"
};

const createFlowchartLayout = (publications: Publication[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // Group publications by category
  const categories = [...new Set(publications.map(pub => pub.category))];
  
  // Create category header nodes
  categories.forEach((category, categoryIndex) => {
    const categoryNode: Node = {
      id: `category-${category}`,
      type: 'default',
      position: { x: categoryIndex * 350 + 100, y: 50 },
      data: { 
        label: category.replace(/_/g, ' ').toUpperCase(),
      },
      style: {
        background: categoryColors[category] || '#6366f1',
        color: 'white',
        border: '3px solid white',
        borderRadius: '12px',
        padding: '12px',
        fontSize: '14px',
        fontWeight: 'bold',
        width: '200px',
        height: '60px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };
    nodes.push(categoryNode);
  });

  // Create publication nodes grouped by category
  categories.forEach((category, categoryIndex) => {
    const categoryPubs = publications.filter(pub => pub.category === category);
    
    categoryPubs.forEach((pub, pubIndex) => {
      const publicationNode: Node = {
        id: `pub-${pub.id}`,
        type: 'default',
        position: { 
          x: categoryIndex * 350 + 50, 
          y: 150 + (pubIndex * 120)
        },
        data: { 
          label: pub.title.substring(0, 45) + "...",
          publication: pub
        },
        style: {
          background: categoryColors[pub.category],
          color: 'white',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '11px',
          width: '180px',
          height: '90px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      
      nodes.push(publicationNode);
      
      // Connect publication to its category
      edges.push({
        id: `edge-category-${category}-${pub.id}`,
        source: `category-${category}`,
        target: `pub-${pub.id}`,
        type: 'smoothstep',
        style: { 
          stroke: categoryColors[category] || '#6366f1',
          strokeWidth: 2,
          opacity: 0.6
        },
        animated: false,
      });
    });
  });

  // Create outcome/impact nodes at the bottom
  const outcomes = [
    { id: 'moon-prep', label: 'Moon Mission\nPreparation', x: 150 },
    { id: 'mars-prep', label: 'Mars Mission\nPreparation', x: 500 },
    { id: 'health-monitoring', label: 'Crew Health\nMonitoring', x: 850 }
  ];

  outcomes.forEach((outcome) => {
    const outcomeNode: Node = {
      id: outcome.id,
      type: 'default',
      position: { x: outcome.x, y: 450 },
      data: { label: outcome.label },
      style: {
        background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
        color: 'white',
        border: '2px solid #60a5fa',
        borderRadius: '16px',
        padding: '16px',
        fontSize: '12px',
        fontWeight: 'bold',
        width: '140px',
        height: '80px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
      },
      sourcePosition: Position.Top,
      targetPosition: Position.Bottom,
    };
    nodes.push(outcomeNode);
  });

  // Connect relevant publications to outcomes
  publications.forEach((pub) => {
    if (pub.category === 'human_health' || pub.category === 'bone_density' || pub.category === 'muscle_atrophy') {
      edges.push({
        id: `edge-${pub.id}-moon-prep`,
        source: `pub-${pub.id}`,
        target: 'moon-prep',
        type: 'smoothstep',
        style: { 
          stroke: '#3b82f6',
          strokeWidth: 1.5,
          opacity: 0.5
        },
        animated: false,
      });
    }
    
    if (pub.category === 'radiation' || pub.category === 'psychology' || pub.category === 'cardiovascular') {
      edges.push({
        id: `edge-${pub.id}-mars-prep`,
        source: `pub-${pub.id}`,
        target: 'mars-prep',
        type: 'smoothstep',
        style: { 
          stroke: '#3b82f6',
          strokeWidth: 1.5,
          opacity: 0.5
        },
        animated: false,
      });
    }
    
    if (pub.category === 'immune_system' || pub.category === 'sleep' || pub.category === 'nutrition') {
      edges.push({
        id: `edge-${pub.id}-health-monitoring`,
        source: `pub-${pub.id}`,
        target: 'health-monitoring',
        type: 'smoothstep',
        style: { 
          stroke: '#3b82f6',
          strokeWidth: 1.5,
          opacity: 0.5
        },
        animated: false,
      });
    }
  });

  return { nodes, edges };
};

export const KnowledgeGraph = ({ publications }: KnowledgeGraphProps) => {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => createFlowchartLayout(publications),
    [publications]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = createFlowchartLayout(publications);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [publications, setNodes, setEdges]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-primary">Research Flowchart</CardTitle>
            <p className="text-sm text-muted-foreground">
              Hierarchical view of NASA bioscience research pathways and outcomes
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-nasa-blue/20 text-nasa-blue border-nasa-blue/30">
              Research Areas
            </Badge>
            <Badge className="bg-cosmic-purple/20 text-cosmic-purple border-cosmic-purple/30">
              Mission Outcomes
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-left"
            style={{ 
              background: 'linear-gradient(135deg, hsl(220 27% 8%), hsl(270 70% 15%))',
            }}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
          >
            <Background 
              color="#374151" 
              gap={20} 
              size={1}
              style={{ opacity: 0.3 }}
            />
            <Controls 
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
              }}
            />
            <MiniMap 
              style={{
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
              }}
              nodeColor={(node) => {
                if (node.id.startsWith('pub-')) {
                  return node.style?.background as string || '#6366f1';
                }
                return '#6366f1';
              }}
            />
          </ReactFlow>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-nasa-blue"></div>
            <span className="text-muted-foreground">Research Categories</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-cosmic-purple"></div>
            <span className="text-muted-foreground">Publications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-muted-foreground">Mission Outcomes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-400 opacity-60"></div>
            <span className="text-muted-foreground">Research Flow</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};