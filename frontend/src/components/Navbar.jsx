import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = ({ isAuthenticated, isAdmin, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-mono text-xl font-bold tracking-wider hover:text-gray-300 transition-colors">
            SOULFLY871
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Projeler
            </Link>
            <Link
              to="/vendetta-security"
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                isActive('/vendetta-security') ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              Vendetta Security
            </Link>
            <Link
              to="/testimonials"
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                isActive('/testimonials') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Yorumlar
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                isActive('/contact') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              İletişim
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`text-sm font-mono uppercase tracking-wider transition-colors ${
                      isActive('/admin') ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all"
              >
                Giriş Yap
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-bold uppercase tracking-wider ${
                isActive('/') ? 'text-white' : 'text-gray-400'
              }`}
            >
              Projeler
            </Link>
            <Link
              to="/vendetta-security"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-bold uppercase tracking-wider ${
                isActive('/vendetta-security') ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              Vendetta Security
            </Link>
            <Link
              to="/testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-bold uppercase tracking-wider ${
                isActive('/testimonials') ? 'text-white' : 'text-gray-400'
              }`}
            >
              Yorumlar
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-bold uppercase tracking-wider ${
                isActive('/contact') ? 'text-white' : 'text-gray-400'
              }`}
            >
              İletişim
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm font-mono uppercase tracking-wider ${
                      isActive('/admin') ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-sm font-mono uppercase tracking-wider text-gray-400"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-mono uppercase tracking-wider text-gray-400"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;