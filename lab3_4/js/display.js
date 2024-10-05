// import { getBanksFromStorage, saveBanksToStorage } from './storage.js';
// import { countTotalLoans } from './utils.js';

// // Function to display banks in original order
// function displayBanks() {
//   const banks = getBanksFromStorage();  // Always fetch the latest banks from localStorage
//   const itemsContainer = document.getElementById('items_container');
//   itemsContainer.innerHTML = ''; // Clear current cards

//   banks.forEach((bankData, index) => {
//     const card = createBankCard(bankData, index); // Pass the index to the createBankCard function
//     itemsContainer.appendChild(card);
//   });

//   countTotalLoans(); // Update loan counter after displaying the banks
// }

// // Function to sort the bank cards by number of loans
// function sortBanksByLoans() {
//   const banks = getBanksFromStorage(); // Always fetch the latest banks from localStorage
//   const sortedBanks = [...banks].sort((a, b) => b.loans - a.loans); // Sort in descending order

//   const itemsContainer = document.getElementById('items_container');
//   itemsContainer.innerHTML = ''; // Clear current cards

//   sortedBanks.forEach((bankData, index) => {
//     const card = createBankCard(bankData, index); // Pass the index to the createBankCard function
//     itemsContainer.appendChild(card);
//   });

//   countTotalLoans(); // Update loan counter after sorting the banks
// }

// // Function to create a bank card element
// function createBankCard(bankData, index) {
//   const card = document.createElement('li');
//   card.classList.add('item-card');
//   card.innerHTML = `
//     <div class="item-container__content">
//       <div>
//         <strong>${bankData.bank}</strong>
//         <p>Clients: <span class="bank-clients">${bankData.clients}</span></p>
//         <p>Loans Issued: ${bankData.loans}</p>
//       </div>
//       <div class="button-container">
//         <button class="edit-button">Edit</button>
//         <button class="delete-button">Delete</button>
//       </div>
//     </div>
//   `;

//   // Add event listener for the delete button
//   card.querySelector('.delete-button').addEventListener('click', function () {
//     let banks = getBanksFromStorage(); // Retrieve the current list of banks from storage
//     banks = banks.filter((b, i) => i !== index); // Remove the bank at the current index
//     saveBanksToStorage(banks); // Save the updated banks list back to localStorage

//     // After deletion, check the sorting switch
//     if (document.getElementById('sorting_switch').checked) {
//       sortBanksByLoans(); // Sort the updated list
//     } else {
//       displayBanks(); // Display in original order
//     }

//     countTotalLoans(); // Recalculate and display the updated total loans
//   });

//   // Add event listener for the edit button
//   card.querySelector('.edit-button').addEventListener('click', function () {
//     localStorage.setItem('editBankIndex', index); // Store the index of the bank to be edited
//     window.location.href = 'edit_bank.html'; // Redirect to the Edit page
//   });

//   return card;
// }

// export { displayBanks, sortBanksByLoans, createBankCard };

import { createBankCard } from './utils.js';

// Function to display banks in original or sorted order
function displayBanks(banks, sort = false) {
  const itemsContainer = document.getElementById('items_container');
  itemsContainer.innerHTML = '';

  const displayedBanks = sort ? [...banks].sort((a, b) => b.loans - a.loans) : banks;

  console.log('Displaying Banks: ', displayedBanks);

  displayedBanks.forEach((bankData, index) => {
    const card = createBankCard(bankData, index);
    itemsContainer.appendChild(card);
  });
}

export { displayBanks };

