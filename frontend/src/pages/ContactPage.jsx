import { useEffect, useState } from 'react';
import { MapPin, Mail, Send, CheckCircle, AlertCircle, User, Phone, FileText, MessageSquare, ChevronDown, Clock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AREA_OPTIONS = [
  'উলিপুর পৌরসভা',
  'গুনাইগাছ ইউনিয়ন',
  'দূর্গাপুর ইউনিয়ন',
  'বেগমগঞ্জ ইউনিয়ন',
  'বুড়াবুড়ি ইউনিয়ন',
  'বজরা ইউনিয়ন',
  'দলদলিয়া ইউনিয়ন',
  'ধামশ্রেণী ইউনিয়ন',
  'ধরণীবাড়ী ইউনিয়ন',
  'হাতিয়া ইউনিয়ন',
  'পান্ডুল ইউনিয়ন',
  'সাহেবের আলগা ইউনিয়ন',
  'তবকপুর ইউনিয়ন',
  'থেতরাই ইউনিয়ন',
];

const SUBJECT_OPTIONS = [
  'ব্যক্তিগত সমস্যা',
  'সামাজিক সমস্যা',
  'উন্নয়ন পরামর্শ',
  'শিক্ষা বিষয়ক',
  'স্বাস্থ্য বিষয়ক',
  'কৃষি বিষয়ক',
  'কর্মসংস্থান বিষয়ক',
  'অন্যান্য',
];

// Convert number to Bengali digits
const toBengaliDigits = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

// Countdown Component
const CountdownTimer = ({ targetDate, title }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gold animate-pulse" />
        <p className="font-body text-sm text-white/80">{title}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center min-w-[70px]">
          <span className="font-heading text-2xl md:text-3xl font-bold text-gold">{toBengaliDigits(timeLeft.days)}</span>
          <p className="text-xs text-white/70 mt-1">দিন</p>
        </div>
        <span className="text-gold text-2xl font-bold">:</span>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center min-w-[70px]">
          <span className="font-heading text-2xl md:text-3xl font-bold text-gold">{toBengaliDigits(timeLeft.hours.toString().padStart(2, '0'))}</span>
          <p className="text-xs text-white/70 mt-1">ঘণ্টা</p>
        </div>
        <span className="text-gold text-2xl font-bold">:</span>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center min-w-[70px]">
          <span className="font-heading text-2xl md:text-3xl font-bold text-gold">{toBengaliDigits(timeLeft.minutes.toString().padStart(2, '0'))}</span>
          <p className="text-xs text-white/70 mt-1">মিনিট</p>
        </div>
        <span className="text-gold text-2xl font-bold">:</span>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center min-w-[70px]">
          <span className="font-heading text-2xl md:text-3xl font-bold text-gold animate-pulse">{toBengaliDigits(timeLeft.seconds.toString().padStart(2, '0'))}</span>
          <p className="text-xs text-white/70 mt-1">সেকেন্ড</p>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    area: '', 
    subject: '',
    message: '' 
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCountdown();
  }, []);

  const fetchCountdown = async () => {
    try {
      const res = await axios.get(`${API}/countdown`);
      setCountdown(res.data);
    } catch (err) {
      console.error('Failed to fetch countdown', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/registrations`, form);
      setStatus('success');
      setForm({ name: '', phone: '', area: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="contact-page" className="dark:bg-slate-900">
      {/* Page Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-forest-deep py-12">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">Registration</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3">
            Meet With Barrister Salehi
          </h1>
          <p className="font-body text-white/70 text-lg mt-4 max-w-2xl">
            ব্যারিস্টার মাহবুব সালেহীর সাথে সাক্ষাৎ করে আপনার আকাঙ্ক্ষা, সমস্যা ও মতামত জানাতে রেজিষ্ট্রেশন করুন।
          </p>
          
          {/* Countdown Timer */}
          {countdown && countdown.is_active && countdown.target_date && (
            <CountdownTimer 
              targetDate={countdown.target_date} 
              title={countdown.title || "তারুণ্যের মুখোমুখির পরবর্তী সময়"} 
            />
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Info Section */}
            <div className="lg:col-span-5">
              <h2 className="font-heading text-2xl md:text-3xl text-navy dark:text-white font-bold mb-4">
                সাক্ষাতের জন্য রেজিষ্ট্রেশন
              </h2>
              <div className="w-16 h-1 bg-gold mb-8" />
              <p className="font-body text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                ব্যারিস্টার মাহবুবুল আলম সালেহী উলিপুরের প্রতিটি মানুষের কথা শুনতে চান। আপনার সমস্যা, পরামর্শ বা মতামত জানাতে নিচের ফর্মটি পূরণ করে রেজিষ্ট্রেশন সম্পূর্ণ করুন।
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-forest/5 dark:bg-forest/10 border border-forest/10 dark:border-forest/20">
                  <div className="w-12 h-12 bg-forest/10 dark:bg-forest/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-forest dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-heading text-navy dark:text-white font-semibold mb-1">ঠিকানা</h4>
                    <p className="font-body text-slate-600 dark:text-slate-300 text-sm">উলিপুর, কুড়িগ্রাম, বাংলাদেশ</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-forest/5 dark:bg-forest/10 border border-forest/10 dark:border-forest/20">
                  <div className="w-12 h-12 bg-forest/10 dark:bg-forest/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-forest dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-heading text-navy dark:text-white font-semibold mb-1">ইমেইল</h4>
                    <p className="font-body text-slate-600 dark:text-slate-300 text-sm">info@mahbubsalehi.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 dark:bg-slate-700 p-8 md:p-10 border border-slate-200 dark:border-slate-600 rounded-lg">
                <h3 className="font-heading text-xl text-navy dark:text-white font-bold mb-6">রেজিষ্ট্রেশন ফর্ম</h3>

                {status === 'success' && (
                  <div data-testid="contact-success" className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 mb-6 rounded-lg">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="font-body text-sm">আপনার রেজিষ্ট্রেশন সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                  </div>
                )}
                {status === 'error' && (
                  <div data-testid="contact-error" className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 mb-6 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="font-body text-sm">রেজিষ্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                        <User className="w-4 h-4 text-forest dark:text-emerald-400" />
                        আপনার নাম *
                      </label>
                      <input
                        type="text"
                        name="name"
                        data-testid="contact-name-input"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors rounded"
                        placeholder="আপনার নাম লিখুন"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                        <Phone className="w-4 h-4 text-forest dark:text-emerald-400" />
                        মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        data-testid="contact-phone-input"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors rounded"
                        placeholder="০১XXXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* Area Selection */}
                  <div>
                    <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                      <MapPin className="w-4 h-4 text-forest dark:text-emerald-400" />
                      এলাকা / ইউনিয়ন *
                    </label>
                    <div className="relative">
                      <select
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors appearance-none cursor-pointer rounded"
                      >
                        <option value="">এলাকা নির্বাচন করুন</option>
                        {AREA_OPTIONS.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Subject Selection */}
                  <div>
                    <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                      <FileText className="w-4 h-4 text-forest dark:text-emerald-400" />
                      বিষয় *
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors appearance-none cursor-pointer rounded"
                      >
                        <option value="">বিষয় নির্বাচন করুন</option>
                        {SUBJECT_OPTIONS.map((subject) => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 font-body text-sm text-navy dark:text-slate-200 font-medium mb-2">
                      <MessageSquare className="w-4 h-4 text-forest dark:text-emerald-400" />
                      আপনার বার্তা / সমস্যার বিবরণ *
                    </label>
                    <textarea
                      name="message"
                      data-testid="contact-message-input"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 font-body text-navy dark:text-white focus:outline-none focus:border-forest dark:focus:border-emerald-400 focus:ring-1 focus:ring-forest dark:focus:ring-emerald-400 transition-colors resize-none rounded"
                      placeholder="আপনার সমস্যা, পরামর্শ বা মতামত বিস্তারিত লিখুন..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    data-testid="contact-submit-btn"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold px-8 py-4 w-full justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:pointer-events-none rounded-lg"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        রেজিষ্ট্রেশন হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        রেজিষ্ট্রেশন সম্পন্ন করুন
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
