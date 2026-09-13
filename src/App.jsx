import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Live from "./pages/Live";
import Discography from "./pages/Discography";
import Nonfiction from "./pages/Nonfiction";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Editor from "./pages/Editor";
import Tenkyu from "./pages/Tenkyu";
import Placeholder from "./pages/Placeholder";

/* Multi-page site: start every route at the top. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* Asks search engines to stay away for as long as this route is on
   screen. scripts/build-routes.mjs writes the same tag into the static
   file, which is the copy a crawler actually reads; this one covers the
   case where the route is reached by clicking through the app. */
function useNoindex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}

/* The editor is a tool, not a page of the site — it gets no navigation
   and no footer. */
function EditorRoute() {
  useNoindex();
  return <Editor />;
}

/* てんきゅーつあー is a normal page of the site, chrome and all. It is
   simply unlisted for now: no NAV entry, no sitemap, noindex. Link it
   from NAV in src/data/site.js when the tour is ready to announce. */
function TenkyuRoute() {
  useNoindex();
  return <Tenkyu />;
}

function Site() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/nonfiction" element={<Nonfiction />} />
          <Route path="/tenkyu" element={<TenkyuRoute />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Placeholder title="Not Found" ja="404" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/editor" element={<EditorRoute />} />
        <Route path="*" element={<Site />} />
      </Routes>
    </BrowserRouter>
  );
}
