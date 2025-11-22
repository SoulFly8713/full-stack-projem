import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { mockTestimonials } from '../mock';

const Testimonials = ({ isAuthenticated, isCustomer }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    content: '',
    rating: 5
  });

  useEffect(() => {
    setTestimonials(mockTestimonials);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const testimonial = {
      id: Date.now().toString(),
      ...newTestimonial,
      author: 'Kullanıcı',
      role: 'Müşteri',
      date: new Date().toISOString().split('T')[0],
      isCustomer: true
    };
    setTestimonials([testimonial, ...testimonials]);
    setNewTestimonial({ content: '', rating: 5 });
    setShowForm(false);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-white text-white' : 'text-gray-600'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-mono text-4xl sm:text-5xl font-bold uppercase tracking-tight mb-4">
            Yorumlar
          </h1>
          <p className="text-gray-400 text-lg">
            Müşterilerimizin deneyimleri ve geri bildirimleri
          </p>
        </div>

        {isAuthenticated && isCustomer && (
          <div className="mb-12">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-left hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Yorum yaz...
                  </span>
                </div>
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="mb-4">
                  <label className="block text-sm font-mono uppercase tracking-wider mb-2">
                    Değerlendirme
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          size={24}
                          className={star <= newTestimonial.rating ? 'fill-white text-white' : 'text-gray-600'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-mono uppercase tracking-wider mb-2">
                    Yorumunuz
                  </label>
                  <textarea
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="Deneyiminizi paylaşın..."
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white text-black text-sm font-mono uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all"
                  >
                    Gönder
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 bg-white/5 text-white border border-white/10 text-sm font-mono uppercase tracking-wider rounded-full hover:bg-white/10 transition-all"
                  >
                    İptal
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {!isAuthenticated && (
          <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-lg text-center">
            <p className="text-gray-400">
              Yorum yazmak için <a href="/login" className="text-white underline hover:text-gray-300">giriş yapın</a>
            </p>
          </div>
        )}

        {isAuthenticated && !isCustomer && (
          <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-lg text-center">
            <p className="text-gray-400">
              Yorum yazabilmek için müşteri etiketine sahip olmanız gerekmektedir.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-mono font-bold text-lg mb-1">{testimonial.author}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                {testimonial.content}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(testimonial.date).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;