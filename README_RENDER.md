# Render.com Deployment Guide

## Quick Start

This application is configured for easy deployment on Render.com

### Prerequisites
- GitHub account
- Render.com account
- MongoDB Atlas account (free tier)

### Deployment Steps

1. **Setup MongoDB Atlas**
   - Create free cluster at https://mongodb.com/cloud/atlas
   - Get connection string

2. **Deploy on Render**
   - Connect GitHub repository
   - Render will auto-detect services
   - Add MongoDB connection string as environment variable

3. **Configure Domain**
   - Add custom domain in Render dashboard
   - Update DNS records

See RENDER_DEPLOYMENT.md for detailed instructions.
