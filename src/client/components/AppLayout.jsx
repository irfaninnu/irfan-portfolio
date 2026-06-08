import { Component, Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollProgress from "./ScrollProgress.jsx";

const AnimatedBackground = lazy(() => import("./AnimatedBackground.jsx"));

class BackgroundErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("3D background disabled:", error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default function AppLayout({ children }) {
  const [showLiveBackground, setShowLiveBackground] = useState(false);

  useEffect(() => {
    const canUseWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return Boolean(
          window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
        );
      } catch {
        return false;
      }
    };

    const query = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)");

    if (query.matches || !canUseWebGL()) {
      return undefined;
    }

    const timer = window.setTimeout(() => setShowLiveBackground(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="animated-background fallback" aria-hidden="true" />
      {showLiveBackground && (
        <BackgroundErrorBoundary>
          <Suspense fallback={null}>
            <AnimatedBackground />
          </Suspense>
        </BackgroundErrorBoundary>
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
