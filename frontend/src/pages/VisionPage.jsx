import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Shield,
  MapPin,
  Heart,
  Wheat,
  Building2,
  Users,
  ArrowRight,
  Target,
  Download,
} from 'lucide-react';

const visionDetails = [
  {
    id: 1,
    icon: Target,
    title: 'ফাইভ জিরো প্রকল্পের উলিপুর',
    subtitle: 'নিরক্ষরতা, কর্মহীনতা, ক্ষুধা-দারিদ্র্য, গৃহহীনতা, ও চিকিৎসাহীনতা মুক্ত উলিপুর',
    description: 'ব্যারিস্টার মাহবুবুল আলম সালেহী উলিপুরকে একটি আধুনিক, সমৃদ্ধ ও মানবিক জনপদে রূপান্তরের জন্য সুস্পষ্ট ও বাস্তবসম্মত কর্মপরিকল্পনা গ্রহণ করেছেন। তাঁর স্বপ্ন—পাঁচটি বড় সমস্যামুক্ত উলিপুর গড়ে তোলা।',
    color: 'border-forest bg-forest/5',
    iconColor: 'text-forest',
  },
  {
    id: 2,
    icon: GraduationCap,
    title: 'শিক্ষিত ও দক্ষ উলিপুর',
    subtitle: 'মানসম্মত শিক্ষা ও ১০০% সাক্ষরতা',
    description: '"ওয়ান-ফর-অল" প্রকল্পের মাধ্যমে প্রতিটি পরিবারে অন্তত একজন দক্ষ ও কর্মক্ষম সদস্য তৈরির লক্ষ্য। স্থানীয় ও আন্তর্জাতিক শ্রমবাজারের চাহিদা অনুযায়ী কারিগরি শিক্ষা, প্রতিটি ইউনিয়নে ডিজিটাল সুবিধাসম্পন্ন স্মার্ট স্কুল, ফ্রিল্যান্সিং ও আইটি প্রশিক্ষণ কেন্দ্র, গ্লোবাল ট্যালেন্ট প্রোগ্রাম।',
    color: 'border-emerald-500 bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 3,
    icon: Briefcase,
    title: 'কর্মসংস্থান সমৃদ্ধ উলিপুর',
    subtitle: 'এসইই (Skill, Employment, Empowerment) প্রকল্প',
    description: 'প্রতিটি পরিবারে কমপক্ষে একজনের কর্মসংস্থান নিশ্চিত করবে। কৃষি-প্রক্রিয়াকরণ শিল্পে বিপ্লব, ক্ষুদ্র ও মাঝারি শিল্পে পুঁজি, প্রশিক্ষণ ও বাজার সংযোগ, স্থানীয় পণ্যের ব্র্যান্ডিং, নারী পরিচালিত কুটির শিল্প উন্নয়ন, শিল্প পার্ক স্থাপন এবং ক্যারিয়ার হাব গঠন।',
    color: 'border-amber-500 bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 4,
    icon: Shield,
    title: 'দুর্যোগ ব্যবস্থাপনা ও পুনর্বাসন',
    subtitle: 'নদীভাঙন প্রতিরোধ ও জলবায়ু সহনশীলতা',
    description: 'স্থায়ী প্রতিরক্ষা বাঁধ, আধুনিক আশ্রয়কেন্দ্র, নদীভাঙন প্রতিরোধ প্রকল্প, নদী ড্রেজিং, জলবায়ু সহনশীল কৃষি, বৃক্ষরোপণ এবং ত্রাণ, চিকিৎসা ও নিরাপদ পানির ব্যবস্থা নিশ্চিত করার উদ্যোগ।',
    color: 'border-blue-500 bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 5,
    icon: MapPin,
    title: 'আধুনিক সংযোগ ও পর্যটন',
    subtitle: 'উলিপুরকে বাংলাদেশের নতুন পর্যটন কেন্দ্র',
    description: 'উন্নত সড়ক, সেতু, বাঁধ, বিদ্যুৎ, সৌর বিদ্যুৎ, ইন্টারনেট সুবিধা বৃদ্ধি, বাজার ও হাট আধুনিকায়ন, শিক্ষা ও স্বাস্থ্য প্রতিষ্ঠানের উন্নয়ন এবং উলিপুরকে বাংলাদেশের নতুন পর্যটন কেন্দ্র হিসেবে গড়ে তোলার পরিকল্পনা।',
    color: 'border-violet-500 bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    id: 6,
    icon: Wheat,
    title: 'স্মার্ট কৃষি ও সমৃদ্ধ বাজার',
    subtitle: 'আধুনিক প্রযুক্তি ও ন্যায্যমূল্য নিশ্চিতকরণ',
    description: 'স্মার্ট প্রযুক্তি, উন্নত বীজ, কৃষি ক্লিনিক, নদী ও খাল পুনঃখনন, কৃষিপণ্য সংরক্ষণ, ন্যায্যমূল্য নিশ্চিতকরণ এবং কৃষিভিত্তিক শিল্পে বিনিয়োগের মাধ্যমে কৃষকের জীবনমান উন্নয়ন।',
    color: 'border-lime-500 bg-lime-50',
    iconColor: 'text-lime-600',
  },
  {
    id: 7,
    icon: Building2,
    title: 'স্বনির্ভর চর ও অন্তর্ভুক্তিমূলক উন্নয়ন',
    subtitle: 'চরাঞ্চল উন্নয়নে সমন্বিত পরিকল্পনা',
    description: 'শিক্ষা, স্বাস্থ্য, যোগাযোগ, রোড ও নৌপথ সংযোগ, ভ্রাম্যমাণ স্বাস্থ্য ও শিক্ষা ইউনিট, বালি ও খনিজভিত্তিক শিল্প সম্ভাবনা, চরভিত্তিক শিল্প প্রতিষ্ঠান এবং কৃষিভিত্তিক বিকল্প উন্নয়ন।',
    color: 'border-teal-500 bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    id: 8,
    icon: Heart,
    title: 'সুশাসন, উন্নয়ন ও সামাজিক সুরক্ষা',
    subtitle: 'স্বচ্ছতা, ন্যায়বিচার ও দুর্নীতিমুক্ত প্রশাসন',
    description: 'ধর্ম-বর্ণ নির্বিশেষে নিরাপত্তা, স্বচ্ছতা, অংশগ্রহণমূলক প্রশাসন, গণশুনানি, দুর্নীতিবিরোধী কমিটি, নারী-সংখ্যালঘু-প্রতিবন্ধীদের অগ্রাধিকার, সন্ত্রাস ও মাদকমুক্ত এলাকা, জিরো ক্রাইম কমিউনিটি।',
    color: 'border-rose-500 bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

const VisionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="vision-page">
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.bdji.org/images/ms-Slider2.original.jpg"
            alt="সমৃদ্ধ উলিপুর"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest/80 to-forest/50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">আমার ভিশন</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3 leading-tight">
            সমৃদ্ধ উলিপুর
          </h1>
          <p className="font-body text-white/70 text-lg mt-4 max-w-2xl">
            সবার জন্য শিক্ষা, কাজ, বাসস্থান ও স্বাস্থ্য — একটি মানবিক, আধুনিক, এবং আত্মনির্ভর উলিপুর গড়ে তোলাই আমাদের স্বপ্ন।
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <p className="font-body text-slate-600 text-lg leading-relaxed">
            ব্যারিস্টার মাহবুবুল আলম সালেহী মনে করেন স্বাধীনতার ৫৪ বছর পরেও সাম্য, মানবিক মর্যাদা ও ন্যায়বিচার প্রতিষ্ঠার যে প্রতিশ্রুতি পূরণ হয়নি, জুলাইয়ের গণঅভ্যুত্থান সেই অসমাপ্ত প্রতিশ্রুতি বাস্তবায়নের একটি নতুন সুযোগ এনে দিয়েছে। তিনি এসেছেন উলিপুরের প্রতিটি মানুষের মুখে হাসি ফোটাতে, একটি নতুন দিনের স্বপ্ন দেখাতে।
          </p>
        </div>
      </section>

      {/* Vision items */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="space-y-8">
            {visionDetails.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  data-testid={`vision-detail-${idx}`}
                  className={`border-l-4 ${item.color} p-8 md:p-10 transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-sm flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon className={`w-7 h-7 ${item.iconColor}`} />
                    </div>
                    <div>
                      <span className="font-body text-sm text-gold font-semibold uppercase tracking-wider">
                        {item.id < 10 ? `0${item.id}` : item.id}
                      </span>
                      <h3 className="font-heading text-xl md:text-2xl text-navy font-bold mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-forest font-medium text-sm mb-3">{item.subtitle}</p>
                      <p className="font-body text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision images */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="overflow-hidden">
              <img
                src="https://media.bdji.org/images/Asset_1.original.format-webp.webp"
                alt="সমৃদ্ধ উলিপুর পরিকল্পনা"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                data-testid="vision-image-1"
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="https://media.bdji.org/images/unnamed_3.original.format-webp.webp"
                alt="উন্নয়ন পরিকল্পনা"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                data-testid="vision-image-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote & CTA */}
      <section className="py-16 md:py-24 bg-forest">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl text-white font-bold leading-relaxed mb-8 italic">
            "আন্তর্জাতিক অঙ্গনে যে অভিজ্ঞতা ও দৃষ্টিভঙ্গি অর্জন করেছি, তা সম্পূর্ণভাবে কাজে লাগিয়ে উলিপুর থেকে দারিদ্র্য ও অবহেলার গ্লানি মুছে ফেলে সবার জন্য শিক্ষা, যোগাযোগ, উন্নত কৃষি ও বিনিয়োগ, কর্মসংস্থান, নিরাপত্তা এবং ন্যায়বিচারে সমৃদ্ধ একটি আধুনিক উলিপুর গড়ে তুলবো – এটাই আমার জীবনের সর্বশ্রেষ্ঠ অঙ্গীকার।"
          </blockquote>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
          <p className="font-body text-gold text-lg font-medium mb-10">
            — ব্যারিস্টার মাহবুবুল আলম সালেহী
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://mahbubsalehi.com/documents/1/Booklate--Barr-Salehi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="vision-download-pdf"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              পুরো ভিশন ডাউনলোড করুন
            </a>
            <Link
              to="/contact"
              data-testid="vision-contact-cta"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-body font-semibold px-8 py-3.5 transition-all duration-300"
            >
              যোগাযোগ করুন
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VisionPage;
