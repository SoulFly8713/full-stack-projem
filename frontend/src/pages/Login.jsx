import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Mock login
      if (formData.username === 'soulfly871' && formData.password === 'soul1453') {
        onLogin({ username: formData.username, role: 'admin', isCustomer: true });
        navigate('/admin');
      } else {
        // Any other user login
        onLogin({ username: formData.username, role: 'user', isCustomer: false });
        navigate('/');
      }
    } else {
      // Mock register
      onLogin({ username: formData.username, role: 'user', isCustomer: false });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <LogIn className="w-12 h-12 mx-auto mb-4 text-white" />
          <h1 className="font-mono text-3xl font-bold uppercase tracking-tight mb-2">
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </h1>
          <p className="text-gray-400">
            {isLogin ? 'Hesabınıza giriş yapın' : 'Yeni hesap oluşturun'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-mono uppercase tracking-wider mb-2">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition-colors"
              placeholder="kullaniciadi"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-mono uppercase tracking-wider mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-white text-black text-sm font-mono uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all mb-4"
          >
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-400 text-sm hover:text-white transition-colors">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;