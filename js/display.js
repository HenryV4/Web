// display.js

import { createBankCard } from './utils.js';

function displayBanks(banks) {
    const itemsContainer = document.getElementById('items_container');
    if (!itemsContainer) {
        console.error('Element with ID "items_container" not found.');
        return; // Prevent further execution
    }

    itemsContainer.innerHTML = ""; // Clear existing items

    if (banks.length === 0) {
        itemsContainer.innerHTML = 'No banks available.'; // Display message if no banks
        return;
    }

    banks.forEach((bankData) => {
        const card = createBankCard(bankData);
        itemsContainer.appendChild(card);
    });
}

export { displayBanks };
