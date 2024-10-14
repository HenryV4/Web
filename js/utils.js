// utils.js

import { displayBanks } from './display.js';

// Function to create a bank card element (for displaying each bank)
function createBankCard(bankData) {
    const card = document.createElement('li');
    card.classList.add('item-card');
    card.innerHTML = `
        <div class="item-container__content">
            <div>
                <strong>${bankData.bank}</strong>
                <p>Clients: <span class="bank-clients">${bankData.clients}</span></p>
                <p>Loans Issued: ${bankData.loans}</p>
            </div>
            <div class="button-container">
                <button class="delete-button">Delete</button>
                <button class="edit-button">Edit</button>
            </div>
        </div>
    `;

  // Add event listener for the delete button
  card.querySelector('.delete-button').addEventListener('click', async function () {
    if (confirm('Are you sure you want to delete this bank?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/banks/${bankData.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete bank');

            // After deleting, refetch the updated banks
            const updatedBanks = await fetchBanks();
            displayBanks(updatedBanks); // Refresh the displayed bank list
            console.log('Bank deleted and updated list displayed.');
        } catch (error) {
            console.error('Error deleting bank:', error);
            alert('Error deleting bank: ' + error.message);
        }
      }
  });

  // Add event listener for the edit button
  card.querySelector('.edit-button').addEventListener('click', function () {
    window.location.href = `edit_bank.html?id=${bankData.id}`; // Use bank ID in the URL for editing
  });
    
  return card; // Return the card
}

// Fetch all banks or filtered/sorted banks from the server
async function fetchBanks(searchText = '', isSorted = false) {
    const query = new URLSearchParams();
    if (searchText) query.append('name', searchText); // Add search term if present
    if (isSorted) query.append('sort', 'loans'); // Add sort by loans if needed
  
    try {
        const response = await fetch(`http://localhost:3000/api/banks/search-sort?${query.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch banks');
        return await response.json(); // Return parsed JSON data (filtered/sorted banks)
    } catch (error) {
        console.error('Error fetching banks:', error);
        return []; // Return an empty array in case of error
    }
}

// Count total loans based on search and pass the request to the backend
async function countTotalLoans() {
    const searchText = document.getElementById('find_input').value.trim(); // Get search query
  
    const query = new URLSearchParams();
    if (searchText) query.append('name', searchText); // Include search term if present
    query.append('count', 'true'); // Tell backend we want to count loans
  
    try {
        const response = await fetch(`http://localhost:3000/api/banks/search-sort?${query.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch total loans');
        
        const { totalLoans } = await response.json(); // Fetch total loans from response
        document.getElementById('total_loans').textContent = totalLoans; // Update total loans in the UI
    } catch (error) {
        console.error('Error counting loans:', error);
    }
  }

// Helper function to get bank ID from the URL
function getBankIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // This will return the value of the 'id' parameter
}

// Run only if on lab5.html
if (window.location.pathname.includes('lab5.html')) {
    // When the DOM is fully loaded, attach event listeners
    document.addEventListener('DOMContentLoaded', function() {
        const countLoansButton = document.getElementById('count_loans_button');
        const findButton = document.getElementById('find_button');
        const sortingSwitch = document.getElementById('sorting_switch');

        // Attach event listener to the "Count Loans" button
        if (countLoansButton) {
            countLoansButton.addEventListener('click', countTotalLoans);
        } else {
            console.error('count_loans_button element not found');
        }

        // Attach event listener to the "Find" button for searching
        if (findButton) {
            findButton.addEventListener('click', async function () {
                const searchText = document.getElementById('find_input').value.trim();
                const banks = await fetchBanks(searchText, sortingSwitch.checked);
                displayBanks(banks); // Display filtered/sorted banks
            });
        } else {
            console.error('find_button element not found');
        }

        // Attach event listener to the sorting switch
        if (sortingSwitch) {
            sortingSwitch.addEventListener('change', async function () {
                const searchText = document.getElementById('find_input').value.trim();
                const isSorted = sortingSwitch.checked;
                const banks = await fetchBanks(searchText, isSorted);
                displayBanks(banks); // Display sorted or original banks
            });
        } else {
            console.error('sorting_switch element not found');
        }
    });
}

// Exporting functions
export { createBankCard, fetchBanks  };
