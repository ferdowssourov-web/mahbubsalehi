import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, Share2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ActivityDetailPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [relatedActivities, setRelatedActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [actRes, allRes] = await Promise.all([
          axios.get(`${API}/activities/${id}`),
          axios.get(`${API}/activities`)
        ]);
        setActivity(actRes.data);
        setRelatedActivities(allRes.data.filter(a => a.id !== id).slice(0, 3));
      } catch (e) {
        console.error('Failed to fetch activity', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/api/uploads/')) return `${BACKEND_URL}${url}`;
    return url;
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-forest/20 border-t-forest rounded-full animate-spin mx-auto" />
          <p className="font-body text-slate-400 mt-4">লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (!activity) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-navy font-bold mb-4">পোস্ট পাওয়া যায়নি</h2>
          <Link to="/activities" className="text-forest font-body hover:text-gold transition-colors">
            সকল কার্যক্রমে ফিরুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main data-testid="activity-detail-page" className="pt-20 bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-4">
          <div className="flex items-center gap-2 font-body text-sm text-slate-500">
            <Link to="/" className="hover:text-forest transition-colors" data-testid="breadcrumb-home">প্রচ্ছদ</Link>
            <span>/</span>
            <Link to="/activities" className="hover:text-forest transition-colors" data-testid="breadcrumb-activities">কার্যক্রম</Link>
            <span>/</span>
            <span className="text-navy font-medium truncate max-w-[200px]">{activity.title}</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-xs font-body font-semibold" data-testid="detail-category">
            <Tag className="w-3 h-3" />
            {activity.category}
          </span>
          {activity.date && (
            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm font-body" data-testid="detail-date">
              <Calendar className="w-4 h-4" />
              {activity.date}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-navy font-bold leading-tight mb-8"
          data-testid="detail-title"
        >
          {activity.title}
        </h1>

        {/* Gold divider */}
        <div className="w-20 h-1 bg-gold mb-10" />

        {/* Featured image */}
        {activity.image_url && (
          <div className="mb-10 overflow-hidden" data-testid="detail-image-container">
            <img
              src={getImageUrl(activity.image_url)}
              alt={activity.title}
              className="w-full max-h-[500px] object-cover"
              data-testid="detail-image"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="font-body text-slate-700 text-lg leading-[1.9] whitespace-pre-wrap"
          data-testid="detail-content"
        >
          {activity.content || 'বিস্তারিত বিবরণ শীঘ্রই যোগ করা হবে।'}
        </div>

        {/* Share / Back */}
        <div className="flex items-center justify-between mt-14 pt-8 border-t border-slate-200">
          <Link
            to="/activities"
            data-testid="back-to-activities"
            className="inline-flex items-center gap-2 text-forest font-body font-semibold hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            সকল কার্যক্রম
          </Link>
          <button
            data-testid="share-btn"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: activity.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-forest font-body text-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
            শেয়ার করুন
          </button>
        </div>
      </article>

      {/* Related posts */}
      {relatedActivities.length > 0 && (
        <section className="bg-slate-50 py-16 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <h2 className="font-heading text-2xl text-navy font-bold mb-8">আরো কার্যক্রম</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedActivities.map((item) => (
                <Link
                  key={item.id}
                  to={`/activities/${item.id}`}
                  data-testid={`related-activity-${item.id}`}
                  className="group bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {item.image_url && (
                    <div className="img-zoom-container aspect-[16/10]">
                      <img src={getImageUrl(item.image_url)} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-gold text-xs font-body font-semibold">{item.category}</span>
                    <h4 className="font-heading text-base text-navy font-semibold mt-1 leading-snug group-hover:text-forest transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ActivityDetailPage;
