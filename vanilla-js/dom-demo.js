// DOM Manipulation Demo Script (Assignment 11)
// Explicitly using getElementById, querySelector, textContent, classList, and addEventListener

document.addEventListener('DOMContentLoaded', () => {
    // Array of Nashik facts
    const nashikFacts = [
        {
            text: "Nashik produces over 50% of India's wine output, earning it the official title 'Wine Capital of India'.",
            category: "Heritage & Agriculture"
        },
        {
            text: "The sacred Kumbh Mela occurs at Ram Kund and Trimbakeshwar every 12 years, attracting over 30 million pilgrims.",
            category: "Spiritual History"
        },
        {
            text: "Anjaneri Hills near Nashik is revered in Hindu tradition as the birthplace of Lord Hanuman.",
            category: "Mythology & Nature"
        },
        {
            text: "Pandavleni Caves feature 24 ancient Hinayana Buddhist rock-cut caves dating back to the 1st Century BCE.",
            category: "Ancient Architecture"
        },
        {
            text: "Asia's only Numismatic Museum dedicated to historical coins and currency evolution is located at Anjaneri, Nashik.",
            category: "Hidden Gems"
        },
        {
            text: "The Security Printing Press at Nashik prints India's currency notes and official passport booklets.",
            category: "Modern History"
        }
    ];

    let currentFactIndex = 0;
    let viewedCount = 0;

    // DOM References via getElementById and querySelector
    const factTextEl = document.getElementById('fact-text');
    const factCategoryEl = document.getElementById('fact-category');
    const nextBtn = document.getElementById('next-fact-btn');
    const themeBtn = document.getElementById('toggle-theme-btn');
    const counterEl = document.getElementById('fact-counter');
    const totalFactsEl = document.getElementById('total-facts');
    const liveInput = document.querySelector('#live-input');
    const liveOutput = document.querySelector('#live-output');

    // Initialize total count
    if (totalFactsEl) {
        totalFactsEl.textContent = nashikFacts.length;
    }

    // Function to render fact
    function displayFact(index) {
        const fact = nashikFacts[index];
        if (factTextEl && factCategoryEl) {
            factTextEl.textContent = `"${fact.text}"`;
            factCategoryEl.textContent = `Category: ${fact.category}`;
        }
    }

    // Event Listener for Next Fact Button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentFactIndex = (currentFactIndex + 1) % nashikFacts.length;
            viewedCount++;
            displayFact(currentFactIndex);

            // Update counter DOM
            if (counterEl) {
                counterEl.textContent = viewedCount;
            }
        });
    }

    // Event Listener for Theme Toggle using classList
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeBtn.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
        });
    }

    // Event Listener for Live Input DOM Feedback
    if (liveInput && liveOutput) {
        liveInput.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.trim() === '') {
                liveOutput.textContent = '';
            } else {
                liveOutput.textContent = `DOM Live Echo: Searching for "${value}" in Nashik Database...`;
            }
        });
    }

    // Show initial fact
    displayFact(0);
});
