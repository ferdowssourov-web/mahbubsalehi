import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ActivitiesSection = ({ limit = 4, showHeader = true }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(`${API}/activities`);
        setActivities(res.data);
      } catch (e) {
        console.error('Failed to fetch activities', e);
      }
    };
    fetchActivities();
  }, []);

  const displayActivities = activities.slice(0, limit);

  if (displayActivities.length === 0) return null;

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
                    src={displayActivities[0].image_url}
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
                    src={activity.image_url}
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

export default ActivitiesSection;
