document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('register-btn');
    const callTemplateBtn = document.getElementById('call-template-btn');
    const modal = document.getElementById('modal');
    const modalYesBtn = document.getElementById('modal-yes-btn');
    const modalNoBtn = document.getElementById('modal-no-btn');

    // 「登録」ボタンのクリックイベント
    registerBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // モーダルウィンドウの「はい」ボタンのクリックイベント
    modalYesBtn.addEventListener('click', () => {
        // テンプレ一覧画面に遷移
        window.location.href = 'http://127.0.0.1:5500/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E4%B8%80%E8%A6%A7/template-list.html';
    });

    // モーダルウィンドウの「いいえ」ボタンのクリックイベント
    modalNoBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // 「テンプレを呼び出す」ボタンのクリックイベント
    callTemplateBtn.addEventListener('click', () => {
        // テンプレ一覧画面に遷移
        window.location.href = 'http://127.0.0.1:5500/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E4%B8%80%E8%A6%A7/template-list.html';
    });
});