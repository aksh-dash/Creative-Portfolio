// src/utils/securityPatch.js
// Client-side asset protection & anti-theft security patch

export const initSecurityPatch = () => {
    // 1. Console Warning & Legal Notice
    const bannerStyle = 'color: #ff3344; font-size: 24px; font-weight: 800; text-shadow: 0 0 10px rgba(255,0,50,0.5);';
    const textStyle = 'color: #f5f5f5; font-size: 13px; line-height: 1.6; font-family: sans-serif;';
    console.log('%c⛔ STOP &amp; COPYRIGHT NOTICE', bannerStyle);
    console.log(
        '%cAll media assets, photography, video reels, graphic design, and code on this portfolio are the proprietary intellectual property of Akshat Dange (Creatively Lensed).\n\nUnauthorized downloading, scraping, copying, reverse engineering, or commercial use is strictly prohibited by copyright law.\n\nFor licensing or collaborations, contact: dange.akshat2107@gmail.com',
        textStyle
    );

    // Toast element helper
    let toastTimeout = null;
    const showSecurityToast = (msg = '🔒 Protected Content: Asset downloading and developer inspection are disabled.') => {
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
        }, 2800);
    };

    // 2. Disable Right-Click Context Menu Across Site
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showSecurityToast('🔒 Content Protected: Right-click & asset extraction are disabled.');
        return false;
    }, { capture: true });

    // 3. Disable DevTools & View Source Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 Developer Tools inspection is disabled.');
            return false;
        }

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const ctrl = isMac ? e.metaKey : e.ctrlKey;

        // Ctrl+Shift+I / Cmd+Option+I (Inspect)
        // Ctrl+Shift+J / Cmd+Option+J (Console)
        // Ctrl+Shift+C / Cmd+Option+C (Elements)
        if (ctrl && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 Developer Tools inspection is disabled.');
            return false;
        }

        // Ctrl+U / Cmd+Option+U (View Source)
        if (ctrl && ['U', 'u'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 View Source is disabled.');
            return false;
        }

        // Ctrl+S / Cmd+S (Save Page)
        if (ctrl && ['S', 's'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 Asset downloading is disabled.');
            return false;
        }

        // Ctrl+P / Cmd+P (Print Page)
        if (ctrl && ['P', 'p'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 Document printing is disabled.');
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

    // 5. Anti-debugger hook (passive deterrent)
    setInterval(() => {
        const startTime = performance.now();
        // check if execution is artificially paused by DevTools debugger
        const check = () => {
            if (performance.now() - startTime > 100) {
                // Devtools debugger paused
                console.clear();
            }
        };
        check();
    }, 2000);
};
