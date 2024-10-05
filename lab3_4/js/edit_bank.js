// Get the bank data to edit from localStorage
const editBankIndex = localStorage.getItem('editBankIndex');
let banks = JSON.parse(localStorage.getItem('bankCards')) || [];
let bankToEdit = banks[editBankIndex];

// Pre-fill the form with the current bank data
document.getElementById('bank_input').value = bankToEdit.bank;
document.getElementById('clients_input').value = bankToEdit.clients;
document.getElementById('loans_input').value = bankToEdit.loans;

// Show the modal with a message
function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  modalMessage.textContent = message;
  modal.style.display = 'flex';
}

// Close the modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Attach event listener to close the modal when the close button is clicked
document.getElementById('modal-close').addEventListener('click', closeModal);

// Close the modal if clicking outside the modal content
window.onclick = function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
};

// Validate form inputs and update the bank data
document.getElementById('edit_form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const bankName = document.getElementById('bank_input').value.trim();
  const clients = document.getElementById('clients_input').value.trim();
  const loans = document.getElementById('loans_input').value.trim();

  // Validate inputs
  if (!bankName || !clients || !loans) {
    showModal('Please fill in all fields.');
    return false;
  }

  if (isNaN(clients) || isNaN(loans) || clients <= 0 || loans <= 0) {
    showModal('Clients and Loans must be positive numbers.');
    return false;
  }

  // Update the bank data
  banks[editBankIndex] = {
    bank: bankName,
    clients: parseInt(clients, 10),
    loans: parseInt(loans, 10),
  };

  // Save the updated bank data to localStorage
  localStorage.setItem('bankCards', JSON.stringify(banks));

  // Redirect back to the main page after saving
  window.location.href = 'lab3_4.html';
});
