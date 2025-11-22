import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, FileText, MessageSquare, Users, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { mockProjects, mockTestimonials, mockAbout } from '../mock';

const Admin = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [about, setAbout] = useState(null);
  const [users, setUsers] = useState([
    { id: '1', username: 'user1', role: 'user', isCustomer: false },
    { id: '2', username: 'user2', role: 'user', isCustomer: true },
    { id: '3', username: 'soulfly871', role: 'admin', isCustomer: true }
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    setProjects(mockProjects);
    setTestimonials(mockTestimonials);
    setAbout(mockAbout);
  }, [isAdmin, navigate]);

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleDeleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const toggleCustomerStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isCustomer: !user.isCustomer } : user
    ));
  };

  const handleSaveProject = (project) => {
    if (editingItem?.id) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      setProjects([...projects, { ...project, id: Date.now().toString() }]);
    }
    setEditingItem(null);
    setShowAddForm(false);
  };

  const ProjectForm = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState(project || {
      title: '',
      description: '',
      videoUrl: '',
      videoId: '',
      category: '',
      featured: false,
      isService: false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-mono uppercase tracking-wider mb-2">Başlık</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-mono uppercase tracking-wider mb-2">Kategori</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-mono uppercase tracking-wider mb-2">Açıklama</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-mono uppercase tracking-wider mb-2">Video URL</label>
            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              placeholder="https://youtu.be/..."
            />
          </div>
          <div>
            <label className="block text-sm font-mono uppercase tracking-wider mb-2">Video ID</label>
            <input
              type="text"
              value={formData.videoId}
              onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              placeholder="uJKXUEYjMto"
            />
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm font-mono">Öne Çıkan</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isService}
              onChange={(e) => setFormData({ ...formData, isService: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm font-mono">Hizmet</span>
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="px-6 py-2 bg-white text-black text-sm font-mono uppercase rounded-full hover:bg-gray-200 transition-all">
            <Save className="inline w-4 h-4 mr-2" />
            Kaydet
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-white/5 border border-white/10 text-sm font-mono uppercase rounded-full hover:bg-white/10 transition-all">
            <X className="inline w-4 h-4 mr-2" />
            İptal
          </button>
        </div>
      </form>
    );
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-mono text-4xl font-bold uppercase tracking-tight mb-2">
            Admin Paneli
          </h1>
          <p className="text-gray-400">Site içeriğini yönetin</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2 text-sm font-mono uppercase tracking-wider rounded-full transition-all ${
              activeTab === 'projects' ? 'bg-white text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <FileText className="inline w-4 h-4 mr-2" />
            Projeler
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-2 text-sm font-mono uppercase tracking-wider rounded-full transition-all ${
              activeTab === 'testimonials' ? 'bg-white text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <MessageSquare className="inline w-4 h-4 mr-2" />
            Yorumlar
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 text-sm font-mono uppercase tracking-wider rounded-full transition-all ${
              activeTab === 'users' ? 'bg-white text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Users className="inline w-4 h-4 mr-2" />
            Kullanıcılar
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 text-sm font-mono uppercase tracking-wider rounded-full transition-all ${
              activeTab === 'settings' ? 'bg-white text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Settings className="inline w-4 h-4 mr-2" />
            Ayarlar
          </button>
        </div>

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-mono text-2xl font-bold">Projeler</h2>
              <button
                onClick={() => { setShowAddForm(true); setEditingItem(null); }}
                className="px-6 py-2 bg-white text-black text-sm font-mono uppercase rounded-full hover:bg-gray-200 transition-all"
              >
                <Plus className="inline w-4 h-4 mr-2" />
                Yeni Proje
              </button>
            </div>

            {showAddForm && (
              <ProjectForm
                project={editingItem}
                onSave={handleSaveProject}
                onCancel={() => { setShowAddForm(false); setEditingItem(null); }}
              />
            )}

            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="bg-white/5 border border-white/10 rounded-lg p-6">
                  {editingItem?.id === project.id ? (
                    <ProjectForm
                      project={project}
                      onSave={handleSaveProject}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-mono text-lg font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-white/10 text-xs font-mono rounded-full">{project.category}</span>
                          {project.featured && <span className="px-3 py-1 bg-white/10 text-xs font-mono rounded-full">Öne Çıkan</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingItem(project)}
                          className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div>
            <h2 className="font-mono text-2xl font-bold mb-6">Yorumlar</h2>
            <div className="space-y-4">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-white/5 border border-white/10 rounded-lg p-6 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-mono font-bold mb-1">{testimonial.author}</h3>
                    <p className="text-gray-400 text-sm mb-2">{testimonial.content}</p>
                    <p className="text-gray-500 text-xs">{testimonial.date}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="font-mono text-2xl font-bold mb-6">Kullanıcılar</h2>
            <div className="space-y-4">
              {users.map(user => (
                <div key={user.id} className="bg-white/5 border border-white/10 rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-mono font-bold mb-1">{user.username}</h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white/10 text-xs font-mono rounded-full">{user.role}</span>
                      {user.isCustomer && <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded-full">Müşteri</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleCustomerStatus(user.id)}
                    className={`px-4 py-2 text-xs font-mono uppercase rounded-full transition-all ${
                      user.isCustomer
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {user.isCustomer ? 'Müşteri Etiketini Kaldır' : 'Müşteri Yap'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && about && (
          <div>
            <h2 className="font-mono text-2xl font-bold mb-6">Genel Ayarlar</h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="mb-6">
                <label className="block text-sm font-mono uppercase tracking-wider mb-2">Başlık</label>
                <input
                  type="text"
                  value={about.title}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-mono uppercase tracking-wider mb-2">Bio</label>
                <textarea
                  value={about.bio}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-mono uppercase tracking-wider mb-2">Discord</label>
                <input
                  type="text"
                  value={about.discord}
                  onChange={(e) => setAbout({ ...about, discord: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <button className="px-6 py-2 bg-white text-black text-sm font-mono uppercase rounded-full hover:bg-gray-200 transition-all">
                <Save className="inline w-4 h-4 mr-2" />
                Kaydet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;