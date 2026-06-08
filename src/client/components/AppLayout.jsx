import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollProgress from "./ScrollProgress.jsx";

const AnimatedBackground = lazy(() => import("./AnimatedBackground.jsx"));

export default function AppLayout({ children }) {
  const [canUseLiveBackground, setCanUseLiveBackground] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)");
    const update = () => setCanUseLiveBackground(!query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <>
      {canUseLiveBackground ? (
        <Suspense fallback={<div className="animated-background fallback" aria-hidden="true" />}>
          <AnimatedBackground />
        </Suspense>
      ) : (
        <div className="animated-background fallback" aria-hidden="true" />
      )}
      <ScrollProgress />
      <Navbar />
      <main className="page-shell">
        {children}
      </main>
      <Footer />
    </>
  );
}
