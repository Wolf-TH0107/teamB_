// inputForm.js
// このファイルは、前回のコードからフォームのプルダウン生成部分を抜き出したものです。

// 各プルダウンの選択肢データ
const courseOptions = [
    "高度情報システム科 ITスペシャリストコース",
    "高度情報システム科 Web・CGクリエイターコース",
    "情報システム科 IT・エンジニアコース",
    "情報システム科 Web・CGデザインコース",
    "情報システム科 ビジネスコース",
    "医療秘書科",
    "ホテル・ブライダル科"
];

const yearOptions = Array.from({ length: 13 }, (_, i) => 2019 + i).map(String); // 2019年から2031年まで

const classOptions = [
    "101", "102", "105", "201", "202", "203", "301", "302", "303", "304", "305", "306", "307", "308"
];

/**
 * プルダウンにオプションを追加する関数
 * この関数をグローバルに利用できるように定義します。
 * @param {HTMLSelectElement} selectElement - オプションを追加するselect要素
 * @param {string[]} options - 追加するオプションの配列
 */
function populateSelect(selectElement, options) {
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        selectElement.appendChild(option);
    });
}

// 必要に応じて、データをグローバルに公開するか、関数で取得できるようにする
window.courseOptions = courseOptions;
window.yearOptions = yearOptions;
window.classOptions = classOptions;
window.populateSelect = populateSelect; // 関数も公開