document.addEventListener('DOMContentLoaded', () => {
    const courseNameSelect = document.getElementById('courseName');
    const admissionYearSelect = document.getElementById('admissionYear');
    const classSelect = document.getElementById('class');
    const userNameInput = document.getElementById('userName');
    const userIdInput = document.getElementById('userId');
    const searchButton = document.getElementById('searchButton');
    const searchResultsTableBody = document.querySelector('#searchResultsTable tbody');
    // const detailButtonColumn = document.querySelector('.detail-button-column'); // ★この行は不要になります★

    // inputForm.js で定義された関数とデータを使ってプルダウンを生成
    window.populateSelect(courseNameSelect, window.courseOptions);
    window.populateSelect(admissionYearSelect, window.yearOptions);
    window.populateSelect(classSelect, window.classOptions);

    // ダミーの検索結果データ
    const dummySearchResults = [
        { id: "T001", name: "佐藤 健", course: "高度情報システム科 ITスペシャリストコース", year: "2020年", class: "101" },
        { id: "T002", name: "高橋 由美", course: "情報システム科 Web・CGデザインコース", year: "2021年", class: "202" },
        { id: "T003", name: "鈴木 一郎", course: "医療秘書科", year: "2019年", class: "305" },
        { id: "T004", name: "渡辺 薫", course: "情報システム科 IT・エンジニアコース", year: "2022年", class: "102" },
        { id: "T005", name: "加藤 恵子", course: "ホテル・ブライダル科", year: "2020年", class: "201" },
        { id: "T006", name: "小林 誠", course: "高度情報システム科 Web・CGクリエイターコース", year: "2023年", class: "105" },
        { id: "T007", name: "中村 直樹", course: "情報システム科 ビジネスコース", year: "2022年", "class": "301" }
    ];

    /**
     * 検索結果を表示する関数
     * @param {Array<Object>} results - 表示する検索結果の配列
     */
    function displaySearchResults(results) {
        searchResultsTableBody.innerHTML = ''; // 既存の行をクリア
        // detailButtonColumn.innerHTML = ''; // ★この行は不要になります★

        results.forEach(item => {
            // テーブルに行を追加
            const row = searchResultsTableBody.insertRow();
            row.insertCell().textContent = item.id;
            row.insertCell().textContent = item.name;
            row.insertCell().textContent = item.course;
            row.insertCell().textContent = item.year;
            row.insertCell().textContent = item.class;

            // ★操作列のセルを作成し、その中にボタンを追加します★
            const actionCell = row.insertCell();
            const detailButton = document.createElement('button');
            detailButton.textContent = '詳細表示';
            detailButton.classList.add('detail-button');
            detailButton.dataset.userId = item.id; // ボタンにユーザーIDをデータ属性として保持
            actionCell.appendChild(detailButton); // セルにボタンを追加

            // ボタンクリックイベントリスナー
            detailButton.addEventListener('click', (event) => {
                const clickedUserId = event.target.dataset.userId;
                alert(`ユーザーID: ${clickedUserId} の詳細を表示します。\n（実際には別ページへ遷移したり、詳細情報を表示するモーダルを開いたりします。）`);
                // ここに詳細表示のためのロジックを追加
                // 例: window.location.href = `detail.html?id=${clickedUserId}`;
            });
        });
    }

    /**
     * 検索ボタンクリック時の処理
     */
    searchButton.addEventListener('click', () => {
        const selectedCourse = courseNameSelect.value;
        const selectedYear = admissionYearSelect.value;
        const selectedClass = classSelect.value;
        const userName = userNameInput.value.trim();
        const userId = userIdInput.value.trim();

        console.log("検索条件:");
        console.log(`学科・コース: ${selectedCourse}`);
        console.log(`入学年度: ${selectedYear}`);
        console.log(`クラス: ${selectedClass}`);
        console.log(`氏名: ${userName}`);
        console.log(`ユーザーID: ${userId}`);

        const filteredResults = dummySearchResults.filter(item => {
            const matchesCourse = !selectedCourse || item.course === selectedCourse;
            const matchesYear = !selectedYear || item.year === selectedYear;
            const matchesClass = !selectedClass || item.class === selectedClass;
            const matchesName = !userName || item.name.includes(userName);
            const matchesId = !userId || item.id.includes(userId);
            return matchesCourse && matchesYear && matchesClass && matchesName && matchesId;
        });

        displaySearchResults(filteredResults);

        if (filteredResults.length === 0) {
            alert('該当するユーザーは見つかりませんでした。');
        }
    });

    // 初期表示時に全てのダミーデータを表示
    displaySearchResults(dummySearchResults);
});