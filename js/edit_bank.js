import { fetchBanks } from './utils.js';

// Function to get bank ID from the URL parameters
function getBankIdFromURL() {
  const params = new URLSearchParams(window.location.search); // Get the query string from the URL
  return params.get('id'); // Extract the 'id' parameter
}

// Call this function to get the bank id
const editBankId = getBankIdFromURL(); // Get bank ID from URL

// Log the retrieved bank ID (for debugging purposes)
console.log('Bank to edit (from URL):', editBankId);

// Ensure bank ID is present before proceeding
if (!editBankId) {
  alert('No bank selected for editing.');
  window.location.href = 'lab5.html'; // Redirect back if no bank ID is found
}

// Populate the edit form as before, but now using the ID instead of the name
async function populateEditForm() {
  try {
      // Use the fetchBanks function to get all banks
      const banks = await fetchBanks(); // Get all banks data
      const bankToEdit = banks.find(b => b.id === parseInt(editBankId)); // Find the bank by ID

      if (bankToEdit) {
          // Populate the form fields with the fetched bank details
          document.getElementById('bank_input').value = bankToEdit.bank;
          document.getElementById('clients_input').value = bankToEdit.clients;
          document.getElementById('loans_input').value = bankToEdit.loans;
      } else {
          alert('Bank not found.');
      }
  } catch (error) {
      console.error('Error fetching bank:', error);
      alert('Error fetching bank: ' + error.message);
  }
}

// Call this function to populate the form on page load
populateEditForm();

// Validate and update bank data on form submission
document.getElementById('edit_form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  const newBankName = document.getElementById('bank_input').value.trim();
  const clients = parseInt(document.getElementById('clients_input').value.trim(), 10);
  const loans = parseInt(document.getElementById('loans_input').value.trim(), 10);

  if (!newBankName || isNaN(clients) || isNaN(loans)) {
      alert('Please fill in all fields with valid values.');
      return false;
  }

  const updatedBank = { bank: newBankName, clients, loans };

  try {
      const response = await fetch(`http://localhost:3000/api/banks/${editBankId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBank), // Send updated bank data as JSON
      });

      if (!response.ok) {
          throw new Error('Failed to update bank.');
      }

      // Redirect to the main page after successful update
      window.location.href = 'lab5.html';
  } catch (error) {
      alert('Error: ' + error.message);
  }
});
