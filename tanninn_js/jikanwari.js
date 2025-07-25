        // 定義する科目リスト
        const subjects = [
            "", // 空白選択肢（何もなし）
            "国語", "システム開発演習Ⅱ", "理科", "社会", "英語", "体育", "美術", "音楽", "家庭科", "情報", "物理", "化学", "生物", "歴史", "地理", "倫理", "現代文", "古典", "書道", "簿記"
        ];

        document.querySelectorAll('.subject-cell, .empty-cell').forEach(cell => {
            cell.addEventListener('click', function() {
                // すでにプルダウンメニューがある場合は何もしない
                if (this.querySelector('select')) {
                    return;
                }

                const currentText = this.textContent.trim();
                const selectElement = document.createElement('select');
                selectElement.classList.add('subject-select'); // スタイルを適用

                // 科目リストからoption要素を作成
                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject === "" ? "--- 選択してください ---" : subject; // 空白は「選択してください」と表示
                    if (subject === currentText) {
                        option.selected = true; // 現在の科目を初期選択
                    }
                    selectElement.appendChild(option);
                });

                // セルの中身を消して、プルダウンメニューを追加
                this.textContent = '';
                this.appendChild(selectElement);
                selectElement.focus(); // プルダウンメニューにフォーカスを当てる

                // プルダウンメニューが変更されたときの処理
                selectElement.addEventListener('change', () => {
                    const selectedSubject = selectElement.value;
                    this.textContent = selectedSubject; // 選択された科目をセルに表示

                    // クラスを適切に切り替える
                    if (selectedSubject !== '') {
                        this.classList.remove('empty-cell');
                        this.classList.add('subject-cell');
                        this.style.backgroundColor = ''; // CSSのデフォルトに戻す
                    } else {
                        this.classList.remove('subject-cell');
                        this.classList.add('empty-cell');
                        this.style.backgroundColor = ''; // CSSのデフォルトに戻す
                    }

                    // select要素を削除（テキスト表示に戻す）
                    this.removeChild(selectElement);
                });

                // プルダウンメニューからフォーカスが外れたとき（クリック以外で）
                selectElement.addEventListener('blur', () => {
                    // もしまだプルダウンメニューがある場合（changeイベントが発火しなかった場合など）
                    if (this.querySelector('select')) {
                        const selectedSubject = selectElement.value;
                        this.textContent = selectedSubject;

                        if (selectedSubject !== '') {
                            this.classList.remove('empty-cell');
                            this.classList.add('subject-cell');
                        } else {
                            this.classList.remove('subject-cell');
                            this.classList.add('empty-cell');
                        }
                        this.removeChild(selectElement);
                    }
                });
            });
        });