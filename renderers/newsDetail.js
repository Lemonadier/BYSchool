/**
 * Finds URLs in a string and wraps them in an anchor tag.
 * @param {string} text The text to process.
 * @returns {string} Text with URLs converted to HTML links.
 */
function autoLinker(text) {
    if (!text) return '';
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\bwww\.[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$])/ig;
    return text.replace(urlPattern, (url) => {
        const href = url.startsWith('www.') ? `http://${url}` : url;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`;
    });
}

/**
 * Renders the news detail page for a single article.
 * @param {Object} article - The news article object.
 * @returns {string} The HTML string for the news detail page.
 */
function renderNewsDetailPage(article) {
    if (!article) return '<div class="p-8 text-center">ไม่พบข้อมูลข่าว</div>';

    // --- Process multi-line content from JSON ---
    let contentHtml = '';
    if (Array.isArray(article.fullContent)) {
        const linkedLines = article.fullContent.map(line => autoLinker(line)).join('<br>');
        contentHtml = `<p>${linkedLines}</p>`;
    } else {
        contentHtml = `<p>${autoLinker(article.fullContent || '')}</p>`;
    }

    // --- Image Slider Setup ---
    const hasMultipleImages = Array.isArray(article.imageUrls) && article.imageUrls.length > 1;

    const imagesHtml = article.imageUrls.map(url => `
        <div class="w-full flex-shrink-0">
            <a href="${url}" class="lightbox-trigger">
                <img src="${url}" alt="${article.title}" class="w-full h-64 md:h-96 object-cover">
            </a>
        </div>
    `).join('');

    const sliderControlsHtml = hasMultipleImages ? `
        <button data-slide-control="prev" class="absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full p-2 focus:outline-none transition-colors z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button data-slide-control="next" class="absolute top-1/2 right-3 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full p-2 focus:outline-none transition-colors z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
    ` : '';

    const imageContainerHtml = `
        <div class="relative w-full overflow-hidden rounded-lg mb-6 bg-gray-200">
            <div id="slider-track" class="flex transition-transform duration-300 ease-in-out" data-current-index="0">
                ${imagesHtml}
            </div>
            ${sliderControlsHtml}
        </div>`;

    return `
        <div class="bg-white p-4 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
            <a href="#" class="text-blue-600 hover:underline mb-6 inline-block nav-item" data-page="news">&larr; กลับไปหน้ารวมข่าว</a>
            <h1 class="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">${article.title}</h1>
            <p class="text-sm text-gray-500 mb-6">${article.date}</p>
            ${imageContainerHtml}
            <div class="prose prose-blue max-w-none text-gray-800 break-words">
                ${contentHtml}
            </div>
        </div>`;
}

export default renderNewsDetailPage;
