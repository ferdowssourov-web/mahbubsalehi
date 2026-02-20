import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    title: 'সমৃদ্ধ উলিপুর গড়ার অঙ্গীকার',
    subtitle: 'ব্যারিস্টার মাহবুবুল আলম সালেহী',
    description: 'আন্তর্জাতিক অভিবাসন বিশেষজ্ঞ, মানবাধিকার আইনজীবী ও সমাজসেবক। সংসদ সদস্য কুড়িগ্রাম-৩ (উলিপুর)।',
    cta: { text: 'ভিশন দেখুন', link: '/vision' },
    ctaSecondary: { text: 'জীবনী পড়ুন', link: '/biography' },
  },
  {
    title: 'সবার জন্য শিক্ষা, কাজ ও ন্যায়বিচার',
    subtitle: 'কুড়িগ্রাম-৩ (উলিপুর) সংসদীয় আসন',
    description: 'একটি দারিদ্র্যমুক্ত, শিক্ষিত, দক্ষ ও প্রযুক্তিনির্ভর উলিপুর গড়ে তোলার লক্ষ্যে কাজ করে যাচ্ছি।',
    cta: { text: 'কার্যক্রম দেখুন', link: '/activities' },
    ctaSecondary: { text: 'যোগাযোগ করুন', link: '/contact' },
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const goToSlide = useCallback((index) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrent(index);
      setFadeIn(true);
    }, 400);
  }, []);

  const next = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section data-testid="hero-slider" className="relative min-h-[85vh] bg-forest-deep overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[85vh]">
          {/* Text side */}
          <div className="pt-24 pb-12 lg:py-0">
            <div className={`transition-all duration-700 delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold-light text-sm font-body font-medium tracking-wide border border-gold/30 mb-6">
                {slide.subtitle}
              </span>
            </div>

            <h1
              className={`font-heading text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl text-white font-bold leading-tight mb-6 transition-all duration-700 delay-200 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {slide.title}
            </h1>

            <p
              className={`font-body text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-lg transition-all duration-700 delay-300 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {slide.description}
            </p>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-[400ms] ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <Link
                to={slide.cta.link}
                data-testid={`hero-cta-primary`}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20"
              >
                {slide.cta.text}
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to={slide.ctaSecondary.link}
                data-testid={`hero-cta-secondary`}
                className="inline-flex items-center gap-2 border-2 border-white/20 text-white hover:border-gold/50 hover:text-gold-light font-body font-semibold px-8 py-3.5 transition-all duration-300"
              >
                {slide.ctaSecondary.text}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="flex gap-3 mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  data-testid={`hero-dot-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`h-1 transition-all duration-500 ${
                    index === current
                      ? 'w-12 bg-gold'
                      : 'w-6 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="hidden lg:flex justify-end items-end relative">
            <div className={`relative transition-all duration-700 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              {/* Decorative gold frame */}
              <div className="absolute -top-6 -right-6 w-[85%] h-[85%] border-2 border-gold/30" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10" />

              <img
                src="https://media.bdji.org/images/ms-2.original.format-webp.webp"
                alt="ব্যারিস্টার মাহবুবুল আলম সালেহী"
                className="relative z-10 w-full max-w-[480px] aspect-[3/4] object-cover object-top"
                data-testid="hero-profile-image"
              />

              {/* Name badge */}
              <div className="absolute bottom-8 left-0 z-20 bg-forest/90 backdrop-blur-sm border-l-4 border-gold px-6 py-4">
                <p className="font-heading text-white font-bold text-lg">ব্যারিস্টার সালেহী</p>
                <p className="font-body text-gold text-sm">কুড়িগ্রাম-৩ (উলিপুর)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
