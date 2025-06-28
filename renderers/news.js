/**
 * Renders the news list page from the provided data.
 * @param {Array<Object>} data - An array of news article objects from news.json.
 * @returns {string} The HTML string for the news list page.
 */
function renderNewsPage(data) {
    if (!data || data.length === 0) return '<div class="p-8 text-center">ไม่พบข่าวประชาสัมพันธ์</div>';

    // Create a copy and sort it: important news first, then by date descending.
    const sortedData = [...data].sort((a, b) => {
        const aIsImportant = a.important === true;
        const bIsImportant = b.important === true;
        if (aIsImportant !== bIsImportant) {
            return bIsImportant - aIsImportant; // Puts true values first
        }
        return new Date(b.date) - new Date(a.date); // Secondary sort by date
    });

    const newsArticles = sortedData.map(article => {
        const isImportant = article.important === true;

        const containerClasses = isImportant
            ? 'bg-blue-50 border-l-4 border-blue-500 rounded-r-xl shadow-lg'
            : 'bg-white rounded-xl shadow-lg';

        const badgeHtml = isImportant
            ? '<span class="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full ml-4 flex-shrink-0">ข่าวสำคัญ</span>'
            : '';

        return `
            <div class="${containerClasses} overflow-hidden flex flex-col md:flex-row mb-6 transition-shadow duration-300 hover:shadow-xl">
                <img src="${article.imageUrls[0]}" alt="${article.title}" class="w-full md:w-64 h-60 md:h-auto object-cover flex-shrink-0">
                <div class="p-6 flex flex-col">
                    <div class="flex justify-between items-start mb-2">
                        <a href="#" data-page="news-detail" data-id="${article.id}" class="font-bold text-xl text-blue-800 nav-item">${article.title}</a>
                        ${badgeHtml}
                    </div>
                    <p class="text-sm text-gray-500 mb-3">${article.date}</p>
                    <p class="text-gray-700 flex-grow">${article.summary}</p>
                    <a href="#" data-page="news-detail" data-id="${article.id}" class="text-blue-600 hover:underline mt-4 self-start nav-item">อ่านเพิ่มเติม...</a>
                </div>
            </div>`;
    }).join('');

    return `
        <div class="bg-white p-8 rounded-xl shadow-lg">
            <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">ข่าวประชาสัมพันธ์</h1>
            <div>${newsArticles}</div>
        </div>`;
}

export default renderNewsPage;
