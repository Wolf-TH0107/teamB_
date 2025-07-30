document.addEventListener('DOMContentLoaded', () => {
    const courseTableBody = document.getElementById('courseTableBody');
    const detailCourseNameInput = document.getElementById('detailCourseName');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');
    const backToAdminButton = document.getElementById('backToAdminButton');

    // ダミーの学科・コースデータ
    const courses = [
        { id: 'C001', name: '高度情報システム科 ITスペシャリストコース' },
        { id: 'C002', name: '高度情報システム科 Web・CGクリエイターコース' },
        { id: 'C003', name: '情報システム科 IT・エンジニアコース' },
        { id: 'C004', name: '情報システム科 Web・CGデザインコース' },
        { id: 'C005', name: '情報システム科 ビジネスコース' },
        { id: 'C006', name: '医療秘書科' },
        { id: 'C007', name: 'ホテル・ブライダル科' }
    ];

    let selectedCourseId = null; // 現在選択されている学科・コースのID

    /**
     * 学科・コース一覧をテーブルに表示する関数
     */
    function renderCourseTable() {
        courseTableBody.innerHTML = ''; // 既存の行をクリア

        courses.forEach(course => {
            const row = courseTableBody.insertRow();
            row.dataset.courseId = course.id; // 行にコースIDをデータ属性として保持

            row.addEventListener('click', () => { // 行全体のクリックイベント
            selectCourse(course.id);
        });

            const nameCell = row.insertCell();
            nameCell.textContent = course.name;

            const detailCell = row.insertCell();
            detailCell.classList.add('detail-col'); // CSSで中央寄せなど調整

            const detailButton = document.createElement('button');
            detailButton.textContent = '詳細';
            detailButton.classList.add('list-detail-button');
            detailButton.dataset.courseId = course.id; // ボタンにもIDを保持

            detailButton.addEventListener('click', (event) => {
                event.stopPropagation(); // 行のクリックイベントが発火しないようにする
                selectCourse(course.id);
            });

            detailCell.appendChild(detailButton);
        });
    }

    /**
     * 学科・コースが選択されたときの処理
     * @param {string} id - 選択されたコースのID
     */
    function selectCourse(id) {
        selectedCourseId = id; // 選択されたIDを保存
        const selectedCourse = courses.find(c => c.id === id); // IDに一致するコースオブジェクトを検索

        if (selectedCourse) {
            detailCourseNameInput.value = selectedCourse.name; // ★ここが選択したコース名を入力欄に表示する部分です★
            // 必要に応じて、選択された行の背景色を変更するなど
            Array.from(courseTableBody.rows).forEach(row => {
                if (row.dataset.courseId === id) {
                    row.style.backgroundColor = '#e0f2f7'; // 選択された行の色
                } else {
                    row.style.backgroundColor = ''; // その他の行はリセット
                }
            });
        } else {
            // 選択が見つからない場合（エラーケースなど）
            detailCourseNameInput.value = '';
            selectedCourseId = null;
        }
    }

    /**
     * 変更ボタンクリック時の処理
     */
    updateButton.addEventListener('click', () => {
        if (selectedCourseId) {
            const newCourseName = detailCourseNameInput.value.trim();
            if (!newCourseName) {
                alert('学科名・コース名を入力してください。');
                return;
            }

            const courseIndex = courses.findIndex(c => c.id === selectedCourseId);
            if (courseIndex !== -1) {
                courses[courseIndex].name = newCourseName;
                alert(`学科・コース "${newCourseName}" に変更しました。`);
                renderCourseTable(); // テーブルを再描画
                detailCourseNameInput.value = ''; // 入力欄をクリア
                selectedCourseId = null; // 選択状態をリセット
            } else {
                alert('エラー: 選択された学科・コースが見つかりません。');
            }
        } else {
            alert('変更する学科・コースを選択してください。');
        }
    });

    /**
     * 削除ボタンクリック時の処理
     */
    deleteButton.addEventListener('click', () => {
        if (selectedCourseId) {
            if (confirm(`選択中の学科・コースを削除してもよろしいですか？`)) {
                const initialLength = courses.length;
                // 選択されたID以外のコースをフィルタリングして新しい配列を作成
                courses.splice(0, courses.length, ...courses.filter(c => c.id !== selectedCourseId));

                if (courses.length < initialLength) {
                    alert('学科・コースを削除しました。');
                    renderCourseTable(); // テーブルを再描画
                    detailCourseNameInput.value = ''; // 入力欄をクリア
                    selectedCourseId = null; // 選択状態をリセット
                } else {
                    alert('エラー: 選択された学科・コースが見つかりません。');
                }
            }
        } else {
            alert('削除する学科・コースを選択してください。');
        }
    });

    /**
     * 管理者画面に戻るボタンクリック時の処理
     */
    backToAdminButton.addEventListener('click', () => {
        alert('管理者画面に戻ります。\n（実際には別ページへ遷移します。）');
        // 例: window.location.href = 'admin_dashboard.html';
    });

    // 初期表示時に一覧をレンダリング
    renderCourseTable();
});