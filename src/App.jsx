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
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsModal from './components/TermsModal';
import CookieBanner from './components/CookieBanner';
import StickyMobileCTA from './components/StickyMobileCTA';

// Anti-Theft & Asset Protection Security Patch
import { initSecurityPatch } from './utils/securityPatch';

const App = () => {
    const [is404, setIs404] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [termsOpen, setTermsOpen] = useState(false);

    useEffect(() => {
        // Initialize strict client-side asset protection
        initSecurityPatch();

        // Check for 404 route / query / hash
        const checkRoute = () => {
            const path = window.location.pathname;
            const hash = window.location.hash;
            if (path.includes('404') || hash === '#404') {
                setIs404(true);
            } else {
                setIs404(false);
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

    if (is404) {
        return (
            <NotFound
                onReturn={() => {
                    setIs404(false);
                    window.history.pushState(null, '', '/');
                }}
            />
        );
    }

    return (
        <>
            {/* Custom Interactive Cursor */}
            <CustomCursor />

            {/* Navbar with Working Mobile Menu */}
            <Navbar />

            {/* Main Sections */}
            <main id="main-content">
                <Hero />
                <Showreel />
                <Services />
                <Projects />
                <Photography />
                <Graphics />
                <Skills />
                <BeforeAfter />
                <Timeline />
                <About />
                <SocialProof />
                <Contact
                    onOpenPrivacy={() => setPrivacyOpen(true)}
                    onOpenTerms={() => setTermsOpen(true)}
                />
            </main>

            {/* Sticky Mobile Call-to-Action Bar */}
            <StickyMobileCTA />

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