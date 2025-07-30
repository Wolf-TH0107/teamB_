document.addEventListener('DOMContentLoaded', () => {
    const templateDisplay = document.querySelector('.template-display');
    const templateGrid = document.querySelector('.template-grid');
    const detailsButton = document.querySelector('.details-button');
    const useButton = document.querySelector('.use-button');
    const backButton = document.querySelector('.back-button');

    // モーダル関連の要素
    const modal = document.getElementById('templateDetailModal');
    const closeButton = document.querySelector('.close-button');
    const modalTemplateName = document.getElementById('modalTemplateName');
    const modalScheduleDetail = document.getElementById('modalScheduleDetail');

    const daysOfWeek = ['月', '火', '水', '木', '金']; // 曜日配列
    const timePeriods = ['1', '2', '3', '4']; // 時間帯配列

    // --- Placeholder for loading template data ---
    const mockTemplates = [
        {
            id: 1,
            name: 'テンプレA',
            schedule: {
                mon: { '1': '', '2': '', '3': '', '4': '' },
                tue: { '1': '', '2': '', '3': '', '4': '' },
                wed: { '1': '', '2': '', '3': '', '4': '' },
                thu: { '1': '', '2': '', '3': '', '4': '' },
                fri: { '1': '', '2': '', '3': '', '4': '' }
            }
        },
        {
            id: 2,
            name: 'テンプレB',
            schedule: {
                mon: { '1': '', '2': '', '3': '', '4': '' },
                tue: { '1': '', '2': '', '3': '', '4': '' },
                wed: { '1': '', '2': '', '3': '', '4': '' },
                thu: { '1': '', '2': '', '3': '', '4': '' },
                fri: { '1': '', '2': '', '3': '', '4': '' }
            }
        },
        {
            id: 3,
            name: 'テンプレC',
            schedule: {
                mon: { '1': '', '2': '', '3': '', '4': '' },
                tue: { '1': '', '2': '', '3': '', '4': '' },
                wed: { '1': '', '2': '', '3': '', '4': '' },
                thu: { '1': '', '2': '', '3': '', '4': '' },
                fri: { '1': '', '2': '', '3': '', '4': '' }
            }
        },
        {
            id: 4,
            name: 'テンプレD',
            schedule: {
                mon: { '1': '', '2': '', '3': '', '4': '' },
                tue: { '1': '', '2': '', '3': '', '4': '' },
                wed: { '1': '', '2': '', '3': '', '4': '' },
                thu: { '1': '', '2': '', '3': '', '4': '' },
                fri: { '1': '', '2': '', '3': '', '4': '' }
            }
        },
        // さらにテンプレートを追加してスクロールを試すことができます
        {
            id: 5,
            name: 'テンプレE',
            schedule: {
                mon: { '1': '', '2': '', '3': '', '4': '' },
                tue: { '1': '', '2': '', '3': '', '4': '' },
                wed: { '1': '', '2': '', '3': '', '4': '' },
                thu: { '1': '', '2': '', '3': '', '4': '' },
                fri: { '1': '', '2': '', '3': '', '4': '' }
            }
        },
        {
            id: 6,
            name: 'テンプレF',
            schedule: {
                mon: { '1': '', '2': '', '3': '', '4': '' },
                tue: { '1': '', '2': '', '3': '', '4': '' },
                wed: { '1': '', '2': '', '3': '', '4': '' },
                thu: { '1': '', '2': '', '3': '', '4': '' },
                fri: { '1': '', '2': '', '3': '', '4': '' }
            }
        }
    ];

    function loadTemplates() {
        templateGrid.innerHTML = ''; 
        mockTemplates.forEach(template => {
            const templateItem = document.createElement('div');
            templateItem.classList.add('template-item');
            templateItem.dataset.templateId = template.id;

            const templateName = document.createElement('div');
            templateName.classList.add('template-item-name');
            templateName.textContent = template.name;
            templateItem.appendChild(templateName);

            const templateScheduleGrid = document.createElement('div');
            templateScheduleGrid.classList.add('template-schedule-grid');

            // --- ヘッダー行 (空白セル + 月火水木金) ---
            const emptyCell = document.createElement('div');
            templateScheduleGrid.appendChild(emptyCell); // 左上の空白セル
            
            daysOfWeek.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.classList.add('grid-header-day');
                dayHeader.textContent = day;
                templateScheduleGrid.appendChild(dayHeader);
            });

            // --- 各時間帯の行 (時間 + 曜日ごとの内容) ---
            timePeriods.forEach(period => {
                const timeHeader = document.createElement('div');
                timeHeader.classList.add('grid-header-time');
                timeHeader.textContent = period; 
                templateScheduleGrid.appendChild(timeHeader);

                daysOfWeek.forEach((day, index) => {
                    const dayKey = ['mon', 'tue', 'wed', 'thu', 'fri'][index]; 
                    const cell = document.createElement('div');
                    cell.classList.add('grid-cell');
                    const content = template.schedule[dayKey] ? template.schedule[dayKey][period] : '';
                    cell.textContent = content || '';
                    cell.title = content || '';
                    templateScheduleGrid.appendChild(cell);
                });
            });

            templateItem.appendChild(templateScheduleGrid);
            templateGrid.appendChild(templateItem);
        });
    }

    // ページロード時にテンプレートを読み込む
    loadTemplates();

    // --- ボタンのイベントリスナー ---
    detailsButton.addEventListener('click', () => {
        const selectedTemplate = document.querySelector('.template-item.selected');
        if (selectedTemplate) {
            const templateId = selectedTemplate.dataset.templateId;
            const templateData = mockTemplates.find(t => t.id === parseInt(templateId));
            if (templateData) {
                // モーダルのコンテンツを更新
                modalTemplateName.textContent = templateData.name;
                modalScheduleDetail.innerHTML = ''; // 以前の内容をクリア

                // --- モーダル内の時間割グリッドを生成 ---
                // ヘッダー行
                const emptyCell = document.createElement('div');
                modalScheduleDetail.appendChild(emptyCell); 
                daysOfWeek.forEach(day => {
                    const dayHeader = document.createElement('div');
                    dayHeader.classList.add('grid-header-day');
                    dayHeader.textContent = day;
                    modalScheduleDetail.appendChild(dayHeader);
                });

                // 各時間帯の行
                timePeriods.forEach(period => {
                    const timeHeader = document.createElement('div');
                    timeHeader.classList.add('grid-header-time');
                    timeHeader.textContent = period;
                    modalScheduleDetail.appendChild(timeHeader);

                    daysOfWeek.forEach((day, index) => {
                        const dayKey = ['mon', 'tue', 'wed', 'thu', 'fri'][index];
                        const cell = document.createElement('div');
                        cell.classList.add('grid-cell');
                        const content = templateData.schedule[dayKey] ? templateData.schedule[dayKey][period] : '';
                        cell.textContent = content || '';
                        modalScheduleDetail.appendChild(cell);
                    });
                });

                // モーダルを表示
                modal.classList.add('active');
            }
        } else {
            alert('詳細を表示するテンプレートを選択してください。');
        }
    });

    // モーダルを閉じる関数
    function closeModal() {
        modal.classList.remove('active');
    }

    // 閉じるボタンがクリックされたとき
    closeButton.addEventListener('click', closeModal);

    // モーダル背景がクリックされたとき (モーダルコンテンツ以外)
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Escキーが押されたとき
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    useButton.addEventListener('click', () => {
        const selectedTemplate = document.querySelector('.template-item.selected');
        if (selectedTemplate) {
            const templateId = selectedTemplate.dataset.templateId;
            const templateData = mockTemplates.find(t => t.id === parseInt(templateId));
            if (templateData) {
                window.location.href = 'http://127.0.0.1:5500/%E6%99%82%E9%96%93%E5%89%B2%E7%A2%BA%E8%AA%8D/index.html';
                // ここで選択されたテンプレートのデータを適用するロジックを実装
            }
        } else {
            alert('使用するテンプレートを選択してください。');
        }
    });

    backButton.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5500/%E6%99%82%E9%96%93%E5%89%B2%E7%A2%BA%E8%AA%8D/index.html';
    });

    // --- テンプレートアイテムの選択ロジック ---
    templateGrid.addEventListener('click', (event) => {
        const clickedItem = event.target.closest('.template-item');
        if (clickedItem) {
            document.querySelectorAll('.template-item.selected').forEach(item => {
                item.classList.remove('selected');
            });
            clickedItem.classList.add('selected');
            console.log(`Template selected: ${clickedItem.querySelector('.template-item-name').textContent}`);
        }
    });
});