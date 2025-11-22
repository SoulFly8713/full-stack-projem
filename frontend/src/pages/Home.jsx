import React, { useState, useEffect } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { mockProjects, mockAbout } from '../mock';
import { Link } from 'react-router-dom';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Filter out Vendetta Security from projects
    const filteredProjects = mockProjects.filter(p => !p.isService);
    setProjects(filteredProjects);
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
            <h1 className="font-black text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tight mb-8 leading-none">
              ROBLOX
              <br />
              <span className="text-gray-500">SCRIPTER</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              {about?.bio}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {about?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vendetta Security Banner */}
      <section className="py-16 bg-gradient-to-r from-red-950/20 via-red-900/10 to-red-950/20 border-y border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                Güvenlik Çözümü
              </div>
              <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight mb-4">
                Vendetta <span className="text-red-500">Security</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Roblox script şifreleme ve güvenlik çözümü. Kodlarınızı güvenli bir şekilde koruyun ve şifreleyin.
              </p>
              <Link
                to="/vendetta-security"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-all hover:gap-3"
              >
                Detayları Gör
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight mb-6">
              Projeler
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
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
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {project.videoId && (
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
                )}
                
                <div className="p-6">
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-gray-300 transition-colors">
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