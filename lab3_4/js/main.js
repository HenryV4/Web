import { handleFormSubmission } from './form.js';
import { displayBanks } from './display.js';
import { countTotalLoans, handleSearch } from './utils.js';
import { getBanksFromStorage } from './storage.js';

let banks = getBanksFromStorage();
let filteredBanks = [...banks];
let originalOrderBanks = [...banks]; // This will store the original order of banks for restoring after sorting
let isSorted = false;

// 1. Handle Form Submission in Create Page
if (window.location.pathname.includes('create_bank.html')) {
  document.addEventListener('DOMContentLoaded', handleFormSubmission);
}

// 2. Handle Display and Sorting in lab3.html
if (window.location.pathname.includes('lab3_4.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    displayBanks(filteredBanks);

    // Search banks by name
    document.getElementById('find_button').addEventListener('click', function () {
      console.log('Performing search...');
      filteredBanks = handleSearch(banks);
      originalOrderBanks = [...filteredBanks];
      if (isSorted) {
        filteredBanks.sort((a, b) => b.loans - a.loans);
      }
      displayBanks(filteredBanks);
    });

    // Cancel search and reset all cards
    document.getElementById('cancel_find_button').addEventListener('click', function () {
      console.log('Resetting search...');
      filteredBanks = [...banks];
      originalOrderBanks = [...filteredBanks];
      displayBanks(filteredBanks);
      document.getElementById('find_input').value = '';
    });

    // Sort banks by loans when sorting switch is toggled
    document.getElementById('sorting_switch').addEventListener('change', function () {
      isSorted = this.checked;
      console.log('Sorting by loans:', isSorted);

      if (isSorted) {
        filteredBanks.sort((a, b) => b.loans - a.loans);
      } else {
        filteredBanks = [...originalOrderBanks];
      }
      displayBanks(filteredBanks);
    });

    // Count loans when button is clicked
    document.getElementById('count_loans_button').addEventListener('click', function () {
      console.log('Counting total loans...');
      countTotalLoans(filteredBanks);
    });
  });
}
