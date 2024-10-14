//main.js

import { displayBanks } from './display.js';
import { handleFormSubmission } from './form.js';
import { fetchBanks } from './utils.js';

// Handle form submission for create_bank.html
if (window.location.pathname.includes('create_bank.html')) {
    handleFormSubmission(); // Call the function for form submission
}

// Only run the following code if we're on lab5.html
if (window.location.pathname.includes('lab5.html')) {
    // Set initial state from URL parameters
    document.addEventListener('DOMContentLoaded', async function () {
        const params = new URLSearchParams(window.location.search);

        // Set the search term if present in the URL
        const searchText = params.get('name') || '';
        document.getElementById('find_input').value = searchText;

        // Set the sorting switch based on the URL parameter
        const isSorted = params.get('sort') === 'loans';
        document.getElementById('sorting_switch').checked = isSorted;

        // Fetch and display banks based on current URL parameters
        const banks = await fetchBanks(searchText, isSorted); // Reuse fetchBanks function
        displayBanks(banks); // Display banks
    });

    // Search for banks by name (with URL update)
    document.getElementById('find_button').addEventListener('click', async function () {
        const searchText = document.getElementById('find_input').value.trim();
        
        // Update the URL with the search term
        const params = new URLSearchParams(window.location.search);
        if (searchText) {
            params.set('name', searchText); // Add or update the search term in the URL
        } else {
            params.delete('name'); // Remove the search term if the input is cleared
        }
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

        const banks = await fetchBanks(searchText, document.getElementById('sorting_switch').checked); // Fetch with new search
        displayBanks(banks); // Display banks based on search term
    });

    // Clear the search field and reset the displayed banks (and URL)
    document.getElementById('cancel_find_button').addEventListener('click', async function () {
        document.getElementById('find_input').value = ''; // Clear the input field
        
        // Clear sorting and search parameters from the URL
        const params = new URLSearchParams(window.location.search);
        params.delete('name'); // Remove search term
        params.delete('sort'); // Remove sorting option
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

        const banks = await fetchBanks(); // Fetch all banks without search or sorting
        displayBanks(banks); // Display all banks
    });

    // Sort banks by loans (with URL update)
    document.getElementById('sorting_switch').addEventListener('change', async function () {
        const isSorted = this.checked;

        // Update the URL with the sorting option
        const params = new URLSearchParams(window.location.search);
        if (isSorted) {
            params.set('sort', 'loans'); // Set sort by loans
        } else {
            params.delete('sort'); // Remove sorting from URL if unchecked
        }
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

        const banks = await fetchBanks(document.getElementById('find_input').value.trim(), isSorted); // Fetch based on sorting
        displayBanks(banks); // Display banks based on sorting
    });

    // Count total loans (no changes here, it works the same)
    document.getElementById('count_loans_button').addEventListener('click', async function () {
        const searchText = document.getElementById('find_input').value.trim();
        
        const query = new URLSearchParams();
        if (searchText) query.append('name', searchText);
        query.append('count', 'true'); // We want to count loans
        
        try {
            const response = await fetch(`http://localhost:3000/api/banks/search-sort?${query.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch loan count');
            
            const { totalLoans } = await response.json();
            document.getElementById('total_loans').textContent = totalLoans; // Display total loans
        } catch (error) {
            console.error('Error fetching loan count:', error);
        }
    });
}

 