// import { getBanksFromStorage } from './storage.js';

// // Function to count total loans
// function countTotalLoans() {
//   let banks = getBanksFromStorage();
//   let totalLoans = banks.reduce((sum, bank) => sum + bank.loans, 0); // Sum all loans
//   document.getElementById('total_loans').textContent = totalLoans; // Update display
// }

// // Function to handle search functionality
// function handleSearch() {
//   const searchText = document.getElementById('find_input').value.toLowerCase();
//   const cards = document.querySelectorAll('#items_container .item-card');

//   console.log("Search Query: ", searchText);  // Log the search query

//   cards.forEach(card => {
//     const title = card.querySelector('strong').textContent.toLowerCase();
//     if (title.includes(searchText)) {
//       card.style.display = 'block';  // Show matching cards
//     } else {
//       card.style.display = 'none';   // Hide non-matching cards
//     }
//   });
// }

// export { countTotalLoans, handleSearch };

import { getBanksFromStorage, saveBanksToStorage } from './storage.js';
import { displayBanks } from './display.js';

let filteredBanks = [];

// Function to create a bank card element
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
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      </div>
    </div>
  `;

  // Add event listener for the delete button
  card.querySelector('.delete-button').addEventListener('click', function () {
    let banks = getBanksFromStorage();
    banks = banks.filter(bank => bank.bank !== bankData.bank);
    saveBanksToStorage(banks);
    displayBanks(banks);
  });

  // Edit button redirects to edit page
  card.querySelector('.edit-button').addEventListener('click', function () {
    const banks = getBanksFromStorage();
    const bankIndex = banks.findIndex(bank => bank.bank === bankData.bank);
    localStorage.setItem('editBankIndex', bankIndex);
    window.location.href = 'edit_bank.html';
  });

  return card;
}

// Function to count total loans
function countTotalLoans(banks) {
  console.log('Counting loans...');
  let totalLoans = banks.reduce((sum, bank) => sum + bank.loans, 0);
  console.log('Total Loans: ', totalLoans);
  document.getElementById('total_loans').textContent = totalLoans;
}

// Function to search bank cards by name
function handleSearch(banks) {
    const searchText = document.getElementById('find_input').value.trim().toLowerCase();
    console.log('Search text:', searchText);
  
    // Filter banks by search text
    filteredBanks = banks.filter(bank => 
        bank.bank.trim().toLowerCase().includes(searchText)
    );
  
    const itemsContainer = document.getElementById('items_container');
    itemsContainer.innerHTML = '';
  
    // Display only filtered banks
    filteredBanks.forEach((bank) => {
        const card = createBankCard(bank);
        itemsContainer.appendChild(card);
    });

    // Return filtered banks for further use
    return filteredBanks;
}

// Function to sort and display banks
function sortBanksByLoans() {
  filteredBanks.sort((a, b) => b.loans - a.loans);
  displayBanks(filteredBanks);
}

export { countTotalLoans, handleSearch, createBankCard, sortBanksByLoans };


