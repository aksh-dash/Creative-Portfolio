// src/App.jsx

import React, { useState, useEffect } from 'react';

// Layout
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import StickyMobileCTA from './components/layout/StickyMobileCTA';
import FirstVisitLoader from './components/layout/FirstVisitLoader';

// Sections
import Hero from './components/sections/Hero';
import Showreel from './components/sections/Showreel';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Photography from './components/sections/Photography';
import Graphics from './components/sections/Graphics';
import Skills from './components/sections/Skills';
import BeforeAfter from './components/sections/BeforeAfter';
import Timeline from './components/sections/Timeline';
import About from './components/sections/About';
import SocialProof from './components/sections/SocialProof';
import CaseStudies from './components/sections/CaseStudies';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';

// Common
import ErrorBoundary from './components/common/ErrorBoundary';
import OfflineBanner from './components/common/OfflineBanner';
import CookieBanner from './components/common/CookieBanner';

// Modals
import PrivacyPolicyModal from './components/modals/PrivacyPolicyModal';
import TermsModal from './components/modals/TermsModal';

// Pages
import NotFoundPage from './pages/NotFoundPage';
import StoreComingSoonPage from './pages/StoreComingSoonPage';
import ThankYouPage from './pages/ThankYouPage';
import StoreSuccessPage from './pages/StoreSuccessPage';
import StoreCancelledPage from './pages/StoreCancelledPage';
import ForbiddenPage from './pages/ForbiddenPage';
import MaintenancePage from './pages/MaintenancePage';

// Security
import { initSecurityPatch } from './utils/securityPatch';

// Configuration
import { ROUTES } from './config/routes';

// Maintenance mode check (set VITE_MAINTENANCE=true in Vercel env vars)
const IS_MAINTENANCE = import.meta.env.VITE_MAINTENANCE === 'true';

const App = ({ initialRoute = 'home' }) => {
    const [currentRoute, setCurrentRoute] = useState(initialRoute);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [termsOpen, setTermsOpen] = useState(false);

    useEffect(() => {
        initSecurityPatch();

        const checkRoute = () => {
            const path = window.location.pathname.toLowerCase();
            const hash = window.location.hash.toLowerCase();

            if (path === ROUTES.THANK_YOU || path === '/thankyou') {
                setCurrentRoute('thankyou');
            } else if (path === ROUTES.SUCCESS) {
                setCurrentRoute('store-success');
            } else if (path === ROUTES.CANCELLED) {
                setCurrentRoute('store-cancelled');
            } else if (path === ROUTES.FORBIDDEN || path === ROUTES.EXPIRED) {
                setCurrentRoute('forbidden');
            } else if (path.includes('404') || hash === '#404') {
                setCurrentRoute('404');
            } else if (path === ROUTES.STORE || path.startsWith(ROUTES.STORE) || path.includes('coming-soon') || hash === '#store') {
                setCurrentRoute('store');
            } else if (path === ROUTES.HOME || path === '') {
                setCurrentRoute('home');
            } else {
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

    // Maintenance mode: replaces entire app
    if (IS_MAINTENANCE) {
        return <MaintenancePage />;
    }

    // Status pages
    if (currentRoute === '404') {
        return <NotFoundPage onReturn={navigateHome} />;
    }

    if (currentRoute === 'store') {
        return (
            <StoreComingSoonPage
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

    // Main portfolio
    return (
        <>
            <FirstVisitLoader />
            <CustomCursor />
            <Navbar />

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

            <StickyMobileCTA />
            <OfflineBanner />
            <CookieBanner onOpenPrivacy={() => setPrivacyOpen(true)} />

            {privacyOpen && (
                <PrivacyPolicyModal onClose={() => setPrivacyOpen(false)} />
            )}
            {termsOpen && (
                <TermsModal onClose={() => setTermsOpen(false)} />
            )}
        </>
    );
};

export default App;
