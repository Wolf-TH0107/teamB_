document.addEventListener('DOMContentLoaded', () => {
    const selectedDateInput = document.getElementById('selected-date');
    const calendarToggleBtn = document.getElementById('calendar-toggle-btn');
    const calendarContainer = document.getElementById('calendar-container');
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const newEntryButton = document.getElementById('new-entry-button');

    let currentMonth = new Date();
    let selectedDate = new Date();

    // 日本の祝日リスト（YYYY-MM-DD形式）
    // 注意: このリストは手動で更新するか、APIから取得する必要があります。
    // 2025年の祝日を追加しました
    const publicHolidays = [
        "2025-01-01", // 元日
        "2025-01-13", // 成人の日 (第2月曜日)
        "2025-02-11", // 建国記念の日
        "2025-02-24", // 天皇誕生日 (振替休日) - 2月23日が日曜のため
        "2025-03-20", // 春分の日
        "2025-04-29", // 昭和の日
        "2025-05-03", // 憲法記念日
        "2025-05-05", // こどもの日
        "2025-05-06", // こどもの日 振替休日 - 5月4日が日曜のため
        "2025-07-21", // 海の日 (第3月曜日)
        "2025-08-11", // 山の日
        "2025-09-15", // 敬老の日 (第3月曜日)
        "2025-09-23", // 秋分の日
        "2025-10-13", // スポーツの日 (第2月曜日)
        "2025-11-03", // 文化の日
        "2025-11-23", // 勤労感謝の日
        "2025-11-24", // 勤労感謝の日 振替休日 - 11月23日が日曜のため
    ];

    // 日付が祝日かどうかをチェックするヘルパー関数
    function isPublicHoliday(date) {
        const year = date.getFullYear();
        // 月と日を2桁にするためにpadStartを使用
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        return publicHolidays.includes(dateString);
    }

    // ページの初期化
    function initialize() {
        const today = new Date();
        selectedDate = today;
        updateSelectedDateDisplay(today);
        renderCalendar(today);
    }

    // 日付表示欄の更新
    function updateSelectedDateDisplay(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        selectedDateInput.value = `${year}年${month}月${day}日`;
    }

    // カレンダーの描画
    function renderCalendar(date) {
        calendarBody.innerHTML = ''; // カレンダーをクリア
        
        const year = date.getFullYear();
        const month = date.getMonth();
        currentMonthYear.textContent = `${year}年${month + 1}月`;
        
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        // JavaScriptのgetDay()は日曜日が0、月曜日が1...土曜日が6
        // カレンダーを日曜日始まりにするため、そのままgetDay()の値を使用
        let startDayOfWeek = firstDayOfMonth.getDay(); 
        
        const daysInMonth = lastDayOfMonth.getDate();

        // 月の最初の日が始まるまでの空のセルを埋める
        for (let i = 0; i < startDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarBody.appendChild(emptyCell);
        }

        // その月の日付を生成
        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = i;
            dayCell.dataset.day = i;
            
            const cellDate = new Date(year, month, i);
            const today = new Date();
            const dayOfWeek = cellDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

            // 今日の日付をハイライト
            if (cellDate.toDateString() === today.toDateString()) {
                dayCell.classList.add('today');
            }
            
            // **土日祝日の色付けと無効化ロジック**
            const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
            const isHoliday = isPublicHoliday(cellDate);

            // 曜日によるクラス追加
            if (dayOfWeek === 0) { // 日曜日
                dayCell.classList.add('sunday');
            } else if (dayOfWeek === 6) { // 土曜日
                dayCell.classList.add('saturday');
            }

            // 無効な日付（土日祝日）の処理
            if (isWeekend || isHoliday) {
                dayCell.classList.add('disabled'); // 無効な日付としてマーク
                // 祝日も日曜と同じ赤色にする (日曜でない祝日のみ)
                if (isHoliday && dayOfWeek !== 0) { 
                     dayCell.classList.add('sunday'); 
                }
            } else {
                // 有効な日付のみクリック可能にする
                if (cellDate.toDateString() === selectedDate.toDateString()) {
                    dayCell.classList.add('selected');
                }

                dayCell.addEventListener('click', () => {
                    // クリックされた日付が無効でないことを再確認
                    if (!dayCell.classList.contains('disabled')) {
                        const day = parseInt(dayCell.dataset.day);
                        selectedDate = new Date(year, month, day);
                        updateSelectedDateDisplay(selectedDate);
                        // 既存の選択を解除し、新しく選択された日付をハイライト
                        document.querySelectorAll('.calendar-day').forEach(cell => cell.classList.remove('selected'));
                        dayCell.classList.add('selected');
                        calendarContainer.classList.add('hidden'); // カレンダーを閉じる
                    }
                });
            }
            
            calendarBody.appendChild(dayCell);
        }
    }

    // カレンダー表示/非表示の切り替え
    calendarToggleBtn.addEventListener('click', () => {
        calendarContainer.classList.toggle('hidden');
    });

    // 前月ボタン
    prevMonthBtn.addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        renderCalendar(currentMonth);
    });

    // 次月ボタン
    nextMonthBtn.addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        renderCalendar(currentMonth);
    });

    // 新規入力ボタンのクリックイベント
    newEntryButton.addEventListener('click', () => {
        window.location.href='http://127.0.0.1:5500/%E6%99%82%E9%96%93%E5%89%B2%E7%99%BB%E9%8C%B2/template_enter.html';
    });

    // 初期化関数を呼び出し
    initialize();
});