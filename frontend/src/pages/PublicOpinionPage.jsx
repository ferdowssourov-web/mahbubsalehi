import { useState } from 'react';
import { Send, Star, User, Phone, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PublicOpinionPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: '',
    opinion: '',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post(`${BACKEND_URL}/api/opinions`, form);
      setSubmitted(true);
      setForm({ name: '', phone: '', area: '', opinion: '', rating: 5 });
    } catch (err) {
      setError('মতামত জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setForm({ ...form, rating: star })}
            className={`p-1 transition-transform hover:scale-110 ${
              star <= form.rating ? 'text-gold' : 'text-slate-300 dark:text-slate-600'
            }`}
          >
            <Star className={`w-6 h-6 ${star <= form.rating ? 'fill-current' : ''}`} />
          </button>
        ))}
        <span className="ml-2 text-sm font-body text-slate-500 dark:text-slate-400">
          ({form.rating}/৫)
        </span>
      </div>
    );
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 md:p-12 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-forest dark:text-emerald-400 font-bold mb-4">
              ধন্যবাদ!
            </h2>
            <p className="font-body text-slate-600 dark:text-slate-300 mb-6">
              আপনার মূল্যবান মতামতের জন্য আন্তরিক ধন্যবাদ। আপনার মতামত পর্যালোচনা করে প্রকাশ করা হবে।
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-forest hover:bg-forest-deep text-white font-body font-semibold transition-all duration-300"
            >
              আরো মতামত দিন
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <section className="bg-forest dark:bg-forest-deep py-12 md:py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 animate-fade-in-up">
            জনতার মতামত
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto animate-fade-in-up delay-100">
            আপনার মূল্যবান মতামত আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। উলিপুরের উন্নয়নে আপনার চিন্তা ও পরামর্শ শেয়ার করুন।
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-sm animate-fade-in-up delay-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                <User className="w-4 h-4 text-forest dark:text-emerald-400" />
                আপনার নাম *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors"
                placeholder="আপনার পুরো নাম"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                <Phone className="w-4 h-4 text-forest dark:text-emerald-400" />
                মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors"
                placeholder="০১XXXXXXXXX"
              />
            </div>

            {/* Area */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                <MapPin className="w-4 h-4 text-forest dark:text-emerald-400" />
                এলাকা / ইউনিয়ন
              </label>
              <input
                type="text"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors"
                placeholder="আপনার এলাকার নাম"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-3">
                <Star className="w-4 h-4 text-forest dark:text-emerald-400" />
                আপনার রেটিং
              </label>
              {renderStars()}
            </div>

            {/* Opinion */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                <MessageSquare className="w-4 h-4 text-forest dark:text-emerald-400" />
                আপনার মতামত *
              </label>
              <textarea
                value={form.opinion}
                onChange={(e) => setForm({ ...form, opinion: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors resize-y"
                placeholder="উলিপুরের উন্নয়নে আপনার চিন্তা, পরামর্শ বা মতামত লিখুন..."
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 font-body text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold px-6 py-4 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  মতামত জমা দিন
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info */}
        <p className="text-center text-sm font-body text-slate-500 dark:text-slate-400 mt-6">
          আপনার মতামত পর্যালোচনার পর প্রকাশ করা হবে। ব্যক্তিগত তথ্য গোপন রাখা হবে।
        </p>
      </div>
    </main>
  );
};

export default PublicOpinionPage;
