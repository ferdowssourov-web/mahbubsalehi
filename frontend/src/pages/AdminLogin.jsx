import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Lock, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/admin/login`, form);
      localStorage.setItem('admin_token', res.data.token);
      localStorage.setItem('admin_user', res.data.username);
      navigate('/admin/dashboard');
    } catch {
      setError('ভুল ইউজারনেম বা পাসওয়ার্ড');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="admin-login-page" className="min-h-screen bg-forest-deep flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/20 border border-gold/30 rounded-sm flex items-center justify-center mx-auto mb-4">
            <Scale className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-heading text-3xl text-white font-bold">অ্যাডমিন প্যানেল</h1>
          <p className="font-body text-white/50 mt-2">ব্যারিস্টার সালেহী ওয়েবসাইট</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
          {error && (
            <div data-testid="login-error" className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-body mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-sm text-white/70 mb-2">ইউজারনেম</label>
              <input
                type="text"
                data-testid="admin-username-input"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white font-body placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-white/70 mb-2">পাসওয়ার্ড</label>
              <input
                type="password"
                data-testid="admin-password-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white font-body placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              data-testid="admin-login-btn"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-body font-semibold py-3.5 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  লগইন করুন
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
