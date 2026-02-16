import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://media.bdji.org/images/ms-Slider1.original.jpg',
    title: 'সমৃদ্ধ উলিপুর গড়ার অঙ্গীকার',
    subtitle: 'ব্যারিস্টার মাহবুবুল আলম সালেহী',
    description: 'আন্তর্জাতিক অভিবাসন বিশেষজ্ঞ, মানবাধিকার আইনজীবী ও সমাজসেবক',
    cta: { text: 'ভিশন দেখুন', link: '/vision' },
  },
  {
    image: 'https://media.bdji.org/images/ms-Slider2.original.jpg',
    title: 'সবার জন্য শিক্ষা, কাজ ও ন্যায়বিচার',
    subtitle: 'কুড়িগ্রাম-৩ (উলিপুর) সংসদীয় আসন',
    description: 'একটি দারিদ্র্যমুক্ত, শিক্ষিত, দক্ষ ও প্রযুক্তিনির্ভর উলিপুর গড়ে তোলার লক্ষ্য',
    cta: { text: 'জীবনী পড়ুন', link: '/biography' },
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const next = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  const prev = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section data-testid="hero-slider" className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? 'active' : ''}`}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover ${index === current ? 'hero-image-animate' : ''}`}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest/70 to-forest/30" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
              <div className="max-w-2xl">
                {index === current && (
                  <>
                    <div
                      className="animate-fade-in-up opacity-0"
                      style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
                    >
                      <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold-light text-sm font-body font-medium tracking-wide border border-gold/30 mb-6">
                        {slide.subtitle}
                      </span>
                    </div>

                    <h1
                      className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 animate-fade-in-up opacity-0"
                      style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
                    >
                      {slide.title}
                    </h1>

                    <p
                      className="font-body text-lg md:text-xl text-white/80 leading-relaxed mb-10 animate-fade-in-up opacity-0"
                      style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
                    >
                      {slide.description}
                    </p>

                    <div
                      className="animate-fade-in-up opacity-0"
                      style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
                    >
                      <Link
                        to={slide.cta.link}
                        data-testid={`hero-cta-${index}`}
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20"
                      >
                        {slide.cta.text}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        data-testid="hero-prev"
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        data-testid="hero-next"
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            data-testid={`hero-dot-${index}`}
            onClick={() => goToSlide(index)}
            className={`h-1 transition-all duration-500 ${
              index === current
                ? 'w-12 bg-gold'
                : 'w-6 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
