// form.js

// Function to handle form submission
async function handleFormSubmission() {
  console.log("handleFormSubmission is called"); // Debugging log

  // Wait for DOM content to be loaded before attaching the event listener
  document.addEventListener("DOMContentLoaded", () => {
      console.log("DOM fully loaded and parsed"); // Debugging log

      const form = document.getElementById("add_form"); // Cache the form element
      if (!form) {
          console.error("Form element not found!");
          return; // Exit if the form is not found
      }

      form.addEventListener("submit", async function (event) {
          event.preventDefault(); // Prevent default form submission
          console.log('Form submission triggered'); // Debugging log

          // Fetch values from input fields
          const bank = document.getElementById("bank_input").value.trim();
          const clients = document.getElementById("clients_input").value.trim();
          const loans = document.getElementById("loans_input").value.trim();

          console.log('Bank Name:', bank); 
          console.log('Clients:', clients); 
          console.log('Loans:', loans);

          // Check that all fields are filled in
          if (bank && clients && loans) {
              const bankData = {
                  bank,
                  clients: parseInt(clients, 10),
                  loans: parseInt(loans, 10),
              };

              console.log('Bank Data being sent:', bankData); // Debugging log

              try {
                  const response = await fetch('http://localhost:3000/api/banks', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(bankData), // Send bank data as JSON
                  });

                  if (!response.ok) {
                      const errorResponse = await response.json(); // Get error response
                      throw new Error('Failed to create bank: ' + errorResponse.message);
                  }

                  console.log("Bank created successfully!"); // Log on successful creation

                  // Redirect to lab5.html to see the new bank
                  window.location.href = 'lab5.html'; 
              } catch (error) {
                  alert('Error: ' + error.message); // Display error to user
              }
          } else {
              alert("Please fill in all fields."); // Alert for missing fields
          }
      });
  });
}

// Export the function for use in main.js
export { handleFormSubmission };
