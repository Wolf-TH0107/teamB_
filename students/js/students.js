document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.getElementById('createButton');
    const gakkaNameChangeInput = document.getElementById('gakkaNameChangeInput');
    const changeGakkaNameButton = document.getElementById('changeGakkaNameButton');
    const gakkaSelect = document.getElementById('gakkaSelect');
    const courseNameChangeInput = document.getElementById('courseNameChangeInput');
    const changeCourseNameButton = document.getElementById('changeCourseNameButton');
    const displayedGakkaName = document.getElementById('displayedGakkaName');
    const displayedCourseName = document.getElementById('displayedCourseName');
    const selectedStudentInfo = document.getElementById('selectedStudentInfo');
    const modifyButton = document.getElementById('modifyButton');
    const deleteButton = document.getElementById('deleteButton');
    const backToAdminButton = document.getElementById('backToAdminButton');

    const studentInfoListArea = document.getElementById('studentInfoListArea');

    let selectedStudent = {
        id: '',
        grade: '',
        name: '',
        furigana: '',
        gakka: '',
        course: ''
    };
    let selectedRow = null; // 選択された行のDOM要素

    function updateDisplayedStudentInfo() {
        if (selectedStudent.id) {
            displayedGakkaName.textContent = selectedStudent.gakka || '未選択';
            displayedCourseName.textContent = selectedStudent.course || '未選択';
            selectedStudentInfo.textContent =
                `学籍番号: ${selectedStudent.id}, 名前: ${selectedStudent.name}`;
        } else {
            displayedGakkaName.textContent = '未選択';
            displayedCourseName.textContent = '未選択';
            selectedStudentInfo.textContent = 'なし';
        }
    }
    updateDisplayedStudentInfo();

    createButton.addEventListener('click', () => {
        alert('新規作成機能が実行されます。');
    });

    changeGakkaNameButton.addEventListener('click', () => {
        const newGakkaName = gakkaNameChangeInput.value.trim();
        if (newGakkaName) {
            if (selectedStudent.id && selectedRow) { // selectedRowも確認
                selectedStudent.gakka = newGakkaName;
                const gakkaCell = selectedRow.querySelector('td:nth-child(5)'); // 5列目が学科名
                if (gakkaCell) {
                    gakkaCell.textContent = newGakkaName;
                    selectedRow.dataset.gakka = newGakkaName; // data属性も更新
                }
                updateDisplayedStudentInfo();
                alert(`選択中の学生の学科名が「${newGakkaName}」に変更されました。`);
            } else {
                alert('変更する学生を選択してください。');
            }
            gakkaNameChangeInput.value = '';
        } else {
            alert('新しい学科名を入力してください。');
        }
    });

    changeCourseNameButton.addEventListener('click', () => {
        const selectedGakkaForCourse = gakkaSelect.value;
        const newCourseName = courseNameChangeInput.value.trim();

        if (!selectedGakkaForCourse) {
            alert('コースを変更するには、まず学科を選択してください。');
            return;
        }

        if (newCourseName) {
            if (selectedStudent.id && selectedRow) { // selectedRowも確認
                selectedStudent.gakka = selectedGakkaForCourse;
                selectedStudent.course = newCourseName;

                const gakkaCell = selectedRow.querySelector('td:nth-child(5)'); // 5列目が学科名
                const courseCell = selectedRow.querySelector('td:nth-child(6)'); // 6列目がコース名
                if (gakkaCell && courseCell) {
                    gakkaCell.textContent = selectedGakkaForCourse; // 学科も更新
                    selectedRow.dataset.gakka = selectedGakkaForCourse;

                    courseCell.textContent = newCourseName;
                    selectedRow.dataset.course = newCourseName;
                }
                updateDisplayedStudentInfo();
                alert(`選択中の学生のコース名が「${newCourseName}」に変更されました。（学科: ${selectedGakkaForCourse}）`);
            } else {
                alert('変更する学生を選択してください。');
            }
            courseNameChangeInput.value = '';
            gakkaSelect.value = '';
        } else {
            alert('新しいコース名を入力してください。');
        }
    });

    modifyButton.addEventListener('click', () => {
        if (selectedStudent.id) {
            alert(`選択中の学生（学籍番号: ${selectedStudent.id}, 名前: ${selectedStudent.name}, 学科: ${selectedStudent.gakka}, コース: ${selectedStudent.course}）の情報を変更します。`);
        } else {
            alert('変更する学生を選択してください。');
        }
    });

    deleteButton.addEventListener('click', () => {
        if (selectedStudent.id) {
            if (confirm(`選択中の学生（学籍番号: ${selectedStudent.id}, 名前: ${selectedStudent.name}）を本当に削除しますか？`)) {
                alert('削除処理を実行します。');
                if (selectedRow) {
                    selectedRow.remove();
                }
                selectedStudent = { id: '', grade: '', name: '', furigana: '', gakka: '', course: '' };
                selectedRow = null; // 削除後に選択状態をクリア
                updateDisplayedStudentInfo();
            }
        } else {
            alert('削除する学生を選択してください。');
        }
    });

    backToAdminButton.addEventListener('click', () => {
        alert('管理者画面に戻ります。');
    });

    // ★ここから修正点★
    studentInfoListArea.addEventListener('click', (event) => {
        // クリックされたのが選択ボタン、またはその親要素がtrの場合に処理
        const clickedElement = event.target;
        const row = clickedElement.closest('tr');

        if (row && clickedElement.classList.contains('select-student-btn')) {
            // 既に選択されている行があれば、そのハイライトを解除
            if (selectedRow) {
                selectedRow.classList.remove('selected-row');
            }

            // 新しく選択された行をハイライト
            selectedRow = row;
            selectedRow.classList.add('selected-row');

            // data属性から学生情報を取得
            selectedStudent.id = row.dataset.studentId;
            selectedStudent.grade = row.dataset.grade;
            selectedStudent.name = row.dataset.name;
            selectedStudent.furigana = row.dataset.furigana;
            selectedStudent.gakka = row.dataset.gakka || '未設定'; // テーブルデータから学科も取得
            selectedStudent.course = row.dataset.course || '未設定'; // テーブルデータからコースも取得

            updateDisplayedStudentInfo(); // 表示を更新
            console.log('選択された学生:', selectedStudent);
        }
    });
    // ★修正点ここまで★
});