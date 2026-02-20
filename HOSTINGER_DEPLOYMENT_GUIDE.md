# 🚀 Hostinger Deployment Guide for Barrister Mahbubul Alam Salehi Website

## 📋 Pre-Deployment Checklist

✅ All services running (Backend, Frontend, MongoDB)
✅ All API endpoints tested and working
✅ Admin login functional (admin/admin123)
✅ Excel export feature working
✅ All navigation links correct
✅ Favicon and meta tags configured
✅ Copyright year updated to 2026
✅ Social media sharing meta tags set

---

## 🏗️ Architecture Overview

**Tech Stack:**
- **Frontend:** React 19 + Tailwind CSS (Port 3000)
- **Backend:** FastAPI Python (Port 8001)
- **Database:** MongoDB
- **Web Server:** Nginx (for production)

---

## 📦 Hostinger Deployment Options

Hostinger offers different hosting plans. Choose based on your needs:

### **Option 1: VPS Hosting (Recommended)**
Best for full-stack applications like yours.

### **Option 2: Cloud Hosting**
Good alternative with more control.

---

## 🔧 Deployment Steps for Hostinger VPS

### **Step 1: Purchase and Setup VPS**

1. Go to Hostinger.com
2. Purchase a VPS plan (KVM 1 or higher recommended)
3. Choose Ubuntu 22.04 LTS as OS
4. Set up SSH access
5. Note down your VPS IP address

### **Step 2: Connect to VPS**

```bash
ssh root@YOUR_VPS_IP
```

### **Step 3: Install Required Software**

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install Python 3.11
apt install -y python3.11 python3.11-venv python3-pip

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt update
apt install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Install Nginx
apt install -y nginx

# Install Yarn
npm install -g yarn

# Install Supervisor
apt install -y supervisor
```

### **Step 4: Create Application User**

```bash
adduser mahbubapp
usermod -aG sudo mahbubapp
su - mahbubapp
```

### **Step 5: Upload Your Code**

From your local machine:

```bash
# Create a zip of your project
cd /app
tar -czf mahbub-website.tar.gz backend/ frontend/ package.json

# Upload to VPS (from local machine)
scp mahbub-website.tar.gz mahbubapp@YOUR_VPS_IP:/home/mahbubapp/
```

Or use Git (recommended):

```bash
# On VPS as mahbubapp user
cd /home/mahbubapp
git clone YOUR_GITHUB_REPO_URL mahbub-website
cd mahbub-website
```

### **Step 6: Install Dependencies**

```bash
# Backend dependencies
cd /home/mahbubapp/mahbub-website/backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend dependencies
cd /home/mahbubapp/mahbub-website/frontend
yarn install
```

### **Step 7: Build Frontend for Production**

```bash
cd /home/mahbubapp/mahbub-website/frontend
yarn build
```

### **Step 8: Configure Environment Variables**

```bash
# Backend .env
cat > /home/mahbubapp/mahbub-website/backend/.env << 'ENVFILE'
MONGO_URL=mongodb://localhost:27017
DB_NAME=salehi_portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ENVFILE

