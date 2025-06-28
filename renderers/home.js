/**
 * Renders the home page.
 * It fetches its own data (home.html, news.json, gallery.json)
 * and constructs the complete HTML for the home page.
 */
async function renderHomePage() {
    // 1. Fetch all necessary data in parallel
    const [homeResponse, newsResponse, galleryResponse] = await Promise.all([
        fetch('home.html'),
        fetch('news.json'),
        fetch('gallery.json')
    ]);

    if (!homeResponse.ok || !newsResponse.ok || !galleryResponse.ok) {
        throw new Error('Failed to fetch home page data');
    }

    const homeTemplate = await homeResponse.text();
    const newsData = await newsResponse.json();
    const galleryData = await galleryResponse.json();

    // 2. Use DOMParser to safely manipulate the HTML template
    const parser = new DOMParser();
    const doc = parser.parseFromString(homeTemplate, 'text/html');
    const newsPlaceholder = doc.getElementById('home-news-content');
    const galleryPlaceholder = doc.getElementById('home-gallery-content');

    // 3. Generate and inject news content
    if (newsPlaceholder && newsData.length > 0) {
        // ... (โค้ดสร้างส่วนข่าวเหมือนเดิม) ...
        const featuredNews = newsData[0];
        const otherNews = newsData.slice(1, 3);

        const featuredNewsHtml = `
            <div class="md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <a href="#" data-page="news-detail" data-id="${featuredNews.id}" class="nav-item"> <img src="${featuredNews.imageUrls[0]}" alt="${featuredNews.title}" class="w-full h-64 object-cover"></a>
                <div class="p-6">
                    <a href="#" data-page="news-detail" data-id="${featuredNews.id}" class="font-bold text-xl mb-2 nav-item">${featuredNews.title}</a>
                    <p class="text-gray-600">${featuredNews.summary}</p>
                    <a href="#" data-page="news-detail" data-id="${featuredNews.id}" class="text-blue-600 hover:underline mt-4 inline-block nav-item">อ่านต่อ...</a>
                </div>
            </div>`;
        const otherNewsHtml = otherNews.map(article => `
             <div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <img src="${article.imageUrls[0]}" alt="${article.title}" class="w-20 h-20 rounded-md object-cover">
                <div>
                    <h4 class="font-semibold">${article.title}</h4>
                    <p class="text-sm text-gray-500">${article.date}</p>
                </div>
             </div>
        `).join('');
        newsPlaceholder.innerHTML = featuredNewsHtml + otherNewsHtml;
    }

    // 4. Generate and inject gallery content
    if (galleryPlaceholder && galleryData.length > 0) {
        // ... (โค้ดสร้างส่วนแกลเลอรี่เหมือนเดิม) ...
        const sortedImages = galleryData.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestImages = sortedImages.slice(0, 4); 
        const galleryHtml = latestImages.map(image => `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src="${image.imageUrl}" alt="${image.title}" class="w-full h-40 object-cover">
                <div class="p-3"><h4 class="font-semibold text-center">${image.title}</h4></div>
            </div>
        `).join('');
        galleryPlaceholder.innerHTML = galleryHtml;
    }

    // 5. Return the final HTML
    return doc.body.innerHTML;
}

// Export the function as the default export for this module
export default renderHomePage;
