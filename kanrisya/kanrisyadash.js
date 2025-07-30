document.addEventListener('DOMContentLoaded', () => {
    // メニューアイテムの要素を取得
    const studentRegistrationBtn = document.querySelector('.menu-item1');
    const userSearchBtn = document.querySelector('.menu-item2');
    const departmentCourseEditBtn = document.querySelector('.menu-item3');
    const attendanceRegistrationBtn = document.querySelector('.menu-item4');

    // その他のボタンの要素を取得
    const instructorScreenBtn = document.querySelector('.button:not(.highlight-button)');
    const userSettingsBtn = document.querySelector('.highlight-button');

    // 学生登録ボタンのクリックイベント
    if (studentRegistrationBtn) {
        studentRegistrationBtn.addEventListener('click', () => {
            window.location.href = 'student_registration.html'; // 遷移したいページのURLに修正してください
        });
    }

    // ユーザー検索ボタンのクリックイベント
    if (userSearchBtn) {
        userSearchBtn.addEventListener('click', () => {
            window.location.href = 'user_search.html'; // 遷移したいページのURLに修正してください
        });
    }

    // 学科・コース編集ボタンのクリックイベント
    if (departmentCourseEditBtn) {
        departmentCourseEditBtn.addEventListener('click', () => {
            window.location.href = 'http://127.0.0.1:5500/%E5%AD%A6%E7%A7%91%E3%83%BB%E3%82%B3%E3%83%BC%E3%82%B9%E4%B8%80%E8%A6%A7/index.html'; // 遷移したいページのURLに修正してください
        });
    }

    // 出欠登録ボタンのクリックイベント
    if (attendanceRegistrationBtn) {
        attendanceRegistrationBtn.addEventListener('click', () => {
            window.location.href = 'http://127.0.0.1:5500/%E5%87%BA%E6%AC%A0%E7%99%BB%E9%8C%B2/index.html'; // 遷移したいページのURLに修正してください
        });
    }

    // 担当・講師画面へボタンのクリックイベント
    if (instructorScreenBtn) {
        instructorScreenBtn.addEventListener('click', () => {
            window.location.href = 'instructor_screen.html'; // 遷移したいページのURLに修正してください
        });
    }

    // ユーザー設定へボタンのクリックイベント
    if (userSettingsBtn) {
        userSettingsBtn.addEventListener('click', () => {
            window.location.href = 'user_settings.html'; // 遷移したいページのURLに修正してください
        });
    }
});