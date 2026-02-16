import { Quote } from 'lucide-react';

const QuoteSection = () => {
  return (
    <section data-testid="quote-section" className="py-16 md:py-24 bg-forest relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5h-2zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 text-center">
        <Quote className="w-12 h-12 text-gold mx-auto mb-8 opacity-60" />
        <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-relaxed mb-8">
          "যেখানে মানুষ ন্যায় ও উন্নয়নের পক্ষে একত্রিত হয়, সেখানে উন্নয়ন অনিবার্য।"
        </blockquote>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
        <p className="font-body text-gold text-lg font-medium">
          ব্যারিস্টার মাহবুবুল আলম সালেহী
        </p>
      </div>
    </section>
  );
};

export default QuoteSection;
