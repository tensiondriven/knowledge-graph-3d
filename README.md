# 3D Knowledge Graph Visualizer

Multi-user 3D visualization of schema.org and knowledge graphs with physics-based interactions.

## Features
- Real-time physics simulation with CUDA backend
- Multi-shell parallax skybox architecture  
- Billboard nodes with attraction/repulsion forces
- LiveView streaming for massive scale (100K+ nodes)
- Multi-user collaborative exploration

## Tech Stack
- Elixir/Phoenix with LiveView
- CUDA compute for physics 
- Three.js/WebGL frontend
- Neo4j/Postgres knowledge storage

## Quick Start
```bash
docker compose up -d
# Visit http://localhost:4000
```

## Data Taxonomy
- **REFERENCE**: Schema.org, FOAF, Dublin Core vocabularies
- **PRIMARY**: User data, conversations, observations  
- **DERIVED**: AI inferences, second-order analysis

Built with ❤️ for exploring the physics of knowledge.
