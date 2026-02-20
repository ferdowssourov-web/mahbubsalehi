import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Target,
  GraduationCap,
  Briefcase,
  Shield,
  MapPin,
  Heart,
  Wheat,
  Building2,
  Scale,
  ShieldCheck,
  ArrowRight,
  Download,
  ChevronRight,
} from 'lucide-react';

export const visionData = [
  {
    id: 1,
    slug: 'five-zero',
    icon: Target,
    title: 'ফাইভ জিরো প্রকল্পের উলিপুর',
    subtitle: 'পাঁচটি সমস্যামুক্ত উলিপুর গড়ে তোলা',
    lightColor: 'bg-gradient-to-br from-forest/10 to-emerald-100 border-forest',
    darkColor: 'dark:bg-gradient-to-br dark:from-forest/30 dark:to-emerald-900/40 dark:border-emerald-600',
    iconBg: 'bg-forest/20 dark:bg-forest/40',
    iconColor: 'text-forest dark:text-emerald-400',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    points: [
      'নিরক্ষরতা মুক্ত উলিপুর',
      'কর্মহীনতা মুক্ত উলিপুর',
      'ক্ষুধা-দারিদ্র্য মুক্ত উলিপুর',
      'গৃহহীনতা মুক্ত উলিপুর',
      'চিকিৎসাহীনতা মুক্ত উলিপুর',
    ],
  },
  {
    id: 2,
    slug: 'education',
    icon: GraduationCap,
    title: 'শিক্ষিত ও দক্ষ উলিপুর',
    subtitle: 'মানসম্মত শিক্ষা ও ১০০% সাক্ষরতা অর্জন, স্মার্ট স্কুল ও আইটি প্রশিক্ষণ কেন্দ্র',
    lightColor: 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-500',
    darkColor: 'dark:bg-gradient-to-br dark:from-emerald-900/30 dark:to-teal-900/40 dark:border-emerald-500',
    iconBg: 'bg-emerald-100 dark:bg-emerald-800/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    points: [
      'মানসম্মত শিক্ষা ও ১০০% সাক্ষরতা নিশ্চিতকরণ',
      "'ওয়ান-ফর-অল' প্রকল্পের মাধ্যমে প্রতিটি পরিবারে অন্তত একজন দক্ষ ও কর্মক্ষম সদস্য গড়ে তোলার জন্য পেশাগত সহায়তা নেটওয়ার্ক তৈরি করা",
      'স্থানীয় ও আন্তর্জাতিক শ্রমবাজারের চাহিদাভিত্তিক কারিগরি শিক্ষা ও দক্ষতা উন্নয়ন',
      "প্রতিটি ইউনিয়নে প্রয়োজনীয় অবকাঠামোসহ ডিজিটাল সুবিধাসম্পন্ন আধুনিক 'স্মার্ট স্কুল' স্থাপন",
      'প্রতিটি ইউনিয়নে ফ্রিল্যান্সিং ও আইটি প্রশিক্ষণ কেন্দ্র স্থাপন করে তরুণদের ডিজিটাল ক্ষমতায়ন',
      "মেধাবী শিক্ষার্থীদের জন্য 'গ্লোবাল ট্যালেন্ট প্রোগ্রাম' ও উচ্চশিক্ষা সহায়তা প্রদানের পাশাপাশি জাতীয় ও আন্তর্জাতিক বৃত্তির তথ্য ও সহায়তা কেন্দ্র স্থাপন",
      'খেলাধুলা, ডিজাইন, স্থাপত্য, আইটি, এবং আন্তর্জাতিক মানের ইসলামিক স্কলার তৈরিতে দক্ষতা গড়ে তোলার উদ্যোগ গ্রহণ',
    ],
  },
  {
    id: 3,
    slug: 'employment',
    icon: Briefcase,
    title: 'কর্মসংস্থান সমৃদ্ধ উলিপুর',
    subtitle: 'কৃষি-প্রক্রিয়াকরণ শিল্প, ক্ষুদ্র ও মাঝারি শিল্প, ক্যারিয়ার হাব গঠন',
    lightColor: 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-500',
    darkColor: 'dark:bg-gradient-to-br dark:from-amber-900/30 dark:to-orange-900/40 dark:border-amber-500',
    iconBg: 'bg-amber-100 dark:bg-amber-800/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    points: [
      'Skill, Employment, Empowerment (SEE) প্রকল্পের মাধ্যমে প্রতিটি পরিবারে কমপক্ষে একজন সদস্যের কর্মসংস্থান সৃষ্টি',
      'কৃষি-প্রক্রিয়াকরণ শিল্পে বিপ্লব আনা এবং ক্ষুদ্র ও মাঝারি শিল্পে পুঁজি, প্রশিক্ষণ ও বাজার সংযোগ',
      "স্থানীয় পণ্যের ব্র্যান্ডিং ও রপ্তানি উপযোগী করে 'এক গ্রাম, এক পণ্য (OVOP)' নীতি বাস্তবায়ন",
      'নারী পরিচালিত কুটির শিল্পে পুঁজি, প্রশিক্ষণ ও বাজার সংযোগের মাধ্যমে ক্ষমতায়ন',
      'পরিকল্পিত মাছচাষ ও নদীকেন্দ্রিক জীবিকা উন্নয়ন প্রকল্প গ্রহণ',
      'সুপরিকল্পিত শিল্প পার্ক স্থাপন এবং বিনিয়োগ আকর্ষণের মাধ্যমে নতুন কর্মসংস্থান সৃষ্টি',
      'দেশি-বিদেশি চাকরি ও উদ্যোক্তা তথ্যের জন্য একটি কেন্দ্রীয় ক্যারিয়ার হাব স্থাপন',
    ],
  },
  {
    id: 4,
    slug: 'disaster',
    icon: Shield,
    title: 'কার্যকর দুর্যোগ ব্যবস্থাপনা ও পুনর্বাসনের উলিপুর',
    subtitle: 'স্থায়ী প্রতিরক্ষা বাঁধ, নদীভাঙন প্রতিরোধ, জলবায়ু সহনশীল কৃষি',
    lightColor: 'bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-500',
    darkColor: 'dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-cyan-900/40 dark:border-blue-500',
    iconBg: 'bg-blue-100 dark:bg-blue-800/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    points: [
      'স্থায়ী ও শক্তিশালী প্রতিরক্ষা বাঁধ নির্মাণ',
      'আধুনিক ঘূর্ণিঝড় ও বন্যা আশ্রয়কেন্দ্র নির্মাণ',
      'নদীভাঙন প্রতিরোধে বিজ্ঞানভিত্তিক প্রকল্প',
      'নদী ড্রেজিং কার্যক্রম বাস্তবায়ন',
      'জলবায়ু সহনশীল কৃষি ও সবুজ প্রযুক্তি সম্প্রসারণ',
      'রাস্তা ও গ্রামে পরিকল্পিত বৃক্ষরোপণ',
      'দুর্যোগকালে ত্রাণ, চিকিৎসা ও নিরাপদ পানির ব্যবস্থা',
    ],
  },
  {
    id: 5,
    slug: 'connectivity',
    icon: MapPin,
    title: 'আধুনিক সংযোগ ও পর্যটন',
    subtitle: 'উন্নত সড়ক, সেতু, বিদ্যুৎ, ইন্টারনেট ও পর্যটন কেন্দ্র উন্নয়ন',
    lightColor: 'bg-gradient-to-br from-violet-50 to-purple-100 border-violet-500',
    darkColor: 'dark:bg-gradient-to-br dark:from-violet-900/30 dark:to-purple-900/40 dark:border-violet-500',
    iconBg: 'bg-violet-100 dark:bg-violet-800/50',
    iconColor: 'text-violet-600 dark:text-violet-400',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    points: [
      'উন্নত সড়ক, সেতু ও বাঁধ নির্মাণ',
      'বিদ্যুৎ, সৌর বিদ্যুৎ ও ইন্টারনেট সুবিধা বৃদ্ধি',
      'স্থানীয় বাজার ও হাট আধুনিকায়ন',
      'শিক্ষা ও স্বাস্থ্য প্রতিষ্ঠানের অবকাঠামো উন্নয়ন',
      'আধুনিক যোগাযোগ নেটওয়ার্কে জাতীয় মূলধারায় সংযুক্তকরণ',
      'উলিপুরকে বাংলাদেশের নতুন পর্যটন কেন্দ্র হিসেবে গড়ে তোলা',
    ],
  },
  {
    id: 6,
    slug: 'health',
    icon: Heart,
    title: 'স্বাস্থ্যকর ও সুরক্ষিত উলিপুর',
    subtitle: 'মোবাইল স্বাস্থ্য ইউনিট, হাসপাতাল আধুনিকীকরণ, সামাজিক সুরক্ষা',
    lightColor: 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-500',
    darkColor: 'dark:bg-gradient-to-br dark:from-rose-900/30 dark:to-pink-900/40 dark:border-rose-500',
    iconBg: 'bg-rose-100 dark:bg-rose-800/50',
    iconColor: 'text-rose-600 dark:text-rose-400',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
    points: [
      'মোবাইল স্বাস্থ্য ইউনিটে চর ও দুর্গম এলাকায় প্রাথমিক চিকিৎসা',
      'সরকারি হাসপাতাল আধুনিকীকরণ ও সেবার মান উন্নয়ন',
      "'গ্রাম ক্লিনিক থেকে স্পেশালিস্ট' রেফারেল সিস্টেম",
      'প্রতিটি ওয়ার্ডে হেলথ ভলান্টিয়ার নিয়োগ',
      'মডেল গ্রাম প্রকল্পে শিক্ষা, স্বাস্থ্য, বাসস্থান ও পয়ঃনিষ্কাশন নিশ্চিতকরণ',
      'বিধবা, প্রতিবন্ধী ও প্রবীণদের জন্য ভাতা ও সহায়তা নিশ্চিত করা',
      'ফায়ার সার্ভিস ও অ্যাম্বুলেন্স সেবা বৃদ্ধি',
    ],
  },
  {
    id: 7,
    slug: 'agriculture',
    icon: Wheat,
    title: 'স্মার্ট কৃষি ও সমৃদ্ধ বাজার',
    subtitle: 'আধুনিক প্রযুক্তি, উন্নত বীজ, কৃষি ক্লিনিক ও ন্যায্যমূল্য নিশ্চিতকরণ',
    lightColor: 'bg-gradient-to-br from-lime-50 to-green-100 border-lime-500',
    darkColor: 'dark:bg-gradient-to-br dark:from-lime-900/30 dark:to-green-900/40 dark:border-lime-500',
    iconBg: 'bg-lime-100 dark:bg-lime-800/50',
    iconColor: 'text-lime-600 dark:text-lime-400',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    points: [
      'স্মার্ট কৃষি প্রযুক্তি, প্রশিক্ষণ ও যন্ত্রপাতি সরবরাহ',
      'উন্নত বীজ ও নার্সারি সুবিধা',
      'মাসিক কৃষি ক্লিনিকে বিশেষজ্ঞ পরামর্শ',
      'নদী ও খাল পুনঃখনন মাধ্যমে সেচ উন্নয়ন',
      'কৃষিপণ্য সংরক্ষণ ও বাজার সংযোগ',
      'সহজ বিপণন ব্যবস্থা ও ন্যায্যমূল্য নিশ্চিতকরণ',
      'কৃষিভিত্তিক শিল্পে বিনিয়োগের মাধ্যমে জীবনমান উন্নয়ন',
    ],
  },
  {
    id: 8,
    slug: 'char-development',
    icon: Building2,
    title: 'স্বনির্ভর চর ও অন্তর্ভুক্তিমূলক উন্নয়ন',
    subtitle: 'তিস্তা চুক্তি বাস্তবায়ন, চর এলাকায় শিক্ষা-স্বাস্থ্য-যোগাযোগ উন্নয়ন',
    color: 'bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-500',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    points: [
      "'তিস্তা চুক্তি বাস্তবায়ন' আন্দোলনের মাধ্যমে সফল করে উলিপুরের কৃষি সমৃদ্ধি, কর্মসংস্থান সৃষ্টি, দারিদ্র্য বিমোচন, ভূগর্ভস্থ পানির সুরক্ষা ও পানির সংকট হ্রাস এবং পরিবেশগত ভারসাম্য ফিরিয়ে আনা",
      'চর এলাকায় শিক্ষা, স্বাস্থ্য ও যোগাযোগ উন্নয়ন',
      'রোড, নৌপথ ও বাজার সংযোগ স্থাপন',
      'ভ্রাম্যমাণ স্বাস্থ্য ও শিক্ষা ইউনিট চালু',
      'খনিজ ও বালিভিত্তিক শিল্প সম্ভাবনা গবেষণা',
      'ফাইভ জিরো ও এসইই প্রকল্প অগ্রাধিকার',
      'চরভিত্তিক মাঝারি ও ক্ষুদ্র শিল্প প্রতিষ্ঠা',
      'চরাঞ্চলে কৃষিভিত্তিক বিকল্প উন্নয়ন বাস্তবায়ন',
    ],
  },
  {
    id: 9,
    slug: 'governance',
    icon: Scale,
    title: 'সুশাসন, স্বচ্ছতা ও ন্যায়ভিত্তিক উলিপুর',
    subtitle: 'দুর্নীতিমুক্ত প্রশাসন, স্বচ্ছ সেবা ও সমান সুযোগ',
    color: 'bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-500',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    points: [
      'চাঁদাবাজি ও রাজনৈতিক টোল সংস্কৃতি নির্মূল',
      'অবৈধ দখলদার উচ্ছেদ ও জনসম্পদ রক্ষা',
      'দুর্নীতিমুক্ত, জবাবদিহিমূলক ও স্বচ্ছ সেবাব্যবস্থা',
      'সরকারি সেবায় উন্নতি ও প্রত্যাশিত মান নিশ্চিতকরণ',
      'নৈতিকতা ও অংশগ্রহণে সুশাসন',
      'দুর্নীতিমুক্ত ডিজিটাল স্থানীয় সরকার',
      'সাম্য, ন্যায় ও মানবিক মর্যাদায় উজ্জীবিত সমাজ',
      'নারী, সংখ্যালঘু ও প্রতিবন্ধীদের অগ্রাধিকার',
      'বিনিয়োগে দারিদ্র্য বিমোচন ও সমান সুযোগ',
    ],
  },
  {
    id: 10,
    slug: 'safety',
    icon: ShieldCheck,
    title: 'নিরাপদ ও সহিংসতামুক্ত উলিপুর',
    subtitle: 'শান্তিপূর্ণ সমাজ, মাদকমুক্ত এলাকা ও জিরো ক্রাইম কমিউনিটি',
    color: 'bg-gradient-to-br from-red-50 to-orange-100 border-red-400',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
    points: [
      'সহিংসতা ও সন্ত্রাসমুক্ত শান্তিপূর্ণ সমাজ গঠন',
      'সন্ত্রাস ও মাদকমুক্ত এলাকা গঠন',
      "'জিরো ক্রাইম কমিউনিটি' (অপরাধ দমনে সিসিটিভি নজরদারি এবং কমিউনিটি প্যাট্রোল টিমের মাধ্যমে)",
    ],
  },
];

const VisionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (slug) => {
    navigate(`/vision/${slug}`);
  };

  return (
    <main data-testid="vision-page" className="bg-slate-50 dark:bg-slate-900">
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-forest-deep">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
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
      <section className="py-16 md:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <p className="font-body text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            ব্যারিস্টার মাহবুবুল আলম সালেহী মনে করেন স্বাধীনতার ৫৪ বছর পরেও সাম্য, মানবিক মর্যাদা ও ন্যায়বিচার প্রতিষ্ঠার যে প্রতিশ্রুতি পূরণ হয়নি, জুলাইয়ের গণঅভ্যুত্থান সেই অসমাপ্ত প্রতিশ্রুতি বাস্তবায়নের একটি নতুন সুযোগ এনে দিয়েছে। তিনি এসেছেন উলিপুরের প্রতিটি মানুষের মুখে হাসি ফোটাতে, একটি নতুন দিনের স্বপ্ন দেখাতে।
          </p>
        </div>
      </section>

      {/* Vision Cards Grid */}
      <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-navy dark:text-white font-bold mb-4">
              ১০ দফা উন্নয়ন পরিকল্পনা
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visionData.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.slug)}
                  className={`${item.color} border-l-4 p-6 md:p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${item.iconBg} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-body text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">
                          {item.id < 10 ? `০${item.id}` : `${item.id}`}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg md:text-xl text-navy dark:text-slate-800 font-bold mb-2 group-hover:text-forest transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-slate-600 dark:text-slate-700 text-sm leading-relaxed">
                        {item.subtitle}
                      </p>
                      <div className="flex items-center gap-1 mt-4 text-forest font-body text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>বিস্তারিত দেখুন</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision images */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://media.bdji.org/images/Asset_1.original.format-webp.webp"
                alt="সমৃদ্ধ উলিপুর পরিকল্পনা"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                data-testid="vision-image-1"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
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
