document.addEventListener('DOMContentLoaded', () => {
    const attendanceTable = document.getElementById('attendanceTable');
    const registerButton = document.getElementById('registerButton');
    const backButton = document.getElementById('backButton');

    // モーダル関連の要素
    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');
    const modalYesButton = document.getElementById('modalYes');
    const modalNoButton = document.getElementById('modalNo');
    const modalOkButton = document.getElementById('modalOk');

    // サンプルデータ（テスト用の名前データ）
    const students = [
        { id: 1, name: '田中 太郎' },
        { id: 2, name: '山田 花子' },
        { id: 3, name: '佐藤 健太' },
        { id: 4, name: '鈴木 美咲' },
        { id: 5, name: '高橋 隆' },
        { id: 6, name: '伊藤 梓' },
        { id: 7, name: '渡辺 亮' },
        { id: 8, name: '中村 恵子' },
        { id: 9, name: '小林 大輔' },
        { id: 10, name: '加藤 由美' },
        { id: 11, name: '吉田 隼人' },
        { id: 12, name: '佐々木 萌' },
        { id: 13, name: '山本 拓也' },
        { id: 14, name: '池田 紗耶' },
        { id: 15, name: '森本 悠' },
        { id: 16, name: '松本 麗奈' },
        { id: 17, name: '井上 翔太' }, 
        { id: 18, name: '木村 奈々' },
        { id: 19, name: '林 健太郎' },
        { id: 20, name: '阿部 彩香' },
        { id: 21, name: '斉藤 結衣' },
        { id: 22, name: '山崎 悟' },
        { id: 23, name: '福田 莉子' },
        { id: 24, name: '石川 陽菜' },
        { id: 25, name: '中野 悠斗' },
        { id: 26, name: '大野 健一' },
        { id: 27, name: '杉山 彩' },
        { id: 28, name: '西村 浩' },
        { id: 29, name: '原田 明美' },
        { id: 30, name: '三浦 聡' }
    ];

    const attendanceOptions = ['遅刻', '欠席', '公欠', '出欠停止'];

    /**
     * 各学生の出欠項目（名前、トグル、ドロップダウン）を生成する関数
     */
    function createAttendanceRows() {
        attendanceTable.innerHTML = ''; // 既存の内容をクリア

        students.forEach(student => {
            const row = document.createElement('div');
            row.classList.add('attendance-item-row');
            row.dataset.studentId = student.id; // 学生IDをデータ属性として保持

            // 1. 学生の名前
            const nameSpan = document.createElement('span');
            nameSpan.classList.add('student-name');
            nameSpan.textContent = student.name;
            row.appendChild(nameSpan);

            // 2. トグルスイッチ
            const toggleLabel = document.createElement('label');
            toggleLabel.classList.add('switch');
            const toggleInput = document.createElement('input');
            toggleInput.type = 'checkbox';
            toggleInput.classList.add('attendance-toggle'); // クラスを追加
            
            const sliderSpan = document.createElement('span');
            sliderSpan.classList.add('slider');
            toggleLabel.appendChild(toggleInput);
            toggleLabel.appendChild(sliderSpan);
            row.appendChild(toggleLabel);

            // 3. 青状態のラベル「出席」
            const blueStateLabel = document.createElement('span');
            blueStateLabel.classList.add('attendance-label', 'blue-state-label');
            blueStateLabel.textContent = '出席';
            row.appendChild(blueStateLabel);

            // 4. 赤状態のドロップダウン
            const redStateDropdownWrapper = document.createElement('div');
            redStateDropdownWrapper.classList.add('red-state-dropdown-wrapper');
            const dropdownDiv = document.createElement('div');
            dropdownDiv.classList.add('dropdown');
            const selectedOptionSpan = document.createElement('span');
            selectedOptionSpan.classList.add('selected-option'); // クラスを追加
            selectedOptionSpan.textContent = attendanceOptions[0]; // 初期値は「遅刻」
            const dropdownContentDiv = document.createElement('div');
            dropdownContentDiv.classList.add('dropdown-content');

            attendanceOptions.forEach(option => {
                const a = document.createElement('a');
                a.href = '#';
                a.dataset.value = option;
                a.textContent = option;
                dropdownContentDiv.appendChild(a);
            });

            dropdownDiv.appendChild(selectedOptionSpan);
            dropdownDiv.appendChild(dropdownContentDiv);
            redStateDropdownWrapper.appendChild(dropdownDiv);
            row.appendChild(redStateDropdownWrapper);

            attendanceTable.appendChild(row);

            // 初期状態の設定 (もし学生データにinitialStatusがある場合)
            if (student.initialStatus && attendanceOptions.includes(student.initialStatus)) {
                toggleInput.checked = true; // 赤状態にする
                selectedOptionSpan.textContent = student.initialStatus; // 初期値を設定
                blueStateLabel.style.display = 'none';
                redStateDropdownWrapper.style.display = 'block';
            } else {
                toggleInput.checked = false; // 青状態
                blueStateLabel.style.display = 'inline';
                redStateDropdownWrapper.style.display = 'none';
            }

            // 各行のトグルスイッチのイベントリスナーを設定
            toggleInput.addEventListener('change', () => {
                if (toggleInput.checked) {
                    // 赤状態
                    blueStateLabel.style.display = 'none';
                    redStateDropdownWrapper.style.display = 'block'; // block に変更
                } else {
                    // 青状態
                    blueStateLabel.style.display = 'inline';
                    redStateDropdownWrapper.style.display = 'none';
                    selectedOptionSpan.textContent = attendanceOptions[0]; // 遅刻に戻す
                    dropdownDiv.classList.remove('open'); // ドロップダウンを閉じる
                }
            });

            // 各行のドロップダウンの開閉イベントリスナーを設定
            dropdownDiv.addEventListener('click', (event) => {
                if (event.target === selectedOptionSpan || event.target.closest('.dropdown')) {
                     // 既に開いている他のドロップダウンを閉じる
                     document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
                        if (openDropdown !== dropdownDiv) { // クリックされたドロップダウン自身は閉じない
                            openDropdown.classList.remove('open');
                        }
                     });
                     dropdownDiv.classList.toggle('open');
                     event.stopPropagation(); // イベントが親要素に伝播しないように停止
                }
            });

            // 各行のドロップダウン項目選択イベントリスナーを設定
            dropdownContentDiv.addEventListener('click', (event) => {
                if (event.target.tagName === 'A') {
                    selectedOptionSpan.textContent = event.target.dataset.value;
                    dropdownDiv.classList.remove('open');
                    event.preventDefault();
                    event.stopPropagation(); // イベントが親要素に伝播しないように停止
                }
            });
        });
    }

    // ドロップダウンの外側がクリックされたときにすべてのドロップダウンを閉じる（汎用）
    document.addEventListener('click', (event) => {
        document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
            if (!openDropdown.contains(event.target)) {
                openDropdown.classList.remove('open');
            }
        });
    });

    // 初期表示で出欠行を生成
    createAttendanceRows();

    // --- モーダルウィンドウ関連の処理 ---

    // 「登録」ボタンクリックで確認モーダルを表示
    registerButton.addEventListener('click', () => {
        confirmModal.classList.add('show');
    });

    // 「はい」ボタンクリック
    modalYesButton.addEventListener('click', () => {
        confirmModal.classList.remove('show'); // 確認モーダルを閉じる

        // ここで実際の登録処理（データの収集など）を行う
        const attendanceData = [];
        document.querySelectorAll('.attendance-item-row').forEach(row => {
            const studentId = row.dataset.studentId;
            const studentName = row.querySelector('.student-name').textContent;
            const toggleInput = row.querySelector('.attendance-toggle');
            let status;

            if (toggleInput.checked) {
                // 赤状態の場合
                status = row.querySelector('.selected-option').textContent;
            } else {
                // 青状態の場合
                status = row.querySelector('.blue-state-label').textContent; // 「出席」
            }
            attendanceData.push({ id: studentId, name: studentName, status: status });
        });

        console.log('登録される出欠データ:', attendanceData);
        // 通常はここでサーバーへのPOSTリクエストなどを行う

        // 「登録しました」モーダルを表示
        successModal.classList.add('show');
    });

    // 「いいえ」ボタンクリック
    modalNoButton.addEventListener('click', () => {
        confirmModal.classList.remove('show'); // 確認モーダルを閉じる
        // 何もせず、現在の出欠一括登録画面に戻る
    });

    // 「OK」ボタンクリック（「登録しました」モーダル）
    modalOkButton.addEventListener('click', () => {
        successModal.classList.remove('show'); // 成功モーダルを閉じる
        // 担任の出欠登録画面に戻る（例: history.back() または特定のURLへ遷移）
        // 実際のアプリケーションでは、ここに適切なURLやルーティングを記述します。
        alert('担任の出欠登録画面に戻ります。（このアラートはデモ用です）');
        // 例: window.location.href = 'path/to/teacher_attendance_page.html';
        // あるいは、history.back() を使ってブラウザの履歴を戻る
        // history.back();
    });

    // 「戻る」ボタンのイベントリスナー (モーダルとは別に元々あったもの)
    // backButton.addEventListener('click', () => {
    //     alert('戻るボタンが押されました！');
    //      実際のアプリケーションでは、前の画面に戻る処理を記述します。
    //      例: history.back();
    // });
});