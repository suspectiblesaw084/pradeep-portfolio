# Pradeep V &mdash; Premium Visual Designer Portfolio

A highly polished, AMOLED pitch-black, editorial-style single-page portfolio website designed for **Pradeep V, Visual Designer**. 

This portfolio features asymmetrical editorial layout elements, cursor-interactive image rows, drag-enabled abstract glass components, and seamless animations built using **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## 🎨 Design Features
* **AMOLED Deep Black Aesthetic**: High-contrast, typography-focused, elegant minimal spacing.
* **Cinematic Film Grain**: Built-in micro-texture filter for a premium tactile/paper-like feel.
* **Cursor-Following Work Preview**: Moving image reveals on project rows (automatically falls back to responsive blocks on mobile/touch screens).
* **Interactive 3D Visual**: A drag-responsive geometric glass core in the Hero section, fully built with CSS 3D transforms.
* **Asymmetric Grid**: Editorial client case study presentation with tailored visual mockups.
* **Fully Responsive**: Optimized for Ultra-wide monitors, Desktops, Tablets, and Mobile phones.

---

## 🛠️ Tech Stack & Dependencies
* **Core**: React 18 & Vite
* **Styling**: Tailwind CSS & PostCSS
* **Animations**: Framer Motion (v11)
* **Icons**: Lucide React
* **Typography**: *Syne* (Display Headings) & *Inter* (Body Text) imported from Google Fonts.

---

## 🚀 Getting Started Locally

To run the project on your computer:

1. **Install Node.js**: Download and install [Node.js](https://nodejs.org/) (version 18 or higher recommended).
2. **Open the Project Folder**: Navigate to the directory:
   ```bash
   cd pradeep-portfolio
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Building for Production

To compile a highly optimized build for hosting:
```bash
npm run build
```
This generates a static production bundle in the `dist/` directory.

---

## ☁️ Deployment Instructions

This website is configured and ready for instant deployment:

### 1. Vercel
* Install the Vercel CLI (`npm install -g vercel`) or link your GitHub repository directly on the [Vercel Dashboard](https://vercel.com).
* **Vercel Settings**:
  * **Build Command**: `npm run build`
  * **Output Directory**: `dist`
  * **Framework Preset**: `Vite`

### 2. Netlify
* Drag-and-drop the generated `dist/` folder onto the [Netlify App](https://app.netlify.com) dashboard, or connect your git repo.
* **Netlify Settings**:
  * **Build Command**: `npm run build`
  * **Publish Directory**: `dist`

### 3. GitHub Pages
* Install the gh-pages package: `npm install -D gh-pages`.
* Add the following to your `package.json` scripts:
  `"predeploy": "npm run build", "deploy": "gh-pages -d dist"`
* Configure your `vite.config.js` to include the `base` property with your repository name:
  `base: '/repo-name/',`
* Run: `npm run deploy`.

---

## 📝 Customization Guide

### How to Edit Text Content
All copywriting, descriptions, and list elements are defined clearly in the component files with structural code comments. Open the files below to adjust names, headings, or email links:
* **Branding & Layout**: [src/App.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/App.jsx)
* **Header / Nav items**: [src/components/Navbar.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/components/Navbar.jsx)
* **Hero Header & Subtitles**: [src/components/Hero.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/components/Hero.jsx)
* **Works List & Hover Items**: [src/components/SelectedWorks.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/components/SelectedWorks.jsx)
* **Featured Case Study Cards**: [src/components/FeaturedCaseStudies.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/components/FeaturedCaseStudies.jsx)
* **Software Tools & Capabilities**: [src/components/Skills.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/components/Skills.jsx)
* **Design Workflow Steps**: [src/components/Process.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/components/Process.jsx)
* **Biography Text**: [src/components/About.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/components/About.jsx)
* **Email & Social Accounts**: [src/components/Contact.jsx](file:///C:/Users/prade/.gemini/antigravity/scratch/pradeep-portfolio/src/components/Contact.jsx)

### How to Replace Images
Four premium visual design mockups have been generated and pre-packaged in the `public/images/` folder:
* `bharatbrew_branding.png` (Coffee box/can packaging mockup)
* `abhive_studios.png` (Cinematic film studio concrete wall logo)
* `product_visuals.png` (Cosmetic bottle metallic platform render)
* `social_media_archive.png` (High-contrast typography poster mockup)

To add your own works, simply overwrite these files in the `public/images/` directory with your own JPG/PNG images keeping the same filenames, or edit the file references in `SelectedWorks.jsx` and `FeaturedCaseStudies.jsx`.
