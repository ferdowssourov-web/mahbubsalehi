import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale, LogOut, Plus, Pencil, Trash2, Eye, EyeOff,
  Newspaper, MessageSquare, X, Save, AlertCircle, CheckCircle,
  Upload, Image as ImageIcon, Loader2, GripVertical, Users, Star, Check, XCircle, Images,
  CalendarCheck, Clock, CheckCircle2, XOctagon, MapPin, Timer, Power, Calendar, Download
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
});

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/api/uploads/')) return `${BACKEND_URL}${url}`;
  return url;
};

// ====== Image Uploader Component ======
const ImageUploader = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('admin_token');
      const res = await axios.post(`${API}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      onChange(res.data.url);
    } catch (e) {
      console.error('Upload failed', e);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleUpload(file);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setUrlMode(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  // If there's already an image
  if (value) {
    return (
      <div data-testid="image-uploader-preview" className="space-y-3">
        <label className="block font-body text-sm text-navy font-medium mb-2">কভার ছবি</label>
        <div className="relative group border border-slate-200 bg-slate-50 overflow-hidden">
          <img
            src={getImageUrl(value)}
            alt="Preview"
            className="w-full h-56 object-cover"
            onError={(e) => { e.target.src = ''; e.target.className = 'w-full h-56 bg-slate-100'; }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white text-navy font-body text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              পরিবর্তন করুন
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 text-white font-body text-sm font-medium hover:bg-red-600 transition-colors"
            >
              মুছুন
            </button>
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block font-body text-sm text-navy font-medium">কভার ছবি</label>

      {!urlMode ? (
        <>
          {/* Drag & Drop area */}
          <div
            data-testid="image-upload-dropzone"
            className={`relative border-2 border-dashed rounded-sm transition-all duration-300 cursor-pointer ${
              dragOver ? 'border-gold bg-gold/5' : 'border-slate-300 hover:border-forest/40 hover:bg-forest/[0.02]'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center py-10 px-4">
              {uploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-forest animate-spin mb-3" />
                  <p className="font-body text-sm text-slate-500">আপলোড হচ্ছে...</p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 bg-forest/5 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6 text-forest" />
                  </div>
                  <p className="font-body text-sm text-navy font-medium mb-1">ছবি আপলোড করুন</p>
                  <p className="font-body text-xs text-slate-400 mb-3">ড্র্যাগ অ্যান্ড ড্রপ করুন অথবা ক্লিক করুন</p>
                  <p className="font-body text-xs text-slate-400">JPG, PNG, WebP, GIF (সর্বোচ্চ 10MB)</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
              onChange={handleFileChange}
              className="hidden"
              data-testid="image-file-input"
            />
          </div>

          {/* URL option */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <button
              type="button"
              onClick={() => setUrlMode(true)}
              className="font-body text-xs text-slate-400 hover:text-forest transition-colors"
              data-testid="switch-to-url-btn"
            >
              অথবা URL দিন
            </button>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
        </>
      ) : (
        <>
          {/* URL input mode */}
          <div className="flex gap-2" data-testid="image-url-input-group">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 focus-within:border-forest focus-within:ring-1 focus-within:ring-forest transition-colors">
              <ImageIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlSubmit())}
                className="w-full bg-transparent font-body text-navy text-sm focus:outline-none"
                placeholder="https://example.com/image.jpg"
                data-testid="image-url-input"
              />
            </div>
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 bg-forest text-white font-body text-sm font-medium hover:bg-forest-deep transition-colors"
            >
              যোগ করুন
            </button>
            <button
              type="button"
              onClick={() => setUrlMode(false)}
              className="px-3 border border-slate-300 text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};


// ====== Main Dashboard Component ======
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('activities');
  const [activities, setActivities] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [opinions, setOpinions] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [countdown, setCountdown] = useState({ is_active: false, target_date: '', title: 'তারুণ্যের মুখোমুখির পরবর্তী সময়' });
  const [showForm, setShowForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', image_url: '', content: '', date: '', is_published: true });
  const [galleryForm, setGalleryForm] = useState({ image_url: '', caption: '', category: 'local' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCountdown = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/countdown`);
      setCountdown(res.data);
    } catch (err) {
      console.error('Failed to fetch countdown', err);
    }
  }, []);

  const fetchActivities = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/activities?published_only=false`, getAuthHeaders());
      setActivities(res.data);
    } catch (err) {
      if (err.response?.status === 401) { navigate('/admin'); return; }
    }
  }, [navigate]);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/admin/contacts`, getAuthHeaders());
      setContacts(res.data);
    } catch (err) {
      if (err.response?.status === 401) { navigate('/admin'); return; }
    }
  }, [navigate]);

  const fetchOpinions = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/admin/opinions`, getAuthHeaders());
      setOpinions(res.data);
    } catch (err) {
      if (err.response?.status === 401) { navigate('/admin'); return; }
    }
  }, [navigate]);

  const fetchGallery = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/admin/gallery`, getAuthHeaders());
      setGalleryImages(res.data);
    } catch (err) {
      if (err.response?.status === 401) { navigate('/admin'); return; }
    }
  }, [navigate]);

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/admin/registrations`, getAuthHeaders());
      setRegistrations(res.data);
    } catch (err) {
      if (err.response?.status === 401) { navigate('/admin'); return; }
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/admin'); return; }
    fetchActivities();
    fetchContacts();
    fetchOpinions();
    fetchGallery();
    fetchRegistrations();
    fetchCountdown();
  }, [fetchActivities, fetchContacts, fetchOpinions, fetchGallery, fetchRegistrations, fetchCountdown, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin');
  };

  // Countdown management
  const updateCountdown = async (updates) => {
    try {
      const res = await axios.put(`${API}/admin/countdown`, updates, getAuthHeaders());
      setCountdown(res.data);
      showToast('success', 'কাউন্টডাউন আপডেট হয়েছে');
    } catch {
      showToast('error', 'আপডেট করতে সমস্যা হয়েছে');
    }
  };

  const toggleCountdown = () => {
    updateCountdown({ is_active: !countdown.is_active });
  };

  const resetForm = () => {
    setForm({ title: '', category: '', image_url: '', content: '', date: '', is_published: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (activity) => {
    setForm({
      title: activity.title,
      category: activity.category,
      image_url: activity.image_url || '',
      content: activity.content || '',
      date: activity.date || '',
      is_published: activity.is_published,
    });
    setEditingId(activity.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API}/activities/${editingId}`, form, getAuthHeaders());
        showToast('success', 'পোস্ট আপডেট হয়েছে');
      } else {
        await axios.post(`${API}/activities`, form, getAuthHeaders());
        showToast('success', 'নতুন পোস্ট তৈরি হয়েছে');
      }
      resetForm();
      fetchActivities();
    } catch {
      showToast('error', 'কিছু একটা সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই পোস্ট মুছে ফেলতে চান?')) return;
    try {
      await axios.delete(`${API}/activities/${id}`, getAuthHeaders());
      showToast('success', 'পোস্ট মুছে ফেলা হয়েছে');
      fetchActivities();
    } catch {
      showToast('error', 'মুছে ফেলতে সমস্যা হয়েছে');
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`${API}/admin/contacts/${id}`, getAuthHeaders());
      showToast('success', 'মেসেজ মুছে ফেলা হয়েছে');
      fetchContacts();
    } catch {
      showToast('error', 'মুছে ফেলতে সমস্যা হয়েছে');
    }
  };

  const togglePublish = async (activity) => {
    try {
      await axios.put(`${API}/activities/${activity.id}`, { is_published: !activity.is_published }, getAuthHeaders());
      fetchActivities();
      showToast('success', activity.is_published ? 'আনপাবলিশ হয়েছে' : 'পাবলিশ হয়েছে');
    } catch {
      showToast('error', 'সমস্যা হয়েছে');
    }
  };

  // Opinion management functions
  const toggleOpinionApproval = async (opinion) => {
    try {
      await axios.put(`${API}/admin/opinions/${opinion.id}`, { is_approved: !opinion.is_approved }, getAuthHeaders());
      fetchOpinions();
      showToast('success', opinion.is_approved ? 'অনুমোদন বাতিল হয়েছে' : 'অনুমোদন হয়েছে');
    } catch {
      showToast('error', 'সমস্যা হয়েছে');
    }
  };

  const handleDeleteOpinion = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই মতামত মুছে ফেলতে চান?')) return;
    try {
      await axios.delete(`${API}/admin/opinions/${id}`, getAuthHeaders());
      showToast('success', 'মতামত মুছে ফেলা হয়েছে');
      fetchOpinions();
    } catch {
      showToast('error', 'মুছে ফেলতে সমস্যা হয়েছে');
    }
  };

  // Gallery management functions
  const resetGalleryForm = () => {
    setGalleryForm({ image_url: '', caption: '', category: 'local' });
    setShowGalleryForm(false);
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.image_url) {
      showToast('error', 'ছবি আপলোড করুন');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/admin/gallery`, galleryForm, getAuthHeaders());
      showToast('success', 'ছবি যোগ করা হয়েছে');
      resetGalleryForm();
      fetchGallery();
    } catch {
      showToast('error', 'ছবি যোগ করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই ছবি মুছে ফেলতে চান?')) return;
    try {
      await axios.delete(`${API}/admin/gallery/${id}`, getAuthHeaders());
      showToast('success', 'ছবি মুছে ফেলা হয়েছে');
      fetchGallery();
    } catch {
      showToast('error', 'মুছে ফেলতে সমস্যা হয়েছে');
    }
  };

  // Registration management functions
  const updateRegistrationStatus = async (id, status) => {
    try {
      await axios.put(`${API}/admin/registrations/${id}`, { status }, getAuthHeaders());
      fetchRegistrations();
      showToast('success', 'স্ট্যাটাস আপডেট হয়েছে');
    } catch {
      showToast('error', 'আপডেট করতে সমস্যা হয়েছে');
    }
  };

  const handleDeleteRegistration = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই রেজিষ্ট্রেশন মুছে ফেলতে চান?')) return;
    try {
      await axios.delete(`${API}/admin/registrations/${id}`, getAuthHeaders());
      showToast('success', 'রেজিষ্ট্রেশন মুছে ফেলা হয়েছে');
      fetchRegistrations();
    } catch {
      showToast('error', 'মুছে ফেলতে সমস্যা হয়েছে');
    }
  };

  const handleDownloadRegistrationsExcel = async () => {
    try {
      showToast('info', 'ডাউনলোড শুরু হচ্ছে...');
      const response = await axios.get(`${API}/admin/registrations/export/excel`, {
        ...getAuthHeaders(),
        responseType: 'blob'
      });
      
      // Create blob URL and trigger download
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `registrations_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showToast('success', 'ফাইল ডাউনলোড সম্পন্ন হয়েছে');
    } catch (error) {
      console.error('Download error:', error);
      showToast('error', 'ডাউনলোড করতে সমস্যা হয়েছে');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-amber-100 text-amber-700', icon: Clock, label: 'অপেক্ষমান' },
      approved: { bg: 'bg-blue-100 text-blue-700', icon: CheckCircle2, label: 'অনুমোদিত' },
      completed: { bg: 'bg-emerald-100 text-emerald-700', icon: Check, label: 'সম্পন্ন' },
      cancelled: { bg: 'bg-red-100 text-red-700', icon: XOctagon, label: 'বাতিল' },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-body font-medium rounded ${config.bg}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const approvedOpinions = opinions.filter(o => o.is_approved);
  const pendingOpinions = opinions.filter(o => !o.is_approved);
  const pendingRegistrations = registrations.filter(r => r.status === 'pending');
  const approvedRegistrations = registrations.filter(r => r.status === 'approved');
  const completedRegistrations = registrations.filter(r => r.status === 'completed');
  const localGallery = galleryImages.filter(img => img.category === 'local');
  const internationalGallery = galleryImages.filter(img => img.category === 'international');

  return (
    <main data-testid="admin-dashboard" className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-5 py-3 shadow-lg font-body text-sm animate-fade-in ${
          toast.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      {/* Top bar */}
      <header className="bg-forest-deep border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-gold" />
            <span className="font-heading text-white font-bold text-lg hidden sm:block">অ্যাডমিন প্যানেল</span>
          </div>
          <button
            onClick={handleLogout}
            data-testid="admin-logout-btn"
            className="flex items-center gap-2 text-white/60 hover:text-white font-body text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            লগআউট
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            data-testid="tab-activities"
            onClick={() => setActiveTab('activities')}
            className={`flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all ${
              activeTab === 'activities' ? 'bg-forest text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            কার্যক্রম ({activities.length})
          </button>
          <button
            data-testid="tab-contacts"
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all ${
              activeTab === 'contacts' ? 'bg-forest text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            মেসেজ ({contacts.length})
          </button>
          <button
            data-testid="tab-opinions"
            onClick={() => setActiveTab('opinions')}
            className={`flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all ${
              activeTab === 'opinions' ? 'bg-forest text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            জনমত ({opinions.length})
            {pendingOpinions.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-gold text-white text-xs rounded-full">{pendingOpinions.length}</span>
            )}
          </button>
          <button
            data-testid="tab-gallery"
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all ${
              activeTab === 'gallery' ? 'bg-forest text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Images className="w-4 h-4" />
            গ্যালারি ({galleryImages.length})
          </button>
          <button
            data-testid="tab-registrations"
            onClick={() => setActiveTab('registrations')}
            className={`flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all ${
              activeTab === 'registrations' ? 'bg-forest text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            সাক্ষাৎ ({registrations.length})
            {pendingRegistrations.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-gold text-white text-xs rounded-full">{pendingRegistrations.length}</span>
            )}
          </button>
          <button
            data-testid="tab-countdown"
            onClick={() => setActiveTab('countdown')}
            className={`flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all ${
              activeTab === 'countdown' ? 'bg-forest text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Timer className="w-4 h-4" />
            কাউন্টডাউন
            {countdown.is_active && (
              <span className="ml-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-navy font-bold">কার্যক্রম পরিচালনা</h2>
              <button
                data-testid="new-post-btn"
                onClick={() => { resetForm(); setShowForm(true); }}
                className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold px-5 py-2.5 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                নতুন পোস্ট
              </button>
            </div>

            {/* Create/Edit Form */}
            {showForm && (
              <div data-testid="activity-form" className="bg-white border border-slate-200 p-6 md:p-8 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl text-navy font-bold">
                    {editingId ? 'পোস্ট সম্পাদনা' : 'নতুন পোস্ট তৈরি'}
                  </h3>
                  <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image uploader - full width at top like pro blog */}
                  <ImageUploader
                    value={form.image_url}
                    onChange={(url) => setForm({ ...form, image_url: url })}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-sm text-navy font-medium mb-2">শিরোনাম *</label>
                      <input
                        type="text"
                        data-testid="form-title-input"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
                        placeholder="পোস্টের শিরোনাম"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm text-navy font-medium mb-2">ক্যাটাগরি *</label>
                      <input
                        type="text"
                        data-testid="form-category-input"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
                        placeholder="যেমন: রাজনীতি, কার্যক্রম, সভা"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm text-navy font-medium mb-2">তারিখ</label>
                    <input
                      type="text"
                      data-testid="form-date-input"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full md:w-1/2 px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
                      placeholder="যেমন: জানুয়ারি ২০২৫"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm text-navy font-medium mb-2">বিস্তারিত</label>
                    <textarea
                      data-testid="form-content-input"
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors resize-y leading-relaxed"
                      placeholder="পোস্টের বিস্তারিত বিবরণ লিখুন...

আপনি এখানে একাধিক প্যারাগ্রাফ লিখতে পারেন। নতুন লাইনে যেতে Enter চাপুন।"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        data-testid="form-published-checkbox"
                        checked={form.is_published}
                        onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                        className="w-4 h-4 accent-forest"
                      />
                      <span className="font-body text-sm text-navy">সরাসরি পাবলিশ করুন</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2 border-t border-slate-100">
                    <button
                      type="submit"
                      data-testid="form-submit-btn"
                      disabled={loading}
                      className="flex items-center gap-2 bg-forest hover:bg-forest-deep text-white font-body font-semibold px-6 py-3 transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {editingId ? 'আপডেট করুন' : 'পোস্ট করুন'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-slate-300 text-slate-600 font-body font-medium hover:bg-slate-50 transition-colors"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Activities list */}
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  data-testid={`activity-row-${activity.id}`}
                  className="bg-white border border-slate-200 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  {/* Thumbnail */}
                  {activity.image_url ? (
                    <div className="w-20 h-16 flex-shrink-0 overflow-hidden bg-slate-100">
                      <img src={getImageUrl(activity.image_url)} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-16 flex-shrink-0 bg-slate-100 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-slate-300" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-base text-navy font-semibold truncate">{activity.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-body px-2 py-0.5 bg-gold/10 text-gold font-medium">{activity.category}</span>
                      <span className="text-xs font-body text-slate-400">{activity.date}</span>
                      <span className={`text-xs font-body flex items-center gap-1 ${activity.is_published ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {activity.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {activity.is_published ? 'পাবলিশড' : 'ড্রাফট'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      data-testid={`toggle-publish-${activity.id}`}
                      onClick={() => togglePublish(activity)}
                      className={`p-2 rounded-sm transition-colors ${activity.is_published ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-100'}`}
                      title={activity.is_published ? 'আনপাবলিশ' : 'পাবলিশ'}
                    >
                      {activity.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      data-testid={`edit-activity-${activity.id}`}
                      onClick={() => handleEdit(activity)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-sm transition-colors"
                      title="সম্পাদনা"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      data-testid={`delete-activity-${activity.id}`}
                      onClick={() => handleDelete(activity.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {activities.length === 0 && (
                <div className="text-center py-16 text-slate-400 font-body">
                  কোনো কার্যক্রম নেই। উপরের "নতুন পোস্ট" বাটনে ক্লিক করুন।
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <h2 className="font-heading text-2xl text-navy font-bold mb-6">মেসেজ সমূহ</h2>
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  data-testid={`contact-row-${contact.id}`}
                  className="bg-white border border-slate-200 p-5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-heading text-base text-navy font-semibold">{contact.name}</h4>
                        <span className="text-xs font-body text-slate-400">{contact.phone}</span>
                        {contact.email && <span className="text-xs font-body text-slate-400">{contact.email}</span>}
                      </div>
                      <p className="font-body text-slate-600 text-sm">{contact.message}</p>
                      <p className="font-body text-xs text-slate-400 mt-2">{new Date(contact.created_at).toLocaleString('bn-BD')}</p>
                    </div>
                    <button
                      data-testid={`delete-contact-${contact.id}`}
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {contacts.length === 0 && (
                <div className="text-center py-16 text-slate-400 font-body">
                  কোনো মেসেজ নেই।
                </div>
              )}
            </div>
          </div>
        )}

        {/* Opinions Tab */}
        {activeTab === 'opinions' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-navy font-bold">জনতার মতামত</h2>
              <div className="flex items-center gap-4 text-sm font-body">
                <span className="flex items-center gap-1 text-emerald-600">
                  <Check className="w-4 h-4" /> অনুমোদিত: {approvedOpinions.length}
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  <AlertCircle className="w-4 h-4" /> অপেক্ষমান: {pendingOpinions.length}
                </span>
              </div>
            </div>

            {/* Pending opinions first */}
            {pendingOpinions.length > 0 && (
              <div className="mb-8">
                <h3 className="font-body text-sm font-semibold text-amber-600 mb-3 uppercase tracking-wide">
                  অনুমোদনের অপেক্ষায় ({pendingOpinions.length})
                </h3>
                <div className="space-y-3">
                  {pendingOpinions.map((opinion) => (
                    <div
                      key={opinion.id}
                      data-testid={`opinion-row-${opinion.id}`}
                      className="bg-amber-50 border border-amber-200 p-5 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h4 className="font-heading text-base text-navy font-semibold">{opinion.name}</h4>
                            <span className="text-xs font-body text-slate-500">{opinion.phone}</span>
                            {opinion.area && (
                              <span className="text-xs font-body px-2 py-0.5 bg-slate-100 text-slate-600">{opinion.area}</span>
                            )}
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${star <= opinion.rating ? 'text-gold fill-gold' : 'text-slate-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="font-body text-slate-700 text-sm leading-relaxed">{opinion.opinion}</p>
                          <p className="font-body text-xs text-slate-400 mt-2">
                            {new Date(opinion.created_at).toLocaleString('bn-BD')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            data-testid={`approve-opinion-${opinion.id}`}
                            onClick={() => toggleOpinionApproval(opinion)}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-sm transition-colors"
                            title="অনুমোদন করুন"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            data-testid={`delete-opinion-${opinion.id}`}
                            onClick={() => handleDeleteOpinion(opinion.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                            title="মুছুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved opinions */}
            {approvedOpinions.length > 0 && (
              <div>
                <h3 className="font-body text-sm font-semibold text-emerald-600 mb-3 uppercase tracking-wide">
                  অনুমোদিত মতামত ({approvedOpinions.length})
                </h3>
                <div className="space-y-3">
                  {approvedOpinions.map((opinion) => (
                    <div
                      key={opinion.id}
                      data-testid={`opinion-row-${opinion.id}`}
                      className="bg-white border border-slate-200 p-5 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h4 className="font-heading text-base text-navy font-semibold">{opinion.name}</h4>
                            <span className="text-xs font-body text-slate-500">{opinion.phone}</span>
                            {opinion.area && (
                              <span className="text-xs font-body px-2 py-0.5 bg-slate-100 text-slate-600">{opinion.area}</span>
                            )}
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${star <= opinion.rating ? 'text-gold fill-gold' : 'text-slate-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-body px-2 py-0.5 bg-emerald-100 text-emerald-700 flex items-center gap-1">
                              <Check className="w-3 h-3" /> অনুমোদিত
                            </span>
                          </div>
                          <p className="font-body text-slate-700 text-sm leading-relaxed">{opinion.opinion}</p>
                          <p className="font-body text-xs text-slate-400 mt-2">
                            {new Date(opinion.created_at).toLocaleString('bn-BD')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            data-testid={`unapprove-opinion-${opinion.id}`}
                            onClick={() => toggleOpinionApproval(opinion)}
                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-sm transition-colors"
                            title="অনুমোদন বাতিল"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            data-testid={`delete-opinion-${opinion.id}`}
                            onClick={() => handleDeleteOpinion(opinion.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                            title="মুছুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {opinions.length === 0 && (
              <div className="text-center py-16 text-slate-400 font-body">
                কোনো মতামত নেই।
              </div>
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-navy font-bold">গ্যালারি পরিচালনা</h2>
              <button
                data-testid="new-gallery-btn"
                onClick={() => { resetGalleryForm(); setShowGalleryForm(true); }}
                className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold px-5 py-2.5 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                নতুন ছবি
              </button>
            </div>

            {/* Add Image Form */}
            {showGalleryForm && (
              <div data-testid="gallery-form" className="bg-white border border-slate-200 p-6 md:p-8 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl text-navy font-bold">নতুন ছবি যোগ করুন</h3>
                  <button onClick={resetGalleryForm} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleGallerySubmit} className="space-y-6">
                  {/* Image uploader */}
                  <ImageUploader
                    value={galleryForm.image_url}
                    onChange={(url) => setGalleryForm({ ...galleryForm, image_url: url })}
                  />

                  {/* Category */}
                  <div>
                    <label className="block font-body text-sm text-navy font-medium mb-2">ক্যাটাগরি *</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="w-full md:w-1/2 px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
                    >
                      <option value="local">স্থানীয় কার্যক্রম (উলিপুর)</option>
                      <option value="international">আন্তর্জাতিক অঙ্গন</option>
                    </select>
                  </div>

                  {/* Caption */}
                  <div>
                    <label className="block font-body text-sm text-navy font-medium mb-2">ক্যাপশন (ঐচ্ছিক)</label>
                    <input
                      type="text"
                      value={galleryForm.caption}
                      onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
                      placeholder="ছবির বিবরণ"
                    />
                  </div>

                  <div className="flex gap-3 pt-2 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={loading || !galleryForm.image_url}
                      className="flex items-center gap-2 bg-forest hover:bg-forest-deep text-white font-body font-semibold px-6 py-3 transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      যোগ করুন
                    </button>
                    <button
                      type="button"
                      onClick={resetGalleryForm}
                      className="px-6 py-3 border border-slate-300 text-slate-600 font-body font-medium hover:bg-slate-50 transition-colors"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Local Gallery Section */}
            <div className="mb-8">
              <h3 className="font-body text-sm font-semibold text-forest mb-3 uppercase tracking-wide">
                স্থানীয় কার্যক্রম - উলিপুর ({localGallery.length})
              </h3>
              {localGallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {localGallery.map((image) => (
                    <div key={image.id} className="relative group aspect-square bg-slate-100 overflow-hidden">
                      <img
                        src={getImageUrl(image.image_url)}
                        alt={image.caption || 'Gallery image'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteGalleryImage(image.id)}
                          className="p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {image.caption && (
                        <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 font-body bg-slate-50 border border-dashed border-slate-200">
                  এই বিভাগে কোনো ছবি নেই
                </div>
              )}
            </div>

            {/* International Gallery Section */}
            <div>
              <h3 className="font-body text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
                আন্তর্জাতিক অঙ্গন ({internationalGallery.length})
              </h3>
              {internationalGallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {internationalGallery.map((image) => (
                    <div key={image.id} className="relative group aspect-square bg-slate-100 overflow-hidden">
                      <img
                        src={getImageUrl(image.image_url)}
                        alt={image.caption || 'Gallery image'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteGalleryImage(image.id)}
                          className="p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {image.caption && (
                        <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 font-body bg-slate-50 border border-dashed border-slate-200">
                  এই বিভাগে কোনো ছবি নেই
                </div>
              )}
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-navy font-bold">সাক্ষাৎ রেজিষ্ট্রেশন</h2>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-sm font-body">
                  <span className="flex items-center gap-1 text-amber-600">
                    <Clock className="w-4 h-4" /> অপেক্ষমান: {pendingRegistrations.length}
                  </span>
                  <span className="flex items-center gap-1 text-blue-600">
                    <CheckCircle2 className="w-4 h-4" /> অনুমোদিত: {approvedRegistrations.length}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <Check className="w-4 h-4" /> সম্পন্ন: {completedRegistrations.length}
                  </span>
                </div>
                <button
                  onClick={handleDownloadRegistrationsExcel}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-body rounded-sm transition-colors shadow-sm"
                  title="Excel ফাইল ডাউনলোড করুন"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Excel ডাউনলোড</span>
                </button>
              </div>
            </div>

            {/* Registration List */}
            <div className="space-y-4">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  data-testid={`registration-row-${reg.id}`}
                  className={`bg-white border p-5 hover:shadow-sm transition-shadow ${
                    reg.status === 'pending' ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="font-heading text-lg text-navy font-semibold">{reg.name}</h4>
                        {getStatusBadge(reg.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm font-body text-slate-500 mb-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> {reg.phone}
                        </span>
                        {reg.area && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {reg.area}
                          </span>
                        )}
                        {reg.subject && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                            {reg.subject}
                          </span>
                        )}
                      </div>
                      {reg.message && (
                        <p className="font-body text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded">
                          {reg.message}
                        </p>
                      )}
                      <p className="font-body text-xs text-slate-400 mt-3">
                        {new Date(reg.created_at).toLocaleString('bn-BD')}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {reg.status === 'pending' && (
                        <button
                          onClick={() => updateRegistrationStatus(reg.id, 'approved')}
                          className="px-3 py-1.5 bg-blue-500 text-white text-xs font-body rounded hover:bg-blue-600 transition-colors"
                          title="অনুমোদন"
                        >
                          অনুমোদন
                        </button>
                      )}
                      {reg.status === 'approved' && (
                        <button
                          onClick={() => updateRegistrationStatus(reg.id, 'completed')}
                          className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-body rounded hover:bg-emerald-600 transition-colors"
                          title="সম্পন্ন"
                        >
                          সম্পন্ন
                        </button>
                      )}
                      {(reg.status === 'pending' || reg.status === 'approved') && (
                        <button
                          onClick={() => updateRegistrationStatus(reg.id, 'cancelled')}
                          className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-body rounded hover:bg-red-200 transition-colors"
                          title="বাতিল"
                        >
                          বাতিল
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteRegistration(reg.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {registrations.length === 0 && (
                <div className="text-center py-16 text-slate-400 font-body">
                  কোনো রেজিষ্ট্রেশন নেই।
                </div>
              )}
            </div>
          </div>
        )}

        {/* Countdown Tab */}
        {activeTab === 'countdown' && (
          <div>
            <h2 className="font-heading text-2xl text-navy font-bold mb-6">কাউন্টডাউন টাইমার সেটিংস</h2>
            
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg max-w-2xl">
              {/* On/Off Toggle */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="font-heading text-lg text-navy font-semibold mb-1">কাউন্টডাউন অন/অফ</h3>
                  <p className="font-body text-sm text-slate-500">
                    কাউন্টডাউন টাইমার রেজিষ্ট্রেশন পেজে দেখাবে
                  </p>
                </div>
                <button
                  onClick={toggleCountdown}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    countdown.is_active ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    countdown.is_active ? 'translate-x-7' : 'translate-x-0.5'
                  }`}>
                    <Power className={`w-4 h-4 m-1 ${countdown.is_active ? 'text-emerald-500' : 'text-slate-400'}`} />
                  </span>
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                {countdown.is_active ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 font-body text-sm rounded-full">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    কাউন্টডাউন সক্রিয়
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-500 font-body text-sm rounded-full">
                    <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                    কাউন্টডাউন নিষ্ক্রিয়
                  </span>
                )}
              </div>

              {/* Title Input */}
              <div className="mb-6">
                <label className="flex items-center gap-2 font-body text-sm text-navy font-medium mb-2">
                  <MessageSquare className="w-4 h-4 text-forest" />
                  শিরোনাম
                </label>
                <input
                  type="text"
                  value={countdown.title || ''}
                  onChange={(e) => setCountdown({ ...countdown, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors rounded"
                  placeholder="তারুণ্যের মুখোমুখির পরবর্তী সময়"
                />
              </div>

              {/* Target Date Input */}
              <div className="mb-8">
                <label className="flex items-center gap-2 font-body text-sm text-navy font-medium mb-2">
                  <Calendar className="w-4 h-4 text-forest" />
                  টার্গেট তারিখ ও সময়
                </label>
                <input
                  type="datetime-local"
                  value={countdown.target_date ? countdown.target_date.slice(0, 16) : ''}
                  onChange={(e) => setCountdown({ ...countdown, target_date: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 font-body text-navy focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors rounded"
                />
                {countdown.target_date && (
                  <p className="font-body text-xs text-slate-500 mt-2">
                    নির্ধারিত সময়: {new Date(countdown.target_date).toLocaleString('bn-BD')}
                  </p>
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={() => updateCountdown({ 
                  is_active: countdown.is_active, 
                  target_date: countdown.target_date, 
                  title: countdown.title 
                })}
                className="flex items-center gap-2 bg-forest hover:bg-forest-deep text-white font-body font-semibold px-6 py-3 rounded transition-colors"
              >
                <Save className="w-4 h-4" />
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
