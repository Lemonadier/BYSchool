/**
 * Renders the staff page from the provided data.
 * @param {Array<Object>} data - An array of staff member objects from staff.json.
 * @returns {string} The HTML string for the staff page.
 */
function renderStaffPage(data) {
    if (!data || data.length === 0) {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="bg-white p-8 rounded-xl shadow-lg text-center">ไม่พบบุคลากร</div>
            </div>`;
    }

    const staffCards = data.map(staff => `
        <div class="bg-white p-6 rounded-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 w-72">
            <img src="${staff.imageUrl}" alt="${staff.name}" class="w-32 h-32 rounded-full mb-4 object-cover border-4 border-blue-100 cursor-pointer lightbox-trigger">
            <h3 class="font-bold text-lg text-blue-800">${staff.name}</h3>
            <p class="text-gray-600">${staff.position}</p>
            ${staff.subject ? `<p class="text-sm text-gray-500 mt-1">วิชา: ${staff.subject}</p>` : ''}
            ${staff.phone ? `<p class="text-sm text-gray-500">ติดต่อ: ${staff.phone}</p>` : ''}
        </div>
    `).join('');

    return `
        <div class="container mx-auto px-4 py-8">
            <div class="bg-white p-8 rounded-xl shadow-lg">
                <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200 text-center">บุคลากร</h1>
                <div class="flex flex-col items-center gap-6">
                    ${staffCards}
                </div>
            </div>
        </div>`;
}

// Export the function as the default export
export default renderStaffPage;
