# 🚀 Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The portfolio will open at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```
   Output will be in the `dist` folder

## 📁 Project Structure

```
Pratik-Portfolio/
├── src/
│   ├── components/     # React components (Navbar, Hero, About, etc.)
│   ├── hooks/         # Custom hooks (useTheme)
│   ├── styles/        # Global styles & color palette
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── public/
│   ├── data.json      # Portfolio data
│   └── *.png, *.jpg   # Images
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Features

✅ **React 18** with TypeScript  
✅ **Framer Motion** animations  
✅ **Unique Color Palette** (Coral Red, Teal, Blue gradients)  
✅ **Dark/Light Theme** toggle  
✅ **Fully Responsive** design  
✅ **Smooth Animations** throughout  

## 📝 Updating Content

Edit `public/data.json` to update:
- Personal information
- Skills
- Projects
- Experience
- Education

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run build
# Then deploy dist folder to Vercel
```

### GitHub Pages
The existing GitHub Actions workflow will work with the new build system.

## 🎯 Next Steps

1. Run `npm install` to install dependencies
2. Run `npm run dev` to see your portfolio
3. Customize colors in `src/styles/colors.ts`
4. Update content in `public/data.json`

---

**Your portfolio is now modern, animated, and ready to impress! 🎉**




