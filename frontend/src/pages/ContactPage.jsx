import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/contact`, form);
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="contact-page">
      {/* Page Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.bdji.org/images/ms-Slider2.original.jpg"
            alt="যোগাযোগ"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-deep/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">যোগাযোগ</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3">
            যোগাযোগ করুন
          </h1>
          <p className="font-body text-white/70 text-lg mt-4">
            আপনার মতামত, পরামর্শ বা প্রশ্ন আমাদের কাছে পৌঁছে দিন
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-5">
              <h2 className="font-heading text-2xl md:text-3xl text-navy font-bold mb-4">
                আমাদের সাথে যুক্ত হোন
              </h2>
              <div className="w-16 h-1 bg-gold mb-8" />
              <p className="font-body text-slate-600 leading-relaxed mb-10">
                ব্যারিস্টার মাহবুবুল আলম সালেহী উলিপুরের প্রতিটি মানুষের কথা শুনতে চান। আপনার সমস্যা, পরামর্শ বা মতামত জানাতে নিচের ফর্মটি পূরণ করুন অথবা সরাসরি যোগাযোগ করুন।
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-forest/5 border border-forest/10">
                  <div className="w-12 h-12 bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-heading text-navy font-semibold mb-1">ঠিকানা</h4>
                    <p className="font-body text-slate-600 text-sm">উলিপুর, কুড়িগ্রাম, বাংলাদেশ</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-forest/5 border border-forest/10">
                  <div className="w-12 h-12 bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-heading text-navy font-semibold mb-1">ফোন</h4>
                    <p className="font-body text-slate-600 text-sm">+৮৮০ ১XXXXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-forest/5 border border-forest/10">
                  <div className="w-12 h-12 bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-heading text-navy font-semibold mb-1">ইমেইল</h4>
                    <p className="font-body text-slate-600 text-sm">info@mahbubsalehi.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 p-8 md:p-10 border border-slate-200">
                <h3 className="font-heading text-xl text-navy font-bold mb-6">মেসেজ পাঠান</h3>

                {status === 'success' && (
                  <div data-testid="contact-success" className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 mb-6">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="font-body text-sm">আপনার মেসেজ সফলভাবে পাঠানো হয়েছে। ধন্যবাদ!</p>
                  </div>
                )}
                {status === 'error' && (
                  <div data-testid="contact-error" className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 mb-6">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="font-body text-sm">মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-sm text-navy font-medium mb-2">আপনার নাম *</label>
                      <input
                        type="text"
                        name="name"
                        data-testid="contact-name-input"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
                        placeholder="আপনার নাম লিখুন"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm text-navy font-medium mb-2">ফোন নম্বর *</label>
                      <input
                        type="tel"
                        name="phone"
                        data-testid="contact-phone-input"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
                        placeholder="আপনার ফোন নম্বর"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm text-navy font-medium mb-2">ইমেইল</label>
                    <input
                      type="email"
                      name="email"
                      data-testid="contact-email-input"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
                      placeholder="আপনার ইমেইল (ঐচ্ছিক)"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-navy font-medium mb-2">মেসেজ *</label>
                    <textarea
                      name="message"
                      data-testid="contact-message-input"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors resize-none"
                      placeholder="আপনার মেসেজ লিখুন"
                    />
                  </div>
                  <button
                    type="submit"
                    data-testid="contact-submit-btn"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-forest hover:bg-forest-deep text-white font-body font-semibold px-8 py-3.5 w-full md:w-auto justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        পাঠানো হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        মেসেজ পাঠান
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
