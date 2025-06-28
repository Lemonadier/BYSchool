/**
 * Renders the downloads page.
 * @param {Array<Object>} data - An array of file objects for download.
 * @returns {string} The HTML string for the downloads page.
 */
function renderDownloadsPage(data) {
    let tableRowsHtml = '';

    if (!data || data.length === 0) {
        tableRowsHtml = '<tr><td colspan="3" class="text-center py-4">ไม่พบเอกสารให้ดาวน์โหลดในขณะนี้</td></tr>';
    } else {
        tableRowsHtml = data.map(file => `
            <tr>
                <td class="py-3 px-4 border-b">${file.name}</td>
                <td class="py-3 px-4 border-b text-center">${file.type}</td>
                <td class="py-3 px-4 border-b text-center">
                    <a href="${file.path}" download class="inline-block px-4 py-2 text-white transition-colors duration-300 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">ดาวน์โหลด</a>
                </td>
            </tr>
        `).join('');
    }

    return `
        <div class="bg-white p-8 rounded-xl shadow-lg">
            <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">ดาวน์โหลดเอกสาร</h1>
            <p class="text-gray-700 mb-6">เอกสารต่างๆ ที่เกี่ยวข้องกับโรงเรียน สามารถดาวน์โหลดได้จากตารางด้านล่าง</p>
            
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-200">
                    <thead class="bg-blue-100">
                        <tr>
                            <th class="py-3 px-4 border-b text-left text-sm font-semibold text-blue-800">ชื่อเอกสาร</th>
                            <th class="py-3 px-4 border-b text-center text-sm font-semibold text-blue-800">ประเภทไฟล์</th>
                            <th class="py-3 px-4 border-b text-center text-sm font-semibold text-blue-800">ดาวน์โหลด</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        ${tableRowsHtml}
                    </tbody>
                </table>
                <p class="text-sm text-gray-500 mt-4">* หมายเหตุ: หากไม่สามารถดาวน์โหลดไฟล์ได้ กรุณาติดต่อทางโรงเรียนโดยตรง</p>
            </div>
        </div>
    `;
}

export default renderDownloadsPage;
