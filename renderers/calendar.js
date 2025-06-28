/**
 * Renders the academic calendar page.
 * @param {Array<Object>} data - An array of calendar event objects.
 * @returns {string} The HTML string for the calendar page.
 */
function renderCalendarPage(data) {
    if (!data || data.length === 0) return '<div class="p-8 text-center">ไม่พบข้อมูลปฏิทิน</div>';

    const calendarItems = data.map(item => `
        <li class="flex items-center space-x-4 p-4 border-b border-gray-200 last:border-b-0">
            <div class="bg-blue-100 text-blue-800 font-bold p-3 rounded-lg text-center w-32 flex-shrink-0">
                ${item.date}
            </div>
            <p class="text-gray-800">${item.event}</p>
        </li>`).join('');

    return `
        <div class="bg-white p-8 rounded-xl shadow-lg">
            <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">ปฏิทินการศึกษา</h1>
            <ul class="list-none m-0 p-0">
                ${calendarItems}
            </ul>
        </div>`;
}

export default renderCalendarPage;
