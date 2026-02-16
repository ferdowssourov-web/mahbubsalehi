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

  const prev = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section data-testid="hero-slider" className="relative h-[85vh] min-h-[600px] overflow-hidden bg-forest-deep">
      {/* Single active slide */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Background image */}
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
        {/* Heavy overlay to cover baked-in image text */}
        <div className="absolute inset-0 bg-forest-deep/90" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
            <div className="max-w-2xl">
              <div
                className={`transition-all duration-700 delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold-light text-sm font-body font-medium tracking-wide border border-gold/30 mb-6">
                  {slide.subtitle}
                </span>
              </div>

              <h1
                className={`font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 transition-all duration-700 delay-200 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                {slide.title}
              </h1>

              <p
                className={`font-body text-lg md:text-xl text-white/80 leading-relaxed mb-10 transition-all duration-700 delay-300 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                {slide.description}
              </p>

              <div
                className={`transition-all duration-700 delay-[400ms] ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <Link
                  to={slide.cta.link}
                  data-testid={`hero-cta-${current}`}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20"
                >
                  {slide.cta.text}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        data-testid="hero-prev"
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        data-testid="hero-next"
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
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
