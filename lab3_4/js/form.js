// // form.js

// import { getBanksFromStorage, saveBanksToStorage } from './storage.js';

// // Function to handle form submission
// function handleFormSubmission() {
//   document.getElementById('add_form').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const bank = document.getElementById('bank_input').value.trim();
//     const clients = document.getElementById('clients_input').value.trim();
//     const loans = document.getElementById('loans_input').value.trim();

//     if (bank && clients && loans) {
//       const bankData = { bank, clients: parseInt(clients, 10), loans: parseInt(loans, 10) };
//       let banks = getBanksFromStorage();

//       banks.push(bankData);
//       saveBanksToStorage(banks);

//       // Clear the input fields
//       document.getElementById('bank_input').value = '';
//       document.getElementById('clients_input').value = '';
//       document.getElementById('loans_input').value = '';

//       // Redirect to lab3.html
//       window.location.href = 'lab3.html';
//     } else {
//       alert('Please fill in all fields.');
//     }
//   });
// }

// // Exporting the function
// export { handleFormSubmission };

import { getBanksFromStorage, saveBanksToStorage } from './storage.js';

// Helper function to reset form fields
function resetForm() {
  document.getElementById('bank_input').value = '';
  document.getElementById('clients_input').value = '';
  document.getElementById('loans_input').value = '';
}

// Function to handle form submission
function handleFormSubmission() {
  document.getElementById('add_form').addEventListener('submit', function (event) {
    event.preventDefault();

    const bank = document.getElementById('bank_input').value.trim();
    const clients = parseInt(document.getElementById('clients_input').value.trim(), 10);
    const loans = parseInt(document.getElementById('loans_input').value.trim(), 10);

    if (bank && !isNaN(clients) && !isNaN(loans)) {
      const bankData = { bank, clients, loans };
      let banks = getBanksFromStorage();
      banks.push(bankData);
      saveBanksToStorage(banks);

      resetForm();
      window.location.href = 'lab3_4.html';
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// Exporting the function
export { handleFormSubmission };
