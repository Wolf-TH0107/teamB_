document.addEventListener('DOMContentLoaded', function() {
    // 定義する科目リスト
    const subjects = [
        "", // 空白選択肢（何もなし）
        "国語", "システム開発演習Ⅱ", "理科", "社会", "英語", "体育", "美術", "音楽", "家庭科", "情報", "物理", "化学", "生物", "歴史", "地理", "倫理", "現代文", "古典", "書道", "簿記"
    ];

    // Select all cells that represent a subject slot (excluding the time column)
    const subjectCells = document.querySelectorAll('td.subject-cell, td.empty-cell');

    subjectCells.forEach(cell => {
        cell.addEventListener('click', function() {
            // If the cell is already in edit mode (has a select element), do nothing
            if (this.querySelector('select')) {
                return;
            }

            const currentText = this.textContent.trim(); // Get current text, trim whitespace
            this.textContent = ''; // Clear the cell content

            // Create a select (dropdown) element
            const selectField = document.createElement('select');
            selectField.classList.add('edit-select'); // Add class for styling (if needed)

            // Populate the select field with options from the subjects array
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject === "" ? "(なし)" : subject; // Display "(なし)" for empty option
                if (subject === currentText) {
                    option.selected = true; // Select the current subject
                }
                selectField.appendChild(option);
            });

            // Append the select field to the cell
            this.appendChild(selectField);
            selectField.focus(); // Focus the select field immediately

            // --- Event listener for when the user selects an option or leaves the select ---
            selectField.addEventListener('change', function() {
                // When an option is selected
                let newText = this.value.trim(); // Get new selected value

                // Update the cell's content
                const parentCell = this.parentNode;
                parentCell.textContent = newText;

                // Adjust cell class based on content for styling
                if (newText === '') {
                    parentCell.classList.remove('subject-cell');
                    parentCell.classList.add('empty-cell');
                } else {
                    parentCell.classList.remove('empty-cell');
                    parentCell.classList.add('subject-cell');
                }

                // Remove the select field (after a short delay to allow visual update)
                // Using a timeout can sometimes help if the browser needs a moment to render the text
                setTimeout(() => {
                    this.remove();
                }, 50); // Short delay
            });

            // If the user clicks outside without making a change, revert to original text
            selectField.addEventListener('blur', function() {
                if (this.parentNode) { // Check if parent still exists (not already removed by 'change' event)
                    // If the select was blurred without a 'change' event (e.g., clicked away)
                    // We need to put the currentText back if no selection was made or it's still there
                    const parentCell = this.parentNode;
                    if (parentCell.textContent.trim() === '') { // If cell is still empty (meaning no change event fired)
                        parentCell.textContent = currentText; // Revert to original text
                        // Also revert class if necessary
                        if (currentText === '') {
                            parentCell.classList.remove('subject-cell');
                            parentCell.classList.add('empty-cell');
                        } else {
                            parentCell.classList.remove('empty-cell');
                            parentCell.classList.add('subject-cell');
                        }
                    }
                    this.remove(); // Remove the select element
                }
            });
        });
    });
});