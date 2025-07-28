// tanninn_js/data.js
const ALL_STUDENTS_DATA = [
    {
        id: 'S001',
        name: '山田 太郎',
        nameFurigana: 'ヤマダ タロウ',
        department: '情報工学',
        departmentCourse: '情報工学科・ソフトウェア開発コース', // 詳細用に具体的なコースを追加
        grade: '3年',
        enrollmentYear: '2023',
        enrollmentStatus: '在籍中',
        totalAttendance: 95,
        absentCount: 5,
        subjects: [
            { name: 'データ構造とアルゴリズム', absent: 1, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: 'オブジェクト指向プログラミング', absent: 0, tardy: 1, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: 'Webアプリケーション開発', absent: 2, tardy: 0, earlyLeave: 1, suspension: 0, detailLink: '#' }
        ]
    },
    {
        id: 'S002',
        name: '鈴木 花子',
        nameFurigana: 'スズキ ハナコ',
        department: '建築学',
        departmentCourse: '建築学科・意匠設計コース',
        grade: '2年',
        enrollmentYear: '2024',
        enrollmentStatus: '在籍中',
        totalAttendance: 88,
        absentCount: 12,
        subjects: [
            { name: '建築構造力学', absent: 3, tardy: 2, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: '建築史', absent: 2, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' }
        ]
    },
    {
        id: 'S003',
        name: '佐藤 健太',
        nameFurigana: 'サトウ ケンタ',
        department: '情報工学',
        departmentCourse: '情報工学科・ネットワークセキュリティコース',
        grade: '1年',
        enrollmentYear: '2025',
        enrollmentStatus: '在籍中',
        totalAttendance: 98,
        absentCount: 2,
        subjects: [
            { name: '情報科学基礎', absent: 0, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: 'プログラミング入門', absent: 0, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' }
        ]
    },
    {
        id: 'S004',
        name: '高橋 美咲',
        nameFurigana: 'タカハシ ミサキ',
        department: '電気電子工学',
        departmentCourse: '電気電子工学科・電力システムコース',
        grade: '4年',
        enrollmentYear: '2022',
        enrollmentStatus: '在籍中',
        totalAttendance: 92,
        absentCount: 8,
        subjects: [
            { name: '電気回路', absent: 1, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: '電子デバイス', absent: 0, tardy: 1, earlyLeave: 0, suspension: 0, detailLink: '#' }
        ]
    },
    {
        id: 'S005',
        name: '田中 裕子',
        nameFurigana: 'タナカ ユウコ',
        department: '機械工学',
        departmentCourse: '機械工学科・精密機械コース',
        grade: '3年',
        enrollmentYear: '2023',
        enrollmentStatus: '在籍中',
        totalAttendance: 90,
        absentCount: 10,
        subjects: [
            { name: '機械力学', absent: 2, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: '熱機関', absent: 1, tardy: 1, earlyLeave: 0, suspension: 0, detailLink: '#' }
        ]
    },
    {
        id: 'S006',
        name: '伊藤 雅人',
        nameFurigana: 'イトウ マサト',
        department: '情報工学',
        departmentCourse: '情報工学科・AI開発コース',
        grade: '2年',
        enrollmentYear: '2024',
        enrollmentStatus: '在籍中',
        totalAttendance: 96,
        absentCount: 4,
        subjects: [
            { name: '線形代数', absent: 0, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: 'Pythonプログラミング', absent: 1, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' }
        ]
    },
    {
        id: 'S007',
        name: '渡辺 真奈',
        nameFurigana: 'ワタナベ マナ',
        department: '建築学',
        departmentCourse: '建築学科・都市計画コース',
        grade: '1年',
        enrollmentYear: '2025',
        enrollmentStatus: '在籍中',
        totalAttendance: 99,
        absentCount: 1,
        subjects: [
            { name: '建築製図', absent: 0, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: '都市計画論', absent: 0, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' }
        ]
    },
    {
        id: 'S008',
        name: '中村 浩司',
        nameFurigana: 'ナカムラ コウジ',
        department: '電気電子工学',
        departmentCourse: '電気電子工学科・情報通信コース',
        grade: '3年',
        enrollmentYear: '2023',
        enrollmentStatus: '在籍中',
        totalAttendance: 85,
        absentCount: 15,
        subjects: [
            { name: '信号処理', absent: 3, tardy: 1, earlyLeave: 0, suspension: 0, detailLink: '#' },
            { name: '通信工学', absent: 2, tardy: 0, earlyLeave: 0, suspension: 0, detailLink: '#' }
        ]
    }
];

// tanninn_js/gakuseisyousai.js
// ALL_STUDENTS_DATA は data.js で定義されていると仮定します

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('studentSearchForm');
    const departmentSelect = document.getElementById('department-select');
    const gradeSelect = document.getElementById('grade-select');
    const studentNameSearch = document.getElementById('student-name-search');
    const studentListDiv = document.getElementById('student-list');
    const clearSearchButton = document.getElementById('clearSearch');

    // ALL_STUDENTS_DATA を参照
    const allStudents = ALL_STUDENTS_DATA;

    // 学生情報を表示する関数
    function displayStudents(students) {
        studentListDiv.innerHTML = ''; // 既存のリストをクリア

        students.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.classList.add('student-item');
            // 詳細ページへのリンクに学生のIDをクエリパラメータとして渡す
            studentItem.innerHTML = `
                <div>${student.id}</div>
                <div>${student.name}</div>
                <div>${student.department}</div>
                <div>${student.grade}</div>
                <div><a href="gakuseijyouhousyousai.html?id=${student.id}" class="detail-link">詳細</a></div>
            `;
            studentListDiv.appendChild(studentItem);
        });
    }

    // 初期表示（全ての学生を表示）
    displayStudents(allStudents);

    // 検索フォームの送信イベント
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // デフォルトのフォーム送信を防止

        const selectedDepartment = departmentSelect.value;
        const selectedGrade = gradeSelect.value;
        const keyword = studentNameSearch.value.toLowerCase(); // 小文字に変換して比較

        const filteredStudents = allStudents.filter(student => {
            const matchesDepartment = selectedDepartment === "" || student.department === selectedDepartment;
            const matchesGrade = selectedGrade === "" || student.grade === selectedGrade;
            const matchesKeyword = (student.name.toLowerCase().includes(keyword) || student.id.toLowerCase().includes(keyword));

            return matchesDepartment && matchesGrade && matchesKeyword;
        });

        displayStudents(filteredStudents);
    });

    // クリアボタンのクリックイベント
    clearSearchButton.addEventListener('click', () => {
        departmentSelect.value = ""; // 学科選択をリセット
        gradeSelect.value = "";      // 学年選択をリセット
        studentNameSearch.value = ""; // キーワード入力をリセット
        displayStudents(allStudents); // 全ての学生を再表示
    });
});