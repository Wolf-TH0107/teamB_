document.addEventListener('DOMContentLoaded', () => {
    const studentIdInput = document.getElementById('studentId');
    const gradeInput = document.getElementById('grade');
    const nameInput = document.getElementById('name');
    const furiganaInput = document.getElementById('furigana');
    const searchButton = document.getElementById('searchButton');
    const searchResultsBody = document.getElementById('searchResultsBody');
    const detailDisplayButton = document.getElementById('detailDisplayButton');

    let selectedStudent = null; // 選択された学生のデータを保持

    // ダミーのデータ（実際にはバックエンドAPIから取得）
    const dummyStudents = [
        { id: 'S001', grade: '3', name: '山田 太郎', furigana: 'ヤマダ タロウ' },
        { id: 'S002', grade: '1', name: '鈴木 花子', furigana: 'スズキ ハナコ' },
        { id: 'S003', grade: '4', name: '田中 次郎', furigana: 'タナカ ジロウ' },
        { id: 'S004', grade: '2', name: '佐藤 恵', furigana: 'サトウ メグミ' },
        { id: 'S005', grade: '3', name: '高橋 健太', furigana: 'タカハシ ケンタ' },
        { id: 'S006', grade: '1', name: '渡辺 美咲', furigana: 'ワタナベ ミサキ' }
    ];

    // 検索ボタンクリック時の処理
    searchButton.addEventListener('click', () => {
        const studentId = studentIdInput.value.trim().toLowerCase();
        const grade = gradeInput.value.trim();
        const name = nameInput.value.trim().toLowerCase();
        const furigana = furiganaInput.value.trim().toLowerCase();

        // 検索結果をクリア
        searchResultsBody.innerHTML = '';
        selectedStudent = null; // 選択状態をリセット

        const results = dummyStudents.filter(student => {
            const matchesId = studentId ? student.id.toLowerCase().includes(studentId) : true;
            const matchesGrade = grade ? student.grade.includes(grade) : true;
            const matchesName = name ? student.name.toLowerCase().includes(name) : true;
            const matchesFurigana = furigana ? student.furigana.toLowerCase().includes(furigana) : true;
            return matchesId && matchesGrade && matchesName && matchesFurigana;
        });

        if (results.length > 0) {
            results.forEach(student => {
                const row = document.createElement('tr');
                row.dataset.studentId = student.id;
                row.dataset.grade = student.grade;
                row.dataset.name = student.name;
                row.dataset.furigana = student.furigana;

                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.grade}</td>
                    <td>${student.name}</td>
                    <td>${student.furigana}</td>
                    <td><button class="select-result-btn">選択</button></td>
                `;
                searchResultsBody.appendChild(row);
            });
        } else {
            const noResultsRow = document.createElement('tr');
            noResultsRow.innerHTML = `<td colspan="5">該当するユーザーはいません。</td>`;
            searchResultsBody.appendChild(noResultsRow);
        }
    });

    // 検索結果テーブル内の「選択」ボタンクリック時の処理
    searchResultsBody.addEventListener('click', (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('select-result-btn')) {
            const row = clickedElement.closest('tr');

            // 既に選択されている行があれば、そのハイライトを解除
            if (selectedStudent && selectedStudent.row) {
                selectedStudent.row.classList.remove('selected-row');
            }

            // 新しく選択された行をハイライト
            row.classList.add('selected-row');

            // 選択された学生の情報を保持
            selectedStudent = {
                id: row.dataset.studentId,
                grade: row.dataset.grade,
                name: row.dataset.name,
                furigana: row.dataset.furigana,
                row: row // 行のDOM要素も保持してハイライト解除に利用
            };
            console.log('選択された学生:', selectedStudent);
        }
    });

    // 詳細表示ボタンクリック時の処理
    detailDisplayButton.addEventListener('click', () => {
        if (selectedStudent) {
            alert(`選択された学生の詳細を表示します:\n学籍番号: ${selectedStudent.id}\n学年: ${selectedStudent.grade}\n名前: ${selectedStudent.name}\nフリガナ: ${selectedStudent.furigana}`);
            // ここに詳細画面への遷移やモーダル表示などのロジックを追加
            // 例: window.location.href = `student_detail.html?id=${selectedStudent.id}`;
        } else {
            alert('詳細を表示する学生を選択してください。');
        }
    });
});