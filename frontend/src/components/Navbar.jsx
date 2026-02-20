import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { name: 'প্রচ্ছদ', mobileName: 'প্রচ্ছদ', path: '/' },
  { name: 'জীবনী', mobileName: 'জীবনী', path: '/biography' },
  { name: 'ভিশন', mobileName: 'ভিশন', path: '/vision' },
  { name: 'কার্যক্রম', mobileName: 'কার্যক্রম', path: '/activities' },
  { name: 'জনতার মতামত', mobileName: 'জনমত', path: '/opinions' },
  { name: 'যোগাযোগ', mobileName: 'যোগাযোগ', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'navbar-glass shadow-md'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            data-testid="navbar-logo"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-forest rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Scale className="w-5 h-5 text-gold" />
            </div>
            <div className="hidden sm:block">
              <p className="font-heading text-forest font-bold text-lg leading-tight">
                ব্যারিস্টার সালেহী
              </p>
              <p className="text-xs text-slate-500 font-body">কুড়িগ্রাম-৩ (উলিপুর)</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.path.replace('/', '') || 'home'}`}
                className={`px-4 py-2 text-sm font-body font-medium rounded-sm transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-forest bg-forest/5 border-b-2 border-gold'
                    : 'text-slate-700 hover:text-forest hover:bg-forest/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 text-forest"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-forest/10 mobile-menu-enter">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-${link.path.replace('/', '') || 'home'}`}
                className={`block px-4 py-3 rounded-sm font-body font-medium transition-all ${
                  location.pathname === link.path
                    ? 'text-forest bg-forest/5 border-l-4 border-gold'
                    : 'text-slate-600 hover:text-forest hover:bg-forest/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
