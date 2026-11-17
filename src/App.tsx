import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './studio/Portfolio';
const ChessRoom = lazy(() => import('./studio/ChessRoom'));
export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/myworks" element={<Portfolio workFirst />} />
    <Route path="/play" element={<Suspense fallback={<p className="route-loading">Opening the chess room…</p>}><ChessRoom /></Suspense>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>;
}
