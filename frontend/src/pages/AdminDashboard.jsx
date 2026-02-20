import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale, LogOut, Plus, Pencil, Trash2, Eye, EyeOff,
  Newspaper, MessageSquare, X, Save, AlertCircle, CheckCircle,
  Upload, Image as ImageIcon, Loader2, GripVertical, Users, Star, Check, XCircle
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
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', image_url: '', content: '', date: '', is_published: true });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

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

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/admin'); return; }
    fetchActivities();
    fetchContacts();
    fetchOpinions();
  }, [fetchActivities, fetchContacts, fetchOpinions, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin');
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
        <div className="flex gap-2 mb-8">
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
      </div>
    </main>
  );
};

export default AdminDashboard;
