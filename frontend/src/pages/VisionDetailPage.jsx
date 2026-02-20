import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { visionData } from './VisionPage';

const VisionDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const vision = visionData.find(v => v.slug === slug);
  const currentIndex = visionData.findIndex(v => v.slug === slug);
  const prevVision = currentIndex > 0 ? visionData[currentIndex - 1] : null;
  const nextVision = currentIndex < visionData.length - 1 ? visionData[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!vision) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <h1 className="font-heading text-2xl text-navy dark:text-white mb-4">পৃষ্ঠা পাওয়া যায়নি</h1>
          <Link to="/vision" className="text-forest dark:text-emerald-400 font-body hover:underline">
            ভিশন পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const Icon = vision.icon;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 h-[50vh] min-h-[400px]">
          <img
            src={vision.image}
            alt={vision.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/90 via-forest-deep/80 to-forest-deep"></div>
        </div>

        {/* Content */}
        <div className="relative pt-32 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            {/* Back Button */}
            <Link
              to="/vision"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-body text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              সকল ভিশন দেখুন
            </Link>

            {/* Title Section */}
            <div className="flex items-start gap-6">
              <div className={`${vision.iconBg} w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Icon className={`w-10 h-10 md:w-12 md:h-12 ${vision.iconColor}`} />
              </div>
              <div>
                <span className="inline-block font-body text-sm font-bold text-gold bg-gold/20 px-3 py-1 rounded mb-3">
                  {vision.id < 10 ? `০${vision.id}` : vision.id} / ১০
                </span>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4">
                  {vision.title}
                </h1>
                <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl">
                  {vision.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Points Section */}
      <section className="py-16 md:py-20 -mt-8">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 md:p-12">
            <h2 className="font-heading text-2xl md:text-3xl text-navy dark:text-white font-bold mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-gold rounded"></span>
              মূল কার্যক্রম সমূহ
            </h2>

            <div className="space-y-4">
              {vision.points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 md:p-5 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors group"
                >
                  <div className="w-8 h-8 bg-forest/10 dark:bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 dark:group-hover:bg-emerald-500/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-forest dark:text-emerald-400" />
                  </div>
                  <p className="font-body text-slate-700 dark:text-slate-200 leading-relaxed pt-1">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-12 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Previous */}
            {prevVision ? (
              <Link
                to={`/vision/${prevVision.slug}`}
                className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-forest dark:group-hover:text-emerald-400 transition-colors" />
                <div>
                  <span className="block font-body text-xs text-slate-400 uppercase tracking-wide mb-1">পূর্ববর্তী</span>
                  <span className="font-heading text-navy dark:text-white font-semibold group-hover:text-forest dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {prevVision.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {/* Next */}
            {nextVision ? (
              <Link
                to={`/vision/${nextVision.slug}`}
                className="flex items-center justify-end gap-4 p-5 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors group text-right"
              >
                <div>
                  <span className="block font-body text-xs text-slate-400 uppercase tracking-wide mb-1">পরবর্তী</span>
                  <span className="font-heading text-navy dark:text-white font-semibold group-hover:text-forest dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {nextVision.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-forest dark:group-hover:text-emerald-400 transition-colors" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Back to Vision */}
          <div className="text-center mt-8">
            <Link
              to="/vision"
              className="inline-flex items-center gap-2 text-forest dark:text-emerald-400 font-body font-medium hover:underline"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              সকল ভিশন দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* Other Visions Preview */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h3 className="font-heading text-2xl text-navy dark:text-white font-bold mb-8 text-center">
            অন্যান্য ভিশন
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {visionData.filter(v => v.slug !== slug).slice(0, 5).map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={`/vision/${item.slug}`}
                  className={`${item.color} border-l-4 p-4 hover:shadow-lg transition-all duration-300 group`}
                >
                  <div className={`${item.iconBg} w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <ItemIcon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h4 className="font-heading text-sm text-navy dark:text-slate-800 font-semibold line-clamp-2 group-hover:text-forest transition-colors">
                    {item.title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default VisionDetailPage;
