# 🚀 Render.com - Quick Reference

## ⏱️ Time Required: 30-45 minutes

## 📝 Checklist

### Before You Start:
- [ ] GitHub account created
- [ ] Render.com account created
- [ ] MongoDB Atlas account created
- [ ] Code uploaded to GitHub

### Deployment Steps:
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string copied
- [ ] Backend deployed on Render
- [ ] Backend environment variables added
- [ ] Frontend deployed on Render
- [ ] Frontend environment variable added
- [ ] API routing configured
- [ ] All pages tested
- [ ] Admin login tested
- [ ] Forms tested

### Optional:
- [ ] Custom domain configured
- [ ] DNS updated on Hostinger
- [ ] SSL certificate verified

---

## 🔑 Important Information to Save

### MongoDB Connection String:
```
mongodb+srv://salehiuser:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/
```

### Render URLs:
- Backend: `https://mahbubsalehi-backend.onrender.com`
- Frontend: `https://mahbubsalehi-frontend.onrender.com`

### Environment Variables:

**Backend:**
- MONGO_URL: [Your MongoDB connection string]
- DB_NAME: salehi_portfolio
- JWT_SECRET: mahbub-salehi-secret-2026-change-this
- PYTHON_VERSION: 3.11.0

**Frontend:**
- REACT_APP_BACKEND_URL: https://mahbubsalehi-backend.onrender.com

---

## 💰 Cost Comparison

| Platform | Monthly Cost | Setup Time | Difficulty |
|----------|-------------|------------|------------|
| **Render (Free)** | $0 | 30-45 min | ⭐⭐ Easy |
| **Render (Paid)** | $7 | 30-45 min | ⭐⭐ Easy |
| **Hostinger VPS** | $5-8 | 1-2 hours | ⭐⭐⭐⭐ Hard |

---

## ⚠️ Free Tier Limitations

- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month usage limit
- Perfect for testing and low-traffic sites

**Upgrade to Paid ($7/month) for:**
- Always-on backend (no sleeping)
- Better performance
- More build minutes

---

## 🔗 Quick Links

- **Render Dashboard:** https://dashboard.render.com
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Your GitHub:** https://github.com/YOUR_USERNAME/mahbubsalehi-website
- **Render Docs:** https://render.com/docs

---

## 📞 Support

- **Render Community:** https://community.render.com
- **MongoDB Support:** https://www.mongodb.com/docs/atlas/
- **Full Guide:** Read RENDER_DEPLOYMENT_GUIDE.md

---

## ✅ Success Indicators

Your deployment is successful when:
- ✅ Backend URL shows `{"detail":"Not Found"}` at root
- ✅ Backend URL shows `[]` at `/api/activities`
- ✅ Frontend loads homepage
- ✅ All navigation links work
- ✅ Forms can be submitted
- ✅ Admin login works (`/admin`)
- ✅ Admin can manage content

