import { useState, useEffect } from 'react';
import { Images } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/api/uploads/')) return `${BACKEND_URL}${url}`;
  return url;
};

const GalleryPage = () => {
  const [localImages, setLocalImages] = useState([]);
  const [internationalImages, setInternationalImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const [localRes, intlRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/gallery?category=local`),
        axios.get(`${BACKEND_URL}/api/gallery?category=international`)
      ]);
      setLocalImages(localRes.data);
      setInternationalImages(intlRes.data);
    } catch (err) {
      console.error('Failed to fetch gallery images', err);
    } finally {
      setLoading(false);
    }
  };

  const ImageGrid = ({ images }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative aspect-square overflow-hidden cursor-pointer group"
          onClick={() => setSelectedImage(image)}
        >
          <img
            src={getImageUrl(image.image_url)}
            alt={image.caption || 'Gallery image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {image.caption && (
              <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-body line-clamp-2">
                {image.caption}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-forest border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-body">লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <section className="bg-forest dark:bg-forest-deep py-12 md:py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Images className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 animate-fade-in-up">
            গ্যালারি
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto animate-fade-in-up delay-100">
            ব্যারিস্টার মাহবুবুল আলম সালেহীর কার্যক্রমের ছবি সংকলন
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Local Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <p className="text-sm font-body text-gold mb-2">উলিপুরের মাটি ও মানুষের সাথে মিশে থাকা নাম</p>
            <h2 className="font-heading text-2xl md:text-3xl text-forest dark:text-emerald-400 font-bold">
              ব্যারিস্টার মাহবুবুল আলম সালেহী
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </div>
          
          {localImages.length > 0 ? (
            <ImageGrid images={localImages} />
          ) : (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500 font-body">
              এই বিভাগে কোনো ছবি নেই
            </div>
          )}
        </section>

        {/* International Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <p className="text-sm font-body text-gold mb-2">আন্তর্জাতিক অঙ্গনে</p>
            <h2 className="font-heading text-2xl md:text-3xl text-forest dark:text-emerald-400 font-bold">
              ব্যারিস্টার মাহবুবুল আলম সালেহী
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </div>
          
          {internationalImages.length > 0 ? (
            <ImageGrid images={internationalImages} />
          ) : (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500 font-body">
              এই বিভাগে কোনো ছবি নেই
            </div>
          )}
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <img
              src={getImageUrl(selectedImage.image_url)}
              alt={selectedImage.caption || 'Gallery image'}
              className="w-full h-full object-contain"
            />
            {selectedImage.caption && (
              <p className="absolute bottom-4 left-4 right-4 text-white text-center font-body bg-black/50 py-2 px-4 rounded">
                {selectedImage.caption}
              </p>
            )}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryPage;
