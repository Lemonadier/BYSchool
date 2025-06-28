/**
 * Main application script.
 * Handles routing, event listeners, and dynamically loads page renderers.
 */
document.addEventListener('DOMContentLoaded', function () {
    // --- Global Elements ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const dynamicContentArea = document.getElementById('dynamic-content-area');

    // --- Page Configuration ---
    // Maps page IDs to their data files and the corresponding renderer module.
    // The path to the renderer module is now stored instead of the function itself.
    const pageConfigs = {
        // Special page with its own logic
        'home': { rendererModule: './renderers/home.js' },

        // JSON-based list pages
        'staff': { file: 'staff.json', rendererModule: './renderers/staff.js' },
        'news': { file: 'news.json', rendererModule: './renderers/news.js' },
        'gallery': { file: 'gallery.json', rendererModule: './renderers/gallery.js' },
        'student-works': { file: 'student-works.json', rendererModule: './renderers/studentWorks.js' },
        'academic-calendar': { file: 'academic-calendar.json', rendererModule: './renderers/calendar.js' },
        'exam-schedule': { file: 'exam-schedule.json', rendererModule: './renderers/examSchedule.js' },
        'student-info': { file: 'student-info.json', rendererModule: './renderers/studentInfo.js' },
        'downloads': { file: 'documents/documents.json', rendererModule: './renderers/downloads.js' },

        // JSON-based detail page
        'news-detail': { file: 'news.json', rendererModule: './renderers/newsDetail.js' },

        // Static HTML pages (don't need a renderer module)
        'facebook-updates': { file: 'facebook-updates.html' },
        'vision': { file: 'vision.html' },
        'mission': { file: 'mission.html' },
        'calendar': { file: 'calendar.html' },
        'qa': { file: 'qa.html' },
        'contact': { file: 'contact.html' },
        'kids-science': {file: 'kids-science.html'},
        'students-development' : {file: 'students-development.html'},
        'nutrition' : {file: 'nutrition.html'}
    };

    /**
     * Loads page content dynamically based on the page ID.
     * It now uses dynamic import() to load renderer modules on demand.
     */
    async function loadPage(pageId, itemId = null, fromPopState = false) {
        dynamicContentArea.innerHTML = `<div class="p-8 text-center text-gray-500">กำลังโหลด...</div>`;
        
        try {
            const config = pageConfigs[pageId];
            if (!config) throw new Error(`No configuration found for page: ${pageId}`);

            let htmlContent = '';

            // --- Logic for different page types ---

            // Case 1: Static HTML page
            if (config.file && config.file.endsWith('.html')) {
                const response = await fetch(config.file);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                htmlContent = await response.text();
            }
            // Case 2: Dynamic page that needs a renderer module
            else if (config.rendererModule) {
                // Dynamically import the renderer module
                const rendererModule = await import(config.rendererModule);
                const renderer = rendererModule.default; // Assuming the function is exported as default

                let data = null;
                // Fetch data if a file is specified
                if (config.file) {
                    const response = await fetch(config.file);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    data = await response.json();
                }

                // Call the renderer with the appropriate data
                // For detail pages, find the specific item first
                if (pageId.includes('-detail') && itemId) {
                    const item = data.find(i => i.id == itemId);
                    if (!item) throw new Error(`Item with ID ${itemId} not found`);
                    htmlContent = renderer(item);
                } else {
                    htmlContent = await renderer(data); // `await` handles both sync and async renderers
                }
            } else {
                throw new Error(`Invalid configuration for page: ${pageId}`);
            }

            dynamicContentArea.innerHTML = htmlContent;

            // Update history state if it's a user navigation
            if (!fromPopState) {
                const state = { page: pageId, item: itemId };
                let path = `#/${pageId}${itemId ? `/${itemId}` : ''}`;
                history.pushState(state, '', path);
            }
        } catch (error) {
            console.error('Error loading page:', error);
            dynamicContentArea.innerHTML = `<div class="p-8 text-center text-red-500">ขออภัย, ไม่พบเนื้อหาสำหรับหน้านี้</div>`;
        } finally {
            // Cleanup UI
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Handles URL hash changes for routing.
     */
    function handleUrlChange() {
        const hash = window.location.hash;
        if (hash) {
            const path = hash.substring(2);
            const [pageId = 'home', itemId = null] = path.split('/');
            loadPage(pageId, itemId, true); 
        } else {
            loadPage('home'); 
        }
    }
    
    // --- Lightbox Functions ---
    function openLightbox(src) {
        if (lightbox && lightboxImage) {
            lightboxImage.src = src;
            lightbox.classList.remove('hidden');
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.add('hidden');
            lightboxImage.src = '';
        }
    }

    // --- Event Listeners ---

    // Mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    // Main navigation and event delegation for the whole body
    document.body.addEventListener('click', function(event) {
        const navItem = event.target.closest('.nav-item');
        const lightboxTrigger = event.target.closest('.lightbox-trigger');
        const slideControl = event.target.closest('[data-slide-control]');

        if (navItem) {
            event.preventDefault();
            const pageId = navItem.dataset.page;
            const itemId = navItem.dataset.id;
            loadPage(pageId, itemId);
            return;
        }

        if (slideControl) {
            event.preventDefault();
            const direction = slideControl.dataset.slideControl;
            const track = document.getElementById('slider-track');
            if (!track) return;

            let currentIndex = parseInt(track.dataset.currentIndex || '0');
            const imageCount = track.children.length;

            if (direction === 'next') {
                currentIndex = (currentIndex < imageCount - 1) ? currentIndex + 1 : 0;
            } else if (direction === 'prev') {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageCount - 1;
            }

            track.dataset.currentIndex = currentIndex;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            return;
        }

        if (lightboxTrigger) {
            event.preventDefault();
            // Use href for <a> tags, otherwise fall back to src for <img> tags
            openLightbox(lightboxTrigger.href || lightboxTrigger.src);
            return;
        }

        if (event.target === lightbox || event.target.closest('#lightbox-close')) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });

    // History API (back/forward buttons)
    window.addEventListener('popstate', handleUrlChange);
    
    // Initial page load
    handleUrlChange();
});
