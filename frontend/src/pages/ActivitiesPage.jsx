import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/api/uploads/')) return `${BACKEND_URL}${url}`;
  return url;
};

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchActivities = async () => {
      try {
        const res = await axios.get(`${API}/activities`);
        setActivities(res.data);
      } catch (e) {
        console.error('Failed to fetch activities', e);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <main data-testid="activities-page">
      {/* Page Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden bg-forest-deep">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
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
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-3 border-forest/20 border-t-forest rounded-full animate-spin mx-auto" />
              <p className="font-body text-slate-400 mt-4">লোড হচ্ছে...</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-16 text-slate-400 font-body">
              কোনো কার্যক্রম নেই।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, idx) => (
                <Link
                  key={activity.id}
                  to={`/activities/${activity.id}`}
                  data-testid={`activity-page-card-${idx}`}
                  className="group bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-1"
                >
                  {activity.image_url && (
                    <div className="img-zoom-container aspect-[16/10]">
                      <img
                        src={getImageUrl(activity.image_url)}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
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
                    {activity.content && (
                      <p className="font-body text-slate-500 text-sm mt-3 line-clamp-2">
                        {activity.content}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-4 text-forest font-body text-sm font-semibold group-hover:text-gold transition-colors">
                      বিস্তারিত পড়ুন
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ActivitiesPage;
