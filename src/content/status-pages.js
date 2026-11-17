// src/content/status-pages.js
// ─────────────────────────────────────────────────────────────
// All copy for status, error, loading and success pages.
// Edit text here — components import from this single file.
// ─────────────────────────────────────────────────────────────

export const notFoundPage = {
    tag: 'ERROR 404 • OUT OF FOCUS',
    code: '404',
    title: 'Lost in the Frames.',
    description:
        'The shot you are looking for has been cut in post-production or never existed. Let\u2019s get you back to the main reel.',
    buttons: {
        home: 'Back to Home',
        portfolio: 'View Portfolio',
        contact: 'Contact Me',
    },
};

export const crashPage = {
    tag: 'SOMETHING WENT WRONG',
    title: 'This frame didn\u2019t render.',
    description:
        'An unexpected error occurred. The rest of the site is fine — try reloading, or head back to the homepage.',
    buttons: {
        reload: 'Reload Page',
        home: 'Go Home',
        contact: 'Get in Touch',
    },
};

export const forbiddenPage = {
    tag: '403 • ACCESS EXPIRED',
    title: 'This link has expired.',
    description:
        'The page you\u2019re trying to reach is no longer available or requires a new link. Reach out and I\u2019ll sort it out.',
    buttons: {
        contact: 'Request a New Link',
        home: 'Go Home',
    },
};

export const maintenancePage = {
    tag: 'BACK SOON',
    title: 'Updating the studio.',
    description:
        'I\u2019m making some improvements behind the scenes. Everything will be back shortly.',
    email: 'creativelensesstore@gmail.com',
    emailLabel: 'Reach me directly:',
};

export const offlineBanner = {
    message: 'You\u2019re offline. Some things may not load.',
    dismiss: 'Dismiss',
};

export const thankYouPage = {
    tag: 'MESSAGE SENT',
    title: 'Thanks for reaching out!',
    description: 'I\u2019ll review your project details and get back to you within 24 hours. In the meantime, feel free to explore my latest work.',
    buttons: {
        home: 'Back to Home',
        instagram: 'Follow on Instagram',
    },
    instagramUrl: 'https://instagram.com/dangeakshat',
};

export const storeSuccessPage = {
    tag: 'PAYMENT RECEIVED',
    title: 'You\u2019re all set!',
    description:
        'Check your email for your download link. If it doesn\u2019t arrive within a few minutes, check your spam folder or contact me.',
    buttons: {
        contact: 'Contact Me',
        home: 'Back to Home',
    },
};

export const storeCancelledPage = {
    tag: 'PAYMENT CANCELLED',
    title: 'No payment was taken.',
    description:
        'Your order was cancelled and you haven\u2019t been charged. Feel free to try again whenever you\u2019re ready.',
    buttons: {
        shop: 'Back to Shop',
        home: 'Back to Home',
    },
};

export const emptyState = {
    title: 'Nothing here yet.',
    description: 'Check back soon — new content is on the way.',
};

export const loaderAlt = 'Creatively Lensed — loading';

export const faqSection = {
    label: 'FREQUENTLY ASKED QUESTIONS',
    title: 'FAQ',
    items: [
        {
            question: 'What services does Akshat Dange offer?',
            answer:
                'I offer reels and short-form video production, long-form brand films, photography and videography, video editing and color grading, social media management, brand establishment, Meta and Google Ads, website development, and performance analysis — all handled end to end from concept to final delivery.',
        },
        {
            question: 'Where is Creatively Lensed based?',
            answer:
                'I\u2019m based in Tathawade / Wakad, Pune, Maharashtra 411033, India. Studio shoots, outdoor sessions, and event coverage are all available across Pune and nearby locations. For projects outside the city, reach out and we\u2019ll work out the logistics together.',
        },
        {
            question: 'How can I contact Akshat for a project?',
            answer:
                'You can reach me through the contact form on this site, by emailing creativelensesstore@gmail.com, or by messaging me directly on WhatsApp at +91 8482872105. I typically respond within one business day and we can discuss scope, timeline, and rates.',
        },
        {
            question: 'What is the pricing structure for your services?',
            answer:
                'Every brand and project is unique. I offer bespoke per-project pricing for commercial films and photoshoots, as well as monthly retainer agreements for continuous reel production and social management — with clear deliverables, zero hidden fees, and defined timelines.',
        },
        {
            question: 'Can I see examples of your previous work?',
            answer:
                'Absolutely. Browse the Projects section on this site to see my work with NextGen Fitness Studio, Gymophilic, Visdom Studios clients, Creatively Lensed reels, E-Cell RSCOE, and automotive edits. The Photography Portfolio section also showcases portraits, product shots, and event photography.',
        },
        {
            question: 'What tools and equipment do you use?',
            answer:
                'I shoot on Sony a7 III, Nikon D5100, and smartphone cameras including iPhone and Samsung flagships. For editing and grading I use Adobe Premiere Pro and DaVinci Resolve Studio. Design work is handled in Photoshop, Lightroom, Figma, and Canva depending on the deliverable.',
        },
    ],
};
