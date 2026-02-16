import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'ব্যারিস্টার মাহবুবুল আলম সালেহী: উলিপুরের এক অদম্য সংগ্রামীর গল্প',
    image: 'https://media.bdji.org/images/1211.original.format-webp.webp',
    date: '২০২৫',
    category: 'ব্যক্তিত্ব',
  },
  {
    id: 2,
    title: 'জামায়াতে ইসলামীর কেন্দ্রীয় নির্বাহী পরিষদের বৈঠক',
    image: 'https://media.bdji.org/images/557585451_122151827564749601_11561.original.format-webp.webp',
    date: '২০২৫',
    category: 'রাজনীতি',
  },
  {
    id: 3,
    title: 'কুড়িগ্রামে জামায়াতের মিছিল ও জেলা প্রশাসকের কাছে স্মারকলিপি প্রদান',
    image: 'https://media.bdji.org/images/4242.original.format-webp.webp',
    date: '২০২৫',
    category: 'কার্যক্রম',
  },
  {
    id: 4,
    title: 'নিন্দা ও প্রতিবাদ বার্তা',
    image: 'https://media.bdji.org/images/121212.original.format-webp.webp',
    date: '২০২৫',
    category: 'বিবৃতি',
  },
  {
    id: 5,
    title: 'সমৃদ্ধ উলিপুর গড়ার লক্ষ্যে রংপুরে উলিপুরবাসীর মতবিনিময় সভা অনুষ্ঠিত',
    image: 'https://media.bdji.org/images/557602506_122136658088904504_46541.original.format-webp.webp',
    date: '২০২৫',
    category: 'সভা',
  },
];

const ActivitiesSection = ({ limit = 4, showHeader = true }) => {
  const displayActivities = activities.slice(0, limit);

  return (
    <section data-testid="activities-section" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">সাম্প্রতিক</span>
              <h2 className="font-heading text-3xl md:text-4xl text-navy font-bold mt-3">
                কার্যক্রম আপডেট
              </h2>
              <div className="w-16 h-1 bg-gold mt-5" />
            </div>
            <Link
              to="/activities"
              data-testid="activities-see-all-btn"
              className="inline-flex items-center gap-2 text-forest font-body font-semibold hover:text-gold transition-colors duration-300 group"
            >
              সকল কার্যক্রম দেখুন
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Large featured card */}
          {displayActivities[0] && (
            <div className="md:col-span-7 group" data-testid="activity-card-featured">
              <div className="relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                <div className="img-zoom-container aspect-[16/10]">
                  <img
                    src={displayActivities[0].image}
                    alt={displayActivities[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-gold text-white text-xs font-body font-semibold mb-3">
                    {displayActivities[0].category}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl text-white font-bold leading-snug group-hover:text-gold-light transition-colors duration-300">
                    {displayActivities[0].title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-white/70 text-sm font-body">
                    <Calendar className="w-4 h-4" />
                    {displayActivities[0].date}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stacked side cards */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
            {displayActivities.slice(1, 4).map((activity, idx) => (
              <div
                key={activity.id}
                data-testid={`activity-card-${idx + 1}`}
                className="group flex gap-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="img-zoom-container w-32 md:w-40 flex-shrink-0">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
                <div className="flex flex-col justify-center py-4 pr-4">
                  <span className="text-gold text-xs font-body font-semibold uppercase tracking-wider mb-1.5">
                    {activity.category}
                  </span>
                  <h4 className="font-heading text-sm md:text-base text-navy font-semibold leading-snug group-hover:text-forest transition-colors duration-300 line-clamp-2">
                    {activity.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-slate-400 text-xs font-body">
                    <Calendar className="w-3 h-3" />
                    {activity.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { activities };
export default ActivitiesSection;
