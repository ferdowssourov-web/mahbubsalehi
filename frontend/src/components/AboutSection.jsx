import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Globe } from 'lucide-react';

const AboutSection = () => {
  return (
    <section data-testid="about-section" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23064e3b' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Gold accent frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30" />
              <div className="relative overflow-hidden">
                <img
                  src="https://media.bdji.org/images/ms-2.original.format-webp.webp"
                  alt="ব্যারিস্টার মাহবুবুল আলম সালেহী"
                  className="w-full object-cover aspect-[3/4]"
                  data-testid="about-profile-image"
                />
                {/* Overlay info bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-deep/90 to-transparent pt-16 pb-6 px-6">
                  <p className="text-gold font-heading font-semibold text-lg">ব্যারিস্টার মাহবুবুল আলম সালেহী</p>
                  <p className="text-white/80 font-body text-sm mt-1">আন্তর্জাতিক অভিবাসন বিশেষজ্ঞ ও মানবাধিকার আইনজীবী</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">পরিচয়</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-bold mt-3 leading-tight">
                উলিপুরের সন্তান,<br />
                <span className="text-forest">দেশের গর্ব</span>
              </h2>
              <div className="w-16 h-1 bg-gold mt-6" />
            </div>

            <p className="font-body text-slate-600 text-lg leading-relaxed mb-6">
              ব্যারিস্টার মাহবুবুল আলম সালেহী একজন আন্তর্জাতিকভাবে স্বীকৃত অভিবাসন বিশেষজ্ঞ, মানবাধিকার আইনজীবী ও সমাজসেবক। তিনি কুড়িগ্রাম-৩ (উলিপুর) সংসদীয় আসনে বাংলাদেশ জামায়াতে ইসলামী মনোনীত সংসদ সদস্য পদপ্রার্থী।
            </p>

            <p className="font-body text-slate-600 leading-relaxed mb-8">
              তিনি রাজশাহী বিশ্ববিদ্যালয়ে স্নাতক শেষ করে যুক্তরাজ্যের লিঙ্কনস ইন থেকে ব্যারিস্টার-অ্যাট-ল এবং ইউরোপের বিভিন্ন বিশ্ববিদ্যালয় থেকে উচ্চশিক্ষা সম্পন্ন করেছেন। দীর্ঘ প্রবাস জীবনে আন্তর্জাতিক মঞ্চে বাংলাদেশের গণতন্ত্র ও মানবাধিকারের পক্ষে কাজ করেছেন।
            </p>

            {/* Credential badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-3 bg-forest/5 border border-forest/10 px-5 py-3">
                <BookOpen className="w-5 h-5 text-forest" />
                <span className="font-body text-sm font-medium text-navy">লিঙ্কনস ইন, যুক্তরাজ্য</span>
              </div>
              <div className="flex items-center gap-3 bg-forest/5 border border-forest/10 px-5 py-3">
                <Globe className="w-5 h-5 text-forest" />
                <span className="font-body text-sm font-medium text-navy">আন্তর্জাতিক অভিবাসন বিশেষজ্ঞ</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/biography"
                data-testid="about-read-bio-btn"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-deep text-white font-body font-semibold px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                সম্পূর্ণ জীবনী পড়ুন
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/vision"
                data-testid="about-vision-btn"
                className="inline-flex items-center gap-2 border-2 border-forest text-forest hover:bg-forest hover:text-white font-body font-semibold px-8 py-3.5 transition-all duration-300"
              >
                ভিশন দেখুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
