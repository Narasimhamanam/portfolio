# 🌐 Narasimha Manam — 3D Interactive Engineering Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/3D-Three.js_%7C_R3F-000000?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/Animations-GSAP_3-88CE02?style=flat&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)

The personal, 3D interactive engineering portfolio of **Narasimha Manam**. Built using **React Three Fiber (R3F)**, **Three.js**, **GSAP**, **TypeScript**, and **Vite**, this application combines physics simulations, custom WebGL shaders, smooth Lenis scrolling, and an interactive 3D chess game engine integrated with **Stockfish AI**.

---

## 🎨 Interactive Features & Architecture

```mermaid
graph TD
    User["Site Visitor"]
    Canvas["WebGL 3D Canvas<br/>(@react-three/fiber + Drei)"]
    Physics["Physics Simulation Engine<br/>(@react-three/rapier)"]
    Post["Post-Processing Shaders<br/>(Bloom, DepthOfField, Vignette)"]
    Chess["Interactive Chess Engine<br/>(Stockfish.js AI + chess.js)"]
    Scroll["Smooth Scroll Controller<br/>(Lenis + GSAP ScrollTrigger)"]

    User --> Canvas
    Canvas --> Physics
    Canvas --> Post
    User -->|Play AI Chess| Chess
    User -->|Scroll Narrative| Scroll
```

### Highlights:
- **WebGL 3D Canvas:** Interactive 3D scene rendering via React Three Fiber and Drei utilities.
- **Physics Engine:** Real-time rigid-body collisions powered by Rapier (`@react-three/rapier`).
- **Stockfish AI Chess Mini-Game:** Embedded playable chess match against the open-source Stockfish engine running client-side in WebAssembly (`stockfish.js` + `chess.js`).
- **Smooth Inertial Scrolling:** Lenis smooth scrolling coupled with GSAP timeline scroll-trigger animations.
- **Responsive Post-Processing:** Tone mapping, subtle bloom, and depth-of-field optimized for 60fps performance on mobile and desktop GPUs.

---

## 🛠️ Technology Stack

- **Core Framework:** React 18, Vite 5, TypeScript 5
- **3D & Graphics:** Three.js (`three`), `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Physics:** `@react-three/rapier`, `@react-three/cannon`
- **Animations:** GSAP (GreenSock), Lenis smooth scroll
- **Game Engine:** `stockfish.js`, `chess.js`
- **Icons & UI:** Lucide React, React Icons, React Fast Marquee
- **Deployment:** Vercel (`vercel.json`)

---

## 📂 Project Structure

```
portfolio/
├── public/                   # Static 3D models, textures, and assets
├── scripts/                  # Optimization & build scripts
├── src/
│   ├── components/           # 3D canvas, hero sections, project showcases
│   ├── hooks/                # Viewport and GPU capability hooks
│   ├── pages/                # Page routes (Home, Projects, Chess)
│   ├── App.tsx
│   └── main.tsx
│
├── vercel.json               # Vercel SPA routing and caching headers
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js `18.x` or higher
- `npm` or `pnpm`

### 1. Clone the Repository
```bash
git clone https://github.com/Narasimhamanam/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
# Opens at http://localhost:5173
```

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## ⚠️ Performance Notes

- The 3D canvas automatically scales device pixel ratio (`dpr={[1, 2]}`) to prevent overheating or GPU throttling on high-DPI retina screens.
- WebGL contexts automatically handle tab hibernation and context restoration gracefully.
