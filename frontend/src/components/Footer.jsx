import { Link } from 'react-router-dom';
import { Scale, MapPin, Mail, Facebook, Globe, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer data-testid="footer" className="bg-forest-deep text-white relative">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold rounded-sm flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-heading text-white font-bold text-lg">ব্যারিস্টার সালেহী</p>
              </div>
            </div>
            <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
              আন্তর্জাতিক অভিবাসন বিশেষজ্ঞ, মানবাধিকার আইনজীবী ও সমাজসেবক। সংসদ সদস্য কুড়িগ্রাম-৩ (উলিপুর)।
            </p>
            <div className="flex gap-3">
              <a
                href="https://web.facebook.com/BarristerMahbubSalehiOfficial"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-facebook"
                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://mahbubsalehi.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-website"
                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-gold font-semibold mb-6">দ্রুত লিংক</h4>
            <ul className="space-y-3">
              {[
                { name: 'প্রচ্ছদ', path: '/' },
                { name: 'জীবনী', path: '/biography' },
                { name: 'ভিশন', path: '/vision' },
                { name: 'কার্যক্রম', path: '/activities' },
                { name: 'যোগাযোগ', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-link-${link.path.replace('/', '') || 'home'}`}
                    className="font-body text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision links */}
          <div>
            <h4 className="font-heading text-gold font-semibold mb-6">আমাদের ভিশন</h4>
            <ul className="space-y-3">
              {[
                'শিক্ষিত ও দক্ষ উলিপুর',
                'কর্মসংস্থান সমৃদ্ধ উলিপুর',
                'দুর্যোগ ব্যবস্থাপনা',
                'স্মার্ট কৃষি',
                'সুশাসন ও সামাজিক সুরক্ষা',
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to="/vision"
                    className="font-body text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-heading text-gold font-semibold mb-6">যোগাযোগ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="font-body text-white/60 text-sm">উলিপুর, কুড়িগ্রাম, বাংলাদেশ</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="font-body text-white/60 text-sm">info@mahbubsalehi.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/40 text-sm">
            &copy; ২০২৬ ব্যারিস্টার মাহবুবুল আলম সালেহী। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <button
            onClick={scrollToTop}
            data-testid="scroll-to-top"
            className="w-10 h-10 bg-gold/20 border border-gold/30 flex items-center justify-center hover:bg-gold transition-all duration-300 group"
          >
            <ArrowUp className="w-4 h-4 text-gold group-hover:text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
