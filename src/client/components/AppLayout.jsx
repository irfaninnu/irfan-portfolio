import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollProgress from "./ScrollProgress.jsx";

export default function AppLayout({ children }) {
  return (
    <>
      <div className="animated-background fallback" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main className="page-shell">
        {children}
      </main>
      <Footer />
    </>
  );
}
