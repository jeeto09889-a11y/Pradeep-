import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit3, ExternalLink, Filter } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Design' | 'Web' | 'App' | 'Client';
  description: string;
  image: string;
}

const INITIAL_PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Modern Bank Dashboard', 
    category: 'Web', 
    description: 'A fintech dashboard with real-time tracking.',
    image: 'https://picsum.photos/seed/bank/800/600'
  },
  { 
    id: '2', 
    title: 'Wellness App Concept', 
    category: 'App', 
    description: 'Minimalist health and meditation tracking mobile app.',
    image: 'https://picsum.photos/seed/health/800/600'
  },
  { 
    id: '3', 
    title: 'Brand Identity: Luxe', 
    category: 'Design', 
    description: 'High-end branding for a boutique hotel chain.',
    image: 'https://picsum.photos/seed/brand/800/600'
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [filter, setFilter] = useState<string>('All');
  const [isAddingProject, setIsAddingProject] = useState(false);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="p-8 md:p-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl font-bold tracking-tighter mb-2">Projects Gallery</h2>
          <p className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Curated Works & Case Studies</p>
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Design', 'Web', 'App', 'Client'].map((cat) => (
            <button
              id={`filter-${cat}`}
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                filter === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
          <button 
            id="btn-add-project"
            onClick={() => setIsAddingProject(true)}
            className="flex items-center gap-2 px-8 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-purple-600/30 hover:scale-105 transition-transform whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProjects.map((project, idx) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={project.id}
            className="group bg-white/5 backdrop-blur-xl rounded-[32px] overflow-hidden border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
          >
            <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-600/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="p-3 bg-white rounded-xl text-blue-600 hover:scale-110 transition-transform shadow-xl">
                  <ExternalLink className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => removeProject(project.id)}
                  className="p-3 bg-red-500 rounded-xl text-white hover:scale-110 transition-transform shadow-xl"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg">
                {project.category}
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm font-medium">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
