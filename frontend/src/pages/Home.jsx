import React, { useState, useEffect } from 'react';
import { Play, Shield } from 'lucide-react';
import { mockProjects, mockAbout } from '../mock';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setProjects(mockProjects);
    setAbout(mockAbout);
  }, []);

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-fade-in">
            <h1 className="font-mono text-6xl sm:text-8xl lg:text-9xl font-bold uppercase tracking-tight mb-8">
              ROBLOX
              <br />
              <span className="text-gray-400">SCRIPTER</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              {about?.bio}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {about?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-mono text-4xl sm:text-5xl font-bold uppercase tracking-tight mb-6">
              Projeler
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {cat === 'all' ? 'Tümü' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {project.videoId ? (
                  <div className="relative aspect-video bg-black">
                    <img
                      src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all group-hover:scale-110"
                      >
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <Shield className="w-20 h-20 text-white/20" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-mono uppercase tracking-wider rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-mono font-bold mb-3 group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;