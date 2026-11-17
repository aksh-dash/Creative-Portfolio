// src/App.jsx

import React, { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/hero';
import Showreel from './components/Showreel';
import Services from './components/Services';
import Projects from './components/Projects';
import Photography from './components/Photography';
import Graphics from './components/Graphics';
import Skills from './components/Skills';
import BeforeAfter from './components/BeforeAfter';
import Timeline from './components/Timeline';
import About from './components/About';
import SocialProof from './components/SocialProof';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import NotFound from './components/NotFound';
import StoreComingSoon from './components/StoreComingSoon';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsModal from './components/TermsModal';
import CookieBanner from './components/CookieBanner';
import StickyMobileCTA from './components/StickyMobileCTA';

// New Components
import ErrorBoundary from './components/ErrorBoundary';
import FAQ from './components/FAQ';
import CaseStudies from './components/CaseStudies';
import MaintenancePage from './components/MaintenancePage';
import ForbiddenPage from './components/ForbiddenPage';
import ThankYouPage from './components/ThankYouPage';
import StoreSuccessPage from './components/StoreSuccessPage';
import StoreCancelledPage from './components/StoreCancelledPage';
import OfflineBanner from './components/OfflineBanner';
import FirstVisitLoader from './components/FirstVisitLoader';

// Anti-Theft & Asset Protection Security Patch
import { initSecurityPatch } from './utils/securityPatch';

// ── Maintenance mode check ──────────────────────────────────────
// Set VITE_MAINTENANCE=true in Vercel env vars (or .env) to activate.
const IS_MAINTENANCE = import.meta.env.VITE_MAINTENANCE === 'true';

const App = ({ initialRoute = 'home' }) => {
    const [currentRoute, setCurrentRoute] = useState(initialRoute);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [termsOpen, setTermsOpen] = useState(false);

    useEffect(() => {
        // Initialize strict client-side asset protection
        initSecurityPatch();

        // Check for 404 and store routes / query / hash
        const checkRoute = () => {
            const path = window.location.pathname.toLowerCase();
            const hash = window.location.hash.toLowerCase();

            if (path === '/thank-you' || path === '/thankyou') {
                setCurrentRoute('thankyou');
            } else if (path === '/success') {
                setCurrentRoute('store-success');
            } else if (path === '/cancelled') {
                setCurrentRoute('store-cancelled');
            } else if (path === '/forbidden' || path === '/expired') {
                setCurrentRoute('forbidden');
            } else if (path.includes('404') || hash === '#404') {
                setCurrentRoute('404');
            } else if (path === '/store' || path.startsWith('/store') || path.includes('coming-soon') || hash === '#store') {
                setCurrentRoute('store');
            } else if (path === '/' || path === '') {
                setCurrentRoute('home');
            } else {
                // Unknown route → 404
                setCurrentRoute('404');
            }
        };

        checkRoute();
        window.addEventListener('popstate', checkRoute);
        window.addEventListener('hashchange', checkRoute);
        return () => {
            window.removeEventListener('popstate', checkRoute);
            window.removeEventListener('hashchange', checkRoute);
        };
    }, []);

    const navigateHome = () => {
        setCurrentRoute('home');
        window.history.pushState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    // ── Maintenance mode: replaces entire app ──
    if (IS_MAINTENANCE) {
        return <MaintenancePage />;
    }

    // ── Status pages ──
    if (currentRoute === '404') {
        return <NotFound onReturn={navigateHome} />;
    }

    if (currentRoute === 'store') {
        return (
            <StoreComingSoon
                onReturn={() => {
                    setCurrentRoute('home');
                    window.history.pushState(null, '', '/');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                }}
            />
        );
    }

    if (currentRoute === 'thankyou') {
        return <ThankYouPage onReturn={navigateHome} />;
    }

    if (currentRoute === 'store-success') {
        return <StoreSuccessPage onReturn={navigateHome} />;
    }

    if (currentRoute === 'store-cancelled') {
        return <StoreCancelledPage onReturn={navigateHome} />;
    }

    if (currentRoute === 'forbidden') {
        return <ForbiddenPage onReturn={navigateHome} />;
    }

    // ── Main portfolio ──
    return (
        <>
            {/* First-visit branded loader overlay */}
            <FirstVisitLoader />

            {/* Custom Interactive Cursor */}
            <CustomCursor />

            {/* Navbar with Working Mobile Menu */}
            <Navbar />

            {/* Main Sections — each wrapped in section-level error boundary */}
            <main id="main-content">
                <ErrorBoundary fallbackLevel="section" sectionName="Hero">
                    <Hero />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="Showreel">
                    <Showreel />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="Services">
                    <Services />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="Projects">
                    <Projects />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="Photography">
                    <Photography />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="Graphics">
                    <Graphics />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="Skills">
                    <Skills />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="BeforeAfter">
                    <BeforeAfter />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="Timeline">
                    <Timeline />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="About">
                    <About />
                </ErrorBoundary>
                <ErrorBoundary fallbackLevel="section" sectionName="SocialProof">
                    <SocialProof />
                </ErrorBoundary>

                {/* Case Studies — hidden until real content is provided */}
                <CaseStudies studies={[]} />

                {/* FAQ Section */}
                <ErrorBoundary fallbackLevel="section" sectionName="FAQ">
                    <FAQ />
                </ErrorBoundary>

                <ErrorBoundary fallbackLevel="section" sectionName="Contact">
                    <Contact
                        onOpenPrivacy={() => setPrivacyOpen(true)}
                        onOpenTerms={() => setTermsOpen(true)}
                    />
                </ErrorBoundary>
            </main>

            {/* Sticky Mobile Call-to-Action Bar */}
            <StickyMobileCTA />

            {/* Offline notice banner */}
            <OfflineBanner />

            {/* GDPR / Performance Cookie Consent Banner */}
            <CookieBanner onOpenPrivacy={() => setPrivacyOpen(true)} />

            {/* Privacy Policy Modal */}
            {privacyOpen && (
                <PrivacyPolicyModal onClose={() => setPrivacyOpen(false)} />
            )}

            {/* Terms & Conditions Modal */}
            {termsOpen && (
                <TermsModal onClose={() => setTermsOpen(false)} />
            )}
        </>
    );
};

export default App;