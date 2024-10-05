let bankCards = []; // To keep track of bank cards in the order they were added

// 1. Handle Form Submission in Create Page (create_bank.html)
if (window.location.pathname.includes("create_bank.html")) {
  document
    .getElementById("add_form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Get values from the input fields
      const bank = document.getElementById("bank_input").value.trim();
      const clients = document.getElementById("clients_input").value.trim();
      const loans = document.getElementById("loans_input").value.trim();

      // Check if all fields are filled
      if (bank && clients && loans) {
        const bankData = {
          bank,
          clients: parseInt(clients, 10),
          loans: parseInt(loans, 10),
        };

        // Save the new bank to localStorage
        let banks = JSON.parse(localStorage.getItem("bankCards")) || [];
        banks.push(bankData);
        localStorage.setItem("bankCards", JSON.stringify(banks));

        // Clear the input fields after submission
        document.getElementById("bank_input").value = "";
        document.getElementById("clients_input").value = "";
        document.getElementById("loans_input").value = "";

        // Redirect to the lab3.html page to see the added bank
        window.location.href = "lab3_4.html";
      } else {
        alert("Please fill in all fields.");
      }
    });
}

// 2. Handle Display and Sorting in lab3.html
if (window.location.pathname.includes("lab3_4.html")) {
  // Ensure the DOM is fully loaded before attaching event listeners
  document.addEventListener("DOMContentLoaded", function () {
    let banks = JSON.parse(localStorage.getItem("bankCards")) || [];
    displayBanks(banks);

    // Add event listener to the "Count Total Loans" button
    document
      .getElementById("count_loans_button")
      .addEventListener("click", countTotalLoans);

    // Add event listener to the sorting switch
    document
      .getElementById("sorting_switch")
      .addEventListener("change", function () {
        if (this.checked) {
          sortBanksByLoans(banks);
        } else {
          displayBanks(banks);
        }
      });
  });

  // Find and highlight cards based on the search input
  document.getElementById("find_button").addEventListener("click", function () {
    const searchText = document
      .getElementById("find_input")
      .value.toLowerCase();
    const cards = document.querySelectorAll("#items_container .item-card");

    cards.forEach((card) => {
      const title = card.querySelector("strong").textContent.toLowerCase();
      if (title.includes(searchText)) {
        card.style.backgroundColor = "#dff0d8";
      } else {
        card.style.backgroundColor = "white";
      }
    });
  });

  // Cancel search and reset highlight
  document
    .getElementById("cancel_find_button")
    .addEventListener("click", function () {
      const cards = document.querySelectorAll("#items_container .item-card");
      cards.forEach((card) => {
        card.style.backgroundColor = "white";
      });
      document.getElementById("find_input").value = "";
    });
}

// 3. Function to display banks in original order
function displayBanks(banks) {
  const itemsContainer = document.getElementById("items_container");
  itemsContainer.innerHTML = "";

  // Display the banks in the order they were added
  banks.forEach((bankData) => {
    const card = createBankCard(bankData);
    itemsContainer.appendChild(card);
  });
}

// 4. Function to sort the bank cards by number of loans
function sortBanksByLoans(banks) {
  const itemsContainer = document.getElementById("items_container");
  itemsContainer.innerHTML = "";

  const sortedBanks = [...banks].sort((a, b) => b.loans - a.loans);
  sortedBanks.forEach((bankData) => {
    const card = createBankCard(bankData);
    itemsContainer.appendChild(card);
  });
}

// 5. Function to create a bank card element
function createBankCard(bankData) {
  const card = document.createElement("li");
  card.classList.add("item-card");
  card.innerHTML = `
    <div class="item-container__content">
      <div>
        <strong>${bankData.bank}</strong>
        <p>Clients: <span class="bank-clients">${bankData.clients}</span></p>
        <p>Loans Issued: ${bankData.loans}</p>
      </div>
      <button class="delete-button">Delete</button>
    </div>
  `;

  // Add event listener for the delete button
  card.querySelector(".delete-button").addEventListener("click", function () {
    let banks = JSON.parse(localStorage.getItem("bankCards")) || [];
    banks = banks.filter((b) => b.bank !== bankData.bank);
    localStorage.setItem("bankCards", JSON.stringify(banks));

    displayBanks(banks);
  });

  return card;
}

// Function to count total loans from all banks in localStorage
function countTotalLoans() {
  let banks = JSON.parse(localStorage.getItem("bankCards")) || [];
  let totalLoans = banks.reduce((sum, bank) => sum + bank.loans, 0);
  document.getElementById("total_loans").textContent = totalLoans;
}
