/**
 * Renders the exam schedule page.
 * @param {Array<Object>} data - An array of exam schedule blocks.
 * @returns {string} The HTML string for the exam schedule page.
 */
function renderExamSchedulePage(data) {
    if (!data || data.length === 0) return '<div class="p-8 text-center">ไม่พบข้อมูลตารางสอบ</div>';
    
    const scheduleBlocks = data.map(block => {
        const scheduleRows = block.schedule.map(row => `
            <tr>
                <td class="border px-4 py-2">${row.date}</td>
                <td class="border px-4 py-2">${row.time}</td>
                <td class="border px-4 py-2">${row.subject}</td>
            </tr>
        `).join('');

        return `
            <div class="mb-8">
                <h2 class="text-xl font-semibold text-blue-700 mb-2">${block.level}</h2>
                <p class="text-gray-600 mb-4">${block.note}</p>
                ${block.schedule.length > 0 ? `
                    <div class="overflow-x-auto">
                        <table class="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="px-4 py-2 border">วันที่</th>
                                    <th class="px-4 py-2 border">เวลา</th>
                                    <th class="px-4 py-2 border">วิชา</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${scheduleRows}
                            </tbody>
                        </table>
                    </div>` : ''}
            </div>`;
    }).join('');

    return `
        <div class="bg-white p-8 rounded-xl shadow-lg">
            <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">ตารางสอบปลายภาค</h1>
            ${scheduleBlocks}
        </div>`;
}

export default renderExamSchedulePage;
