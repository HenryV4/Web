// // storage.js

// // Function to save banks to localStorage
// function saveBanksToStorage(banks) {
//     localStorage.setItem('bankCards', JSON.stringify(banks));
//   }
  
//   // Function to retrieve banks from localStorage
//     function getBanksFromStorage() {
//         const banks = JSON.parse(localStorage.getItem('bankCards')) || [];
//         console.log('Banks Retrieved from localStorage:', banks);  // Check if data is retrieved correctly
//         return banks;
//     }
  
//   // Function to clear localStorage
//   function clearStorage() {
//     localStorage.clear();
//     alert('Storage Cleared!');
//     window.location.reload();
//   }
  
//   // Exporting the functions
//   export { saveBanksToStorage, getBanksFromStorage, clearStorage };

// Function to save banks to localStorage
function saveBanksToStorage(banks) {
    localStorage.setItem('bankCards', JSON.stringify(banks));
  }
  
  // Function to retrieve banks from localStorage
  function getBanksFromStorage() {
    return JSON.parse(localStorage.getItem('bankCards')) || [];
  }
  
  // Function to clear localStorage and reload the page
  function clearStorage() {
    localStorage.clear();
    alert('Storage Cleared!');
    window.location.reload();
  }
  
  // Exporting the functions
  export { saveBanksToStorage, getBanksFromStorage, clearStorage };
  