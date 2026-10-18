import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Procedures from '../pages/Procedures';
import Appointment from '../pages/Appointment';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import { EASE } from '../lib/motion';
import { scrollToTop, useLenis } from '../lib/lenis';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop({ instant: true });
  }, [pathname]);
  return null;
}

export default function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  useLenis();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-[0.9rem] focus:font-semibold focus:text-white"
      >
        {t('ui.skip')}
      </a>
      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/procedures" element={<Procedures />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
