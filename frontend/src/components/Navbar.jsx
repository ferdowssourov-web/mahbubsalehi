import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Sun, Moon, Facebook, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { name: 'হোম', mobileName: 'হোম', path: '/', special: false },
  { name: 'ভিশন', mobileName: 'ভিশন', path: '/vision', special: false },
  { name: 'কার্যক্রম', mobileName: 'কার্যক্রম', path: '/activities', special: false },
  { name: 'গ্যালারি', mobileName: 'গ্যালারি', path: '/gallery', special: false },
  { name: 'জীবনী', mobileName: 'জীবনী', path: '/biography', special: false },
  { name: 'জনতার মতামত', mobileName: 'জনতার মতামত', path: '/opinions', special: true },
  { name: 'যোগাযোগ', mobileName: 'যোগাযোগ', path: '/contact', special: false },
];

const mobileNavLinks = [
  { name: 'হোম', mobileName: 'হোম', path: '/', special: false },
  { name: 'ভিশন', mobileName: 'ভিশন', path: '/vision', special: false },
  { name: 'কার্যক্রম', mobileName: 'কার্যক্রম', path: '/activities', special: false },
  { name: 'গ্যালারি', mobileName: 'গ্যালারি', path: '/gallery', special: false },
  { name: 'জীবনী', mobileName: 'জীবনী', path: '/biography', special: false },
  { name: 'যোগাযোগ', mobileName: 'যোগাযোগ', path: '/contact', special: false },
  { name: 'জনতার মতামত', mobileName: 'জনতার মতামত', path: '/opinions', special: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
          ? 'navbar-glass shadow-md dark:bg-slate-900/95 dark:border-b dark:border-slate-700'
          : 'bg-white/70 backdrop-blur-md dark:bg-slate-900/70'
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
            <div className="w-10 h-10 bg-forest dark:bg-emerald-700 rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Scale className="w-5 h-5 text-gold" />
            </div>
            <div className="hidden sm:block">
              <p className="font-heading text-forest dark:text-emerald-400 font-bold text-lg leading-tight">
                ব্যারিস্টার সালেহী
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-body">কুড়িগ্রাম-৩ (উলিপুর)</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.special ? (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.path.replace('/', '') || 'home'}`}
                  className="relative px-5 py-2.5 text-sm font-body font-bold rounded-md bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105 transition-all duration-300 animate-pulse-subtle overflow-hidden group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.path.replace('/', '') || 'home'}`}
                  className={`px-4 py-2 text-sm font-body font-medium rounded-sm transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-forest dark:text-emerald-400 bg-forest/5 dark:bg-emerald-400/10 border-b-2 border-gold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-forest dark:hover:text-emerald-400 hover:bg-forest/5 dark:hover:bg-emerald-400/10'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            
            {/* Social Media Icons */}
            <a
              href="https://web.facebook.com/BarristerMahbubSalehiOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 rounded-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              aria-label="Facebook Page"
            >
              <Facebook className="w-5 h-5" />
            </a>
            
            <a
              href="https://mahbubsalehi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Official Website"
            >
              <Globe className="w-5 h-5" />
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              data-testid="theme-toggle"
              className="p-2 rounded-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gold" />
              ) : (
                <Moon className="w-5 h-5 text-forest" />
              )}
            </button>
          </div>

          {/* Mobile: Theme toggle + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              data-testid="mobile-theme-toggle"
              className="p-2 rounded-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gold" />
              ) : (
                <Moon className="w-5 h-5 text-forest" />
              )}
            </button>
            <button
              data-testid="mobile-menu-toggle"
              className="p-2 text-forest dark:text-emerald-400"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-forest/10 dark:border-slate-700 mobile-menu-enter">
          <div className="px-4 py-4 space-y-1">
            {mobileNavLinks.map((link) => (
              link.special ? (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-${link.path.replace('/', '') || 'home'}`}
                  className="block px-4 py-3 rounded-md font-body font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md animate-pulse-subtle"
                >
                  {link.mobileName}
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-${link.path.replace('/', '') || 'home'}`}
                  className={`block px-4 py-3 rounded-sm font-body font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-forest dark:text-emerald-400 bg-forest/5 dark:bg-emerald-400/10 border-l-4 border-gold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-forest dark:hover:text-emerald-400 hover:bg-forest/5 dark:hover:bg-emerald-400/10'
                  }`}
                >
                  {link.mobileName}
                </Link>
              )
            ))}
            
            {/* Social Media Icons in Mobile */}
            <div className="flex items-center gap-4 px-4 py-3 border-t border-forest/10 dark:border-slate-700 mt-2">
              <a
                href="https://web.facebook.com/BarristerMahbubSalehiOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline transition-all"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-sm font-body">Facebook</span>
              </a>
              
              <a
                href="https://mahbubsalehi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:underline transition-all"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-body">Website</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
