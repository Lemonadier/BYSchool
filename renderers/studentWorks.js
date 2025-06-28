/**
 * Renders the student works page from the provided data.
 * @param {Array<Object>} data - An array of student work objects.
 * @returns {string} The HTML string for the student works page.
 */
function renderStudentWorksPage(data) {
    if (!data || data.length === 0) return '<div class="p-8 text-center">ไม่พบผลงานนักเรียน</div>';

    const workCards = data.map(work => `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl">
            <a href="${work.imageUrl}" class="lightbox-trigger block">
                <img src="${work.imageUrl}" alt="${work.title}" class="w-full h-48 object-cover">
            </a>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="font-bold text-xl text-blue-800 mb-2">${work.title}</h3>
                <p class="text-gray-600 mb-1">โดย: ${work.studentName}</p>
                <p class="text-sm text-gray-500 mb-3">ชั้น: ${work.class}</p>
                <p class="text-gray-700 flex-grow">${work.description}</p>
            </div>
        </div>`).join('');

    return `
        <div class="bg-white p-8 rounded-xl shadow-lg">
            <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">ผลงานนักเรียน</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${workCards}
            </div>
        </div>`;
}

export default renderStudentWorksPage;
