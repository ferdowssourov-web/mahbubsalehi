import { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { activities } from '@/components/ActivitiesSection';

const ActivitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="activities-page">
      {/* Page Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.bdji.org/images/ms-Slider1.original.jpg"
            alt="কার্যক্রম"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest/80 to-forest/50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">সাম্প্রতিক</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3">
            কার্যক্রম আপডেট
          </h1>
          <p className="font-body text-white/70 text-lg mt-4">
            ব্যারিস্টার সালেহীর সাম্প্রতিক কার্যক্রম ও কর্মসূচি
          </p>
        </div>
      </section>

      {/* Activities grid */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, idx) => (
              <div
                key={activity.id}
                data-testid={`activity-page-card-${idx}`}
                className="group bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="img-zoom-container aspect-[16/10]">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-body font-semibold">
                      {activity.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-xs font-body">
                      <Calendar className="w-3 h-3" />
                      {activity.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg text-navy font-bold leading-snug group-hover:text-forest transition-colors duration-300">
                    {activity.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ActivitiesPage;
