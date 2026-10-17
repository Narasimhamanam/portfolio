import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <MainContainer>
                <Suspense>
                  <CharacterModel />
                </Suspense>
              </MainContainer>
            </Suspense>
          }
        />
        <Route
          path="/myworks"
          element={
            <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#050816", color: "#22D3EE" }}>Loading Works...</div>}>
              <MyWorks />
            </Suspense>
          }
        />
        <Route
          path="/play"
          element={
            <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#050816", color: "#22D3EE" }}>Loading Chess Arena...</div>}>
              <Play />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
