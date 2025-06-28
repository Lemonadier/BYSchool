/**
 * Renders the gallery page from the provided data.
 * @param {Array<Object>} data - An array of image objects from gallery.json.
 * @returns {string} The HTML string for the gallery page.
 */
function renderGalleryPage(data) {
    if (!data || data.length === 0) return '<div class="p-8 text-center">ไม่พบรูปภาพในคลัง</div>';

    // Sort images by date in descending order (newest first)
    const sortedImages = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    const galleryImages = sortedImages.map((image) => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <a href="${image.imageUrl}" class="lightbox-trigger block">
                <img src="${image.imageUrl}" alt="${image.title}" class="w-full h-48 object-cover">
            </a>
            <div class="p-4">
                <h4 class="font-semibold text-center text-gray-800 truncate">${image.title}</h4>
                <p class="text-xs text-center text-gray-500">${image.date}</p>
            </div>
        </div>`).join('');

    return `
        <div class="bg-white p-8 rounded-xl shadow-lg">
            <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">คลังภาพกิจกรรม</h1>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                ${galleryImages}
            </div>
        </div>`;
}

export default renderGalleryPage;
