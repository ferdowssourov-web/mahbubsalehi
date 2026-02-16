import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Scale, Globe, Users, Flag, Building2, ArrowRight } from 'lucide-react';

const timelineItems = [
  {
    period: 'শৈশব ও প্রাথমিক শিক্ষা',
    icon: GraduationCap,
    details: [
      'উলিপুরের এক ধর্মভীরু মুসলিম পরিবারে জন্ম',
      'কিশোরপুর সরকারি প্রাথমিক বিদ্যালয় থেকে প্রাথমিক শিক্ষা',
      'সাত দরগাহ নেছারীয়া আলীয়া মাদ্রাসা থেকে দাখিল',
    ],
  },
  {
    period: 'উচ্চশিক্ষা',
    icon: GraduationCap,
    details: [
      'রাজশাহী বিশ্ববিদ্যালয়ে স্নাতক',
      'স্টকহোম বিশ্ববিদ্যালয়, সুইডেন থেকে স্নাতকোত্তর',
      'সিটি ইউনিভার্সিটি অব লন্ডন থেকে BPTC ও LPC',
      'লন্ডন সাউথ ব্যাংক ইউনিভার্সিটি থেকে পোস্টগ্র্যাজুয়েট ডিপ্লোমা ইন ল',
      'লিঙ্কনস ইন, যুক্তরাজ্য থেকে ব্যারিস্টার-অ্যাট-ল',
    ],
  },
  {
    period: 'ছাত্র রাজনীতি',
    icon: Users,
    details: [
      'বাংলাদেশ ইসলামী ছাত্রশিবিরে যোগদান',
      'কেন্দ্রীয় কার্যকরী পরিষদ সদস্য',
      'রাজশাহী বিশ্ববিদ্যালয় শাখার সভাপতি',
    ],
  },
  {
    period: 'আন্তর্জাতিক কর্মকাণ্ড',
    icon: Globe,
    details: [
      'দীর্ঘ ১৬ বছর প্রবাস জীবন',
      'যুক্তরাজ্যের সংসদে বক্তব্য প্রদান',
      'ইউরোপীয় ইউনিয়নে বাংলাদেশের পক্ষে কাজ',
      'আন্তর্জাতিক মানবাধিকার সংস্থায় সক্রিয় অংশগ্রহণ',
      'বাংলাদেশ জামায়াতে ইসলামীর ফরেন অ্যাফেয়ার্স টিম (ইউরোপ) এর সদস্য',
    ],
  },
  {
    period: 'জুলাই গণবিপ্লব ও দেশে প্রত্যাবর্তন',
    icon: Flag,
    details: [
      'প্রবাসী বাংলাদেশিদের সংগঠিতকরণ',
      'রেমিট্যান্স বয়কটসহ কর্মসূচি পরিকল্পনা ও বাস্তবায়নে নেতৃত্ব',
      'আন্তর্জাতিক গণমাধ্যম ও কূটনৈতিক মহলে অবস্থান গ্রহণ',
      '২০২৪ সালে দেশে প্রত্যাবর্তন',
    ],
  },
  {
    period: 'বর্তমান কর্মকাণ্ড',
    icon: Building2,
    details: [
      'উলিপুর উন্নয়ন ফোরামের প্রতিষ্ঠাতা ও চেয়ারম্যান',
      'কুড়িগ্রাম-৩ (উলিপুর) সংসদীয় আসনে সংসদ সদস্য পদপ্রার্থী',
      '"সমৃদ্ধ উলিপুর" গড়ার লক্ষ্যে কাজ চলমান',
    ],
  },
];

const BiographyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="biography-page">
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-forest-deep">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">জীবনী</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3 leading-tight">
            ব্যারিস্টার মাহবুবুল<br />আলম সালেহী
          </h1>
          <p className="font-body text-white/70 text-lg mt-4 max-w-xl">
            আন্তর্জাতিক অভিবাসন বিশেষজ্ঞ, মানবাধিকার আইনজীবী ও সমাজসেবক
          </p>
        </div>
      </section>

      {/* Bio content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar image */}
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-full h-full border-2 border-gold/20" />
                  <img
                    src="https://media.bdji.org/images/ms-2.original.format-webp.webp"
                    alt="ব্যারিস্টার সালেহী"
                    className="w-full aspect-[3/4] object-cover relative z-10"
                    data-testid="bio-profile-image"
                  />
                </div>
                <div className="mt-8 p-6 bg-forest/5 border border-forest/10">
                  <h3 className="font-heading text-forest font-bold mb-4">পরিচিতি</h3>
                  <ul className="space-y-3 font-body text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-gold flex-shrink-0" />
                      ব্যারিস্টার-অ্যাট-ল, লিঙ্কনস ইন
                    </li>
                    <li className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gold flex-shrink-0" />
                      আন্তর্জাতিক অভিবাসন বিশেষজ্ঞ
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold flex-shrink-0" />
                      উলিপুর উন্নয়ন ফোরামের চেয়ারম্যান
                    </li>
                    <li className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-gold flex-shrink-0" />
                      কুড়িগ্রাম-৩ সংসদ সদস্য পদপ্রার্থী
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-8">
              <h2 className="font-heading text-3xl md:text-4xl text-navy font-bold mb-4">
                উলিপুরের এক অদম্য সংগ্রামের গল্প
              </h2>
              <div className="w-16 h-1 bg-gold mb-8" />

              <div className="font-body text-slate-600 text-lg leading-relaxed space-y-6 mb-16">
                <p>
                  বাংলাদেশের উত্তর-পূর্ব সীমান্তবর্তী উলিপুর—একটি জনপদ যেখানে বন্যা, খরা ও নদীভাঙনের মতো প্রাকৃতিক দুর্যোগ আজও মানুষের জীবনে স্থায়ী ছাপ রেখে যাচ্ছে। কাঁচা রাস্তা, অপ্রতুল বিদ্যুৎ, মানসম্মত শিক্ষার ঘাটতি—এই বাস্তবতার মাঝেই প্রায় পাঁচ লক্ষ মানুষের সংগ্রামী জীবন। এই জনপদেরই সন্তান ব্যারিস্টার মাহবুবুল আলম সালেহী, যিনি আন্তর্জাতিকভাবে স্বীকৃত আইনজীবী, মানবাধিকার কর্মী ও সমাজসেবক হিসেবে দেশ ও জাতির কল্যাণে নিজেকে নিবেদিত করেছেন।
                </p>
                <p>
                  ছাত্রজীবন থেকেই তিনি দেশ ও ইসলামের পক্ষে কাজ করতে যুক্ত হন বাংলাদেশ ইসলামী ছাত্রশিবিরে এবং রাজশাহী বিশ্ববিদ্যালয় শাখার সভাপতি হিসেবে দায়িত্ব পালন করেন। রাজনৈতিক প্রতিহিংসার শিকার হয়ে একাধিক মিথ্যা মামলায় অভিযুক্ত হন, যার ফলে তিনি বিদেশে উচ্চশিক্ষা গ্রহণে বাধ্য হন।
                </p>
                <p>
                  দীর্ঘ ১৬ বছর প্রবাস জীবন কাটালেও তিনি আন্তর্জাতিক মঞ্চে বাংলাদেশের গণতন্ত্র ও মানবাধিকারের পক্ষে অক্লান্তভাবে কাজ করেছেন। যুক্তরাজ্যের সংসদ, ইউরোপীয় ইউনিয়ন এবং বিভিন্ন আন্তর্জাতিক মানবাধিকার সংস্থায় তাঁর বক্তব্য ও কার্যক্রম বাংলাদেশি প্রবাসী সমাজ ও আন্তর্জাতিক মহলে বিশেষভাবে সমাদৃত হয়েছে।
                </p>
                <p>
                  ২০২৪ সালের ঐতিহাসিক জুলাই গণবিপ্লবের পর দেশে ফিরে এসে তিনি 'সমৃদ্ধ উলিপুর' গড়ার লক্ষ্যে উলিপুর উন্নয়ন ফোরাম প্রতিষ্ঠা করেন।
                </p>
              </div>

              {/* Timeline */}
              <h3 className="font-heading text-2xl text-navy font-bold mb-8">জীবনপথ</h3>
              <div className="space-y-0">
                {timelineItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      data-testid={`timeline-item-${idx}`}
                      className="relative pl-16 pb-12 last:pb-0"
                    >
                      {/* Vertical line */}
                      {idx < timelineItems.length - 1 && (
                        <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-gold to-forest/20" />
                      )}

                      {/* Icon circle */}
                      <div className="absolute left-0 top-0 w-10 h-10 bg-forest rounded-full flex items-center justify-center z-10">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>

                      <h4 className="font-heading text-lg text-forest font-bold mb-3">{item.period}</h4>
                      <ul className="space-y-2">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="font-body text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <div className="mt-16 p-8 bg-forest/5 border-l-4 border-gold relative">
                <p className="font-heading text-lg text-navy italic leading-relaxed">
                  "আমি বিশ্বাস করি, যেখানে মানুষ ন্যায় ও উন্নয়নের পাশে থাকবে, সেখানে সমৃদ্ধি অনিবার্য। উলিপুরের মাটি ও মানুষের টানে ফিরেছি।"
                </p>
                <p className="font-body text-gold font-semibold mt-4">— ব্যারিস্টার মাহবুবুল আলম সালেহী</p>
              </div>

              {/* CTA */}
              <div className="mt-12">
                <Link
                  to="/vision"
                  data-testid="bio-vision-cta"
                  className="inline-flex items-center gap-2 bg-forest hover:bg-forest-deep text-white font-body font-semibold px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  ব্যারিস্টার সালেহীর ভিশন দেখুন
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BiographyPage;
