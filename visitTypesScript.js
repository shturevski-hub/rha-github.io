// visitTypesScript.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the key DOM elements
    const searchInput = document.getElementById('visit-type-search');
    const tableBody = document.getElementById('visit-types-table-body');
    
    // Check if the elements exist before proceeding
    if (!searchInput || !tableBody) {
        console.error("Missing search input or table body. Cannot initialize filter.");
        return;
    }

    // 2. Attach the filtering function to the 'keyup' event
    searchInput.addEventListener('keyup', filterTable);

    /**
     * Filters the table rows based on the current search input value.
     */
    function filterTable() {
        // Get the search term and convert it to lowercase for case-insensitive search
        const filterText = searchInput.value.toLowerCase().trim();
        
        // Get all rows in the table body
        const rows = tableBody.getElementsByTagName('tr');

        // Iterate through all table rows
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            
            // Get all cells (td) in the current row
            const cells = row.getElementsByTagName('td');
            
            let rowMatchesFilter = false;

            // Iterate through the first three cells (Visit Type, Duration, Description)
            // Note: We only need to check the text content of the cells
            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                // Get the cell's text content
                const cellText = cell.textContent || cell.innerText;
                
                // Check if the cell text contains the filter text
                if (cellText.toLowerCase().includes(filterText)) {
                    rowMatchesFilter = true;
                    break; // No need to check other cells in this row
                }
            }

            // Show or hide the row based on whether it matched the filter
            if (rowMatchesFilter) {
                row.style.display = ""; // Show the row (uses default display property)
            } else {
                row.style.display = "none"; // Hide the row
            }
        }
    }
});