# Quick Deploy Guide

1. Install:  
   ```
   npm install
   ```
2. Build for production:  
   ```
   npm run build
   ```
3. Copy `build/` contents to your web host/static server
   - Or, for PWA: just upload PWA files + build/ to Netlify, Vercel, GitHub Pages, etc.
4. For private installs, you can distribute the `/build` folder or wrap as an Electron app for desktop.

Feel free to fork, remix, or integrate with your cloud/CI toolchain.