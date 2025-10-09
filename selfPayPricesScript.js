// selfPayPricesScript.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the key DOM elements
    const searchInput = document.getElementById('price-search-filter');
    // Get ALL table bodies that we want to filter, using the class added in the HTML
    const tableBodies = document.querySelectorAll('.price-table-body');
    
    if (!searchInput || tableBodies.length === 0) {
        console.error("Missing search input or table bodies. Cannot initialize filter.");
        return;
    }

    // 2. Attach the filtering function to the 'keyup' event
    searchInput.addEventListener('keyup', filterAllTables);

    /**
     * Filters all tables on the page based on the current search input value.
     */
    function filterAllTables() {
        // Get the search term and convert it to lowercase for case-insensitive search
        const filterText = searchInput.value.toLowerCase().trim();
        
        // Iterate through each table body found
        tableBodies.forEach(tableBody => {
            
            // Get all rows in the current table body
            const rows = tableBody.getElementsByTagName('tr');

            // Iterate through all table rows in this specific body
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                
                // Get all cells (td) in the current row
                const cells = row.getElementsByTagName('td');
                
                let rowMatchesFilter = false;

                // Check all cells (Description/Name, Code, Price) for a match
                for (let j = 0; j < cells.length; j++) {
                    const cell = cells[j];
                    
                    // Also check for content within nested elements like <strong> or <span class="price-note">
                    const cellText = cell.textContent || cell.innerText;
                    
                    if (cellText.toLowerCase().includes(filterText)) {
                        rowMatchesFilter = true;
                        break; // Found a match in this row, move to the next row
                    }
                }

                // Show or hide the row based on whether it matched the filter
                if (rowMatchesFilter) {
                    row.style.display = ""; // Show the row (uses default display property)
                } else {
                    row.style.display = "none"; // Hide the row
                }
            }
        });
    }
});