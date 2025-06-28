/**
 * Renders the student information page.
 * @param {Array<Object>} data - An array of student data objects (usually one per year).
 * @returns {string} The HTML string for the student info page.
 */
function renderStudentInfoPage(data) {
    // Assuming data is an array and we want the first (or latest) entry
    const studentData = data ? data[0] : null;

    if (!studentData) {
        return `
            <div class="bg-white p-8 rounded-xl shadow-lg">
                <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">ข้อมูลนักเรียน</h1>
                <p class="text-gray-700">ไม่พบข้อมูลนักเรียน</p>
            </div>
        `;
    }

    const classRows = studentData.classBreakdown.map(cls => `
        <tr>
            <td class="py-3 px-4 border-b">${cls.level}</td>
            <td class="py-3 px-4 border-b text-center">${cls.male}</td>
            <td class="py-3 px-4 border-b text-center">${cls.female}</td>
            <td class="py-3 px-4 border-b text-center font-bold">${cls.total}</td>
        </tr>
    `).join('');

    return `
        <div class="bg-white p-8 rounded-xl shadow-lg">
            <h1 class="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">ข้อมูลนักเรียน</h1>
            <p class="text-gray-700 mb-6">ข้อมูลจำนวนนักเรียนโรงเรียนบ้านหยวก ประจำปีการศึกษา ${studentData.year}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-blue-50 p-6 rounded-lg text-center">
                    <h2 class="text-4xl font-bold text-blue-800">${studentData.totalStudents}</h2>
                    <p class="text-gray-600 mt-2">นักเรียนทั้งหมด</p>
                </div>
                <div class="bg-green-50 p-6 rounded-lg text-center">
                    <h2 class="text-4xl font-bold text-green-800">${studentData.maleStudents}</h2>
                    <p class="text-gray-600 mt-2">นักเรียนชาย</p>
                </div>
                <div class="bg-pink-50 p-6 rounded-lg text-center">
                    <h2 class="text-4xl font-bold text-pink-800">${studentData.femaleStudents}</h2>
                    <p class="text-gray-600 mt-2">นักเรียนหญิง</p>
                </div>
            </div>

            <div class="overflow-x-auto">
                <h3 class="text-xl font-semibold text-blue-700 mb-4">จำนวนนักเรียนแยกตามระดับชั้น</h3>
                <table class="min-w-full bg-white border border-gray-200">
                    <thead class="bg-blue-100">
                        <tr>
                            <th class="py-3 px-4 border-b text-left text-sm font-semibold text-blue-800">ระดับชั้น</th>
                            <th class="py-3 px-4 border-b text-center text-sm font-semibold text-blue-800">ชาย</th>
                            <th class="py-3 px-4 border-b text-center text-sm font-semibold text-blue-800">หญิง</th>
                            <th class="py-3 px-4 border-b text-center text-sm font-semibold text-blue-800">รวม</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        ${classRows}
                        <tr class="bg-blue-50 font-bold">
                            <td class="py-3 px-4 border-b text-right">รวมทั้งหมด</td>
                            <td class="py-3 px-4 border-b text-center">${studentData.maleStudents}</td>
                            <td class="py-3 px-4 border-b text-center">${studentData.femaleStudents}</td>
                            <td class="py-3 px-4 border-b text-center">${studentData.totalStudents}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-sm text-gray-500 mt-4">* หมายเหตุ: ข้อมูล ณ ปีการศึกษา ${studentData.year}</p>
            </div>
        </div>
    `;
}

export default renderStudentInfoPage;