# Frontend .env (for build)
cat > /home/mahbubapp/mahbub-website/frontend/.env << 'ENVFILE'
REACT_APP_BACKEND_URL=https://mahbubsalehi.com
ENVFILE
```

**Important:** Change JWT_SECRET to a strong random string!

### **Step 9: Setup Nginx Configuration**

```bash
sudo nano /etc/nginx/sites-available/mahbubsalehi
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name mahbubsalehi.com www.mahbubsalehi.com;

    # Frontend - Serve React build
    location / {
        root /home/mahbubapp/mahbub-website/frontend/build;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # File upload size limit
    client_max_body_size 50M;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/mahbubsalehi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### **Step 10: Setup Supervisor for Backend**

```bash
sudo nano /etc/supervisor/conf.d/mahbubsalehi.conf
```

Add:

```ini
[program:mahbubsalehi-backend]
directory=/home/mahbubapp/mahbub-website/backend
command=/home/mahbubapp/mahbub-website/backend/venv/bin/python -m uvicorn server:app --host 0.0.0.0 --port 8001
user=mahbubapp
autostart=true
autorestart=true
stderr_logfile=/var/log/mahbubsalehi-backend.err.log
stdout_logfile=/var/log/mahbubsalehi-backend.out.log
environment=PYTHONUNBUFFERED="1"
```

Start the backend:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start mahbubsalehi-backend
sudo supervisorctl status
```

### **Step 11: Setup MongoDB Admin User**

```bash
mongosh

use salehi_portfolio

# The admin user will be created automatically by the backend on first run
# Default credentials: admin/admin123

exit
```

### **Step 12: Configure Domain DNS**

In your Hostinger control panel:

1. Go to Domain → DNS Zone Editor
2. Add/Update A Record:
   - Type: **A**
   - Name: **@** (for mahbubsalehi.com)
   - Points to: **YOUR_VPS_IP**
   - TTL: 3600

3. Add WWW Record:
   - Type: **A**
   - Name: **www**
   - Points to: **YOUR_VPS_IP**
   - TTL: 3600

Wait 15-30 minutes for DNS propagation.

### **Step 13: Setup SSL Certificate (HTTPS)**

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d mahbubsalehi.com -d www.mahbubsalehi.com

# Follow the prompts and provide email
# Choose option 2 to redirect HTTP to HTTPS

# Auto-renewal test
sudo certbot renew --dry-run
```

### **Step 14: Setup Firewall**

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### **Step 15: Test Deployment**

Visit your website:
- http://mahbubsalehi.com (should redirect to https)
- https://mahbubsalehi.com

Test these pages:
- ✅ Homepage
- ✅ জীবনী (Biography)
- ✅ ভিশন (Vision)
- ✅ কার্যক্রম (Activities)
- ✅ গ্যালারি (Gallery)
- ✅ জনতার মতামত (Public Opinion)
- ✅ যোগাযোগ (Contact)
- ✅ Admin Login (/admin)

---

## 🔒 Security Checklist

- [ ] Change default admin password (admin/admin123)
- [ ] Update JWT_SECRET in .env
- [ ] Enable firewall (UFW)
- [ ] Setup SSL certificate
- [ ] Regular MongoDB backups
- [ ] Keep system updated

---

## 📊 Monitoring & Maintenance

### Check Backend Status
```bash
sudo supervisorctl status mahbubsalehi-backend
```

### Check Backend Logs
```bash
sudo tail -f /var/log/mahbubsalehi-backend.out.log
sudo tail -f /var/log/mahbubsalehi-backend.err.log
```

### Check Nginx Logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Restart backend
sudo supervisorctl restart mahbubsalehi-backend

# Restart Nginx
sudo systemctl restart nginx

# Restart MongoDB
sudo systemctl restart mongod
```

---

## 📦 MongoDB Backup

Setup automatic backups:

```bash
# Create backup script
sudo nano /usr/local/bin/backup-mongodb.sh
```

Add:

```bash
#!/bin/bash
BACKUP_DIR="/home/mahbubapp/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
mongodump --db salehi_portfolio --out $BACKUP_DIR/backup_$DATE

# Keep only last 7 days backups
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +
```

Make executable and add to cron:

```bash
sudo chmod +x /usr/local/bin/backup-mongodb.sh
sudo crontab -e
# Add this line: Daily backup at 2 AM
0 2 * * * /usr/local/bin/backup-mongodb.sh
```

---

## 🔄 Updating Website

When you make changes:

```bash
# Pull latest code
cd /home/mahbubapp/mahbub-website
git pull

# Update backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
sudo supervisorctl restart mahbubsalehi-backend

# Update frontend
cd ../frontend
yarn install
yarn build
sudo systemctl reload nginx
```

---

## 🆘 Troubleshooting

### Backend not starting
```bash
sudo supervisorctl tail mahbubsalehi-backend stderr
```

### Frontend not loading
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### MongoDB connection error
```bash
sudo systemctl status mongod
sudo tail -f /var/log/mongodb/mongod.log
```

---

## 📞 Support Resources

- Hostinger Support: https://www.hostinger.com/support
- FastAPI Docs: https://fastapi.tiangolo.com/
- React Docs: https://react.dev/
- MongoDB Docs: https://www.mongodb.com/docs/

---

## ✅ Post-Deployment Checklist

- [ ] Website loads at https://mahbubsalehi.com
- [ ] All navigation links work
- [ ] Admin login works
- [ ] Contact form submits successfully
- [ ] Public opinion form works
- [ ] Registration form works
- [ ] Admin can view all submissions
- [ ] Admin can download Excel export
- [ ] Facebook/Website icons link correctly
- [ ] Dark/Light mode toggle works
- [ ] Mobile responsive design working
- [ ] SSL certificate installed
- [ ] MongoDB backups configured

---

**Deployment completed successfully! 🎉**

Your website is now live at: **https://mahbubsalehi.com**

