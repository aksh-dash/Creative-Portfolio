// src/utils/securityPatch.js
// Client-Side Asset Protection & Anti-Theft Security Utility

export const initSecurityPatch = () => {
    // In local development, do not obstruct debugging or testing
    if (import.meta.env.DEV) {
        return;
    }

    // 1. Console Warning & Legal Notice
    try {
        const bannerStyle = 'color: #ff3344; font-size: 20px; font-weight: 800;';
        const textStyle = 'color: #e5e5e5; font-size: 12px; line-height: 1.5; font-family: sans-serif;';
        console.log('%c⛔ COPYRIGHT & ASSET NOTICE', bannerStyle);
        console.log(
            '%cAll media assets, photography, video reels, graphic design, and code on this portfolio are the proprietary intellectual property of Akshat Dange (Creatively Lensed).\n\nUnauthorized downloading, scraping, copying, reverse engineering, or commercial use is strictly prohibited by copyright law.\n\nFor licensing or collaborations, contact: creativelensesstore@gmail.com',
            textStyle
        );
    } catch (e) {}

    // Toast element helper
    let toastTimeout = null;
    const showSecurityToast = (msg = '🔒 Protected Content: Asset downloading is disabled.') => {
        let toast = document.getElementById('security-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'security-toast';
            toast.style.position = 'fixed';
            toast.style.bottom = '24px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            toast.style.background = 'rgba(18, 18, 18, 0.95)';
            toast.style.backdropFilter = 'blur(16px)';
            toast.style.webkitBackdropFilter = 'blur(16px)';
            toast.style.border = '1px solid rgba(255, 60, 60, 0.4)';
            toast.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 30, 50, 0.25)';
            toast.style.color = '#ffffff';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '100px';
            toast.style.fontSize = '13px';
            toast.style.fontFamily = 'Inter, sans-serif';
            toast.style.fontWeight = '500';
            toast.style.letterSpacing = '-0.01em';
            toast.style.zIndex = '9999999';
            toast.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            toast.style.pointerEvents = 'none';
            document.body.appendChild(toast);
        }

        toast.innerText = msg;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            if (toast) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(80px)';
            }
        }, 2500);
    };

    // 2. Disable Right-Click Context Menu Across Media
    window.addEventListener('contextmenu', (e) => {
        const target = e.target;
        // If clicking on images, videos, canvas, or portfolio cards
        if (target && (target.tagName === 'IMG' || target.tagName === 'VIDEO' || target.tagName === 'CANVAS' || target.closest('.project-card') || target.closest('.photo-card'))) {
            e.preventDefault();
            showSecurityToast('🔒 Content Protected: Media extraction is disabled.');
            return false;
        }
    }, { capture: true });

    // 3. Disable Save Shortcut (Ctrl+S / Cmd+S)
    window.addEventListener('keydown', (e) => {
        const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const ctrl = isMac ? e.metaKey : e.ctrlKey;

        // Ctrl+S / Cmd+S (Save Page)
        if (ctrl && ['S', 's'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 Asset downloading is disabled.');
            return false;
        }
    }, { capture: true });

    // 4. Prevent Dragging Images, Videos, Canvases
    window.addEventListener('dragstart', (e) => {
        const target = e.target;
        if (target && (target.tagName === 'IMG' || target.tagName === 'VIDEO' || target.tagName === 'CANVAS')) {
            e.preventDefault();
            return false;
        }
    }, { capture: true });
};
