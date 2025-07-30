document.addEventListener('DOMContentLoaded', () => {
    const admissionYearSelect = document.getElementById('admissionYear');
    const classSelect = document.getElementById('class');
    const registerButton = document.getElementById('registerButton');
    const resetButton = document.getElementById('resetButton');
    const cancelButton = document.getElementById('cancelButton');
    const studentTableBody = document.getElementById('studentTableBody');
    const registeredCountSpan = document.getElementById('registeredCount');
    const departmentSelect = document.getElementById('department');
    const courseInput = document.getElementById('course');

    let registeredStudents = [];
    let studentIdCounter = 100; // 学籍番号の初期値 (画像に合わせて)

    // 入学年度のドロップダウンを生成
    function populateAdmissionYears() {
        const currentYear = new Date().getFullYear();
        // 画像を参考に、現在の年から上下6年を表示
        for (let i = currentYear + 6; i >= currentYear - 6; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i}年`;
            admissionYearSelect.appendChild(option);
        }
        // デフォルトで今年のオプションを選択
        admissionYearSelect.value = currentYear;
    }

    // クラスのドロップダウンを生成 (画像に合わせて)
    function populateClasses() {
        // 例として101から308まで
        classSelect.innerHTML = '<option value="">選択してください</option>';
        const classes = [101, 102, 105, 201, 202, 203, 301, 302, 303, 304, 305, 306, 307, 308];
        classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls;
            option.textContent = cls;
            classSelect.appendChild(option);
        });
    }

    // 学生データをテーブルに表示する関数
    function renderStudentTable() {
        studentTableBody.innerHTML = ''; // テーブルをクリア
        if (registeredStudents.length === 0) {
            const row = studentTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 4;
            cell.textContent = '登録された学生はいません。';
            cell.style.textAlign = 'center';
            cell.style.color = '#888';
            return;
        }

        registeredStudents.forEach(student => {
            const row = studentTableBody.insertRow();
            row.insertCell().textContent = student.studentId;
            row.insertCell().textContent = student.grade;
            row.insertCell().textContent = student.name;
            row.insertCell().textContent = student.furigana;
        });
        registeredCountSpan.textContent = registeredStudents.length;
    }

    // 登録ボタンのイベントリスナー
    registerButton.addEventListener('click', () => {
        const department = departmentSelect.value;
        const admissionYear = admissionYearSelect.value;
        const className = classSelect.value;
        const course = courseInput.value;

        if (!department || !admissionYear || !className) {
            alert('学科名、入学年度、クラスは必須項目です。');
            return;
        }

        // ダミーの学生データを生成 (今回は入力された項目を表示するため、適当なデータを生成)
        // 実際にはここで名前やフリガナを入力するフォームがあるはず
        const dummyName = `学生${registeredStudents.length + 1}`;
        const dummyFurigana = `ガクセイ${registeredStudents.length + 1}`;

        const newStudent = {
            studentId: `S${studentIdCounter++}`, // 仮の学籍番号
            grade: `${admissionYear}年度`, // 学年として入学年度を使用
            name: dummyName,
            furigana: dummyFurigana,
            department: department,
            course: course,
            admissionYear: admissionYear,
            className: className
        };

        registeredStudents.push(newStudent);
        renderStudentTable(); // テーブルを更新

        // フォームをリセット (任意)
        // departmentSelect.value = '';
        // courseInput.value = '';
        // classSelect.value = ''; // クラスはリセットしない場合もある
    });

    // リセットボタンのイベントリスナー
    resetButton.addEventListener('click', () => {
        departmentSelect.value = '';
        courseInput.value = '';
        admissionYearSelect.value = new Date().getFullYear(); // 初期値に戻す
        classSelect.value = '';
        registeredStudents = [];
        studentIdCounter = 100; // カウンターもリセット
        renderStudentTable();
    });

    // キャンセルボタンのイベントリスナー
    cancelButton.addEventListener('click', () => {
        alert('キャンセルされました。');
        // 必要に応じて、画面遷移や他の処理を追加
    });

    // 初期化
    populateAdmissionYears();
    populateClasses();
    renderStudentTable(); // 初期表示でテーブルを空にする
});