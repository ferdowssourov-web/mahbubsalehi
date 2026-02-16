import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Heart,
  Shield,
  MapPin,
  Wheat,
  Building2,
  ArrowRight,
} from 'lucide-react';

const visionItems = [
  {
    icon: GraduationCap,
    title: 'শিক্ষিত ও দক্ষ উলিপুর',
    desc: 'মানসম্মত শিক্ষা ও ১০০% সাক্ষরতা অর্জন, স্মার্ট স্কুল ও আইটি প্রশিক্ষণ কেন্দ্র',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100',
  },
  {
    icon: Briefcase,
    title: 'কর্মসংস্থান সমৃদ্ধ উলিপুর',
    desc: 'কৃষি-প্রক্রিয়াকরণ শিল্প, ক্ষুদ্র ও মাঝারি শিল্প, ক্যারিয়ার হাব গঠন',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100',
  },
  {
    icon: Shield,
    title: 'দুর্যোগ ব্যবস্থাপনা',
    desc: 'স্থায়ী প্রতিরক্ষা বাঁধ, নদীভাঙন প্রতিরোধ, জলবায়ু সহনশীল কৃষি',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    icon: MapPin,
    title: 'আধুনিক সংযোগ ও পর্যটন',
    desc: 'উন্নত সড়ক, সেতু, বিদ্যুৎ, ইন্টারনেট ও পর্যটন কেন্দ্র উন্নয়ন',
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    iconBg: 'bg-violet-100',
  },
  {
    icon: Heart,
    title: 'সুশাসন ও সামাজিক সুরক্ষা',
    desc: 'নিরাপত্তা, স্বচ্ছতা, দুর্নীতিমুক্ত প্রশাসন ও ন্যায়বিচার প্রতিষ্ঠা',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-100',
  },
  {
    icon: Wheat,
    title: 'স্মার্ট কৃষি',
    desc: 'আধুনিক প্রযুক্তি, উন্নত বীজ, কৃষি ক্লিনিক ও ন্যায্যমূল্য নিশ্চিতকরণ',
    color: 'bg-lime-50 text-lime-700 border-lime-200',
    iconBg: 'bg-lime-100',
  },
];

const VisionPreview = () => {
  return (
    <section data-testid="vision-section" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">আমাদের স্বপ্ন</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-bold mt-3">
            সমৃদ্ধ উলিপুর
          </h2>
          <div className="w-16 h-1 bg-gold mt-6 mx-auto" />
          <p className="font-body text-slate-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            সবার জন্য শিক্ষা, কাজ, বাসস্থান ও স্বাস্থ্য — একটি মানবিক, আধুনিক, এবং আত্মনির্ভর উলিপুর গড়ে তোলাই আমাদের স্বপ্ন।
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                data-testid={`vision-card-${idx}`}
                className={`group p-8 border ${item.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default`}
              >
                <div className={`w-14 h-14 ${item.iconBg} rounded-sm flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/vision"
            data-testid="vision-see-all-btn"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-deep text-white font-body font-semibold px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            সম্পূর্ণ ভিশন দেখুন
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export { visionItems };
export default VisionPreview;
