// Get elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const businessList = document.querySelector('.business-list'); // Business container
const addBusinessForm = document.getElementById('addBusinessForm');

// Function to filter businesses
function filterBusinesses() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const businessCards = document.querySelectorAll('.business-card');

    businessCards.forEach(card => {
        const businessText = card.textContent.toLowerCase();
        if (businessText.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 200);
        }
    });
}

// Event listeners for search
searchButton.addEventListener('click', filterBusinesses);
searchInput.addEventListener('input', filterBusinesses);
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        filterBusinesses();
    }
});

// Function to add a new business
addBusinessForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form refresh

    // Get input values
    const name = document.getElementById('businessName').value.trim();
    const address = document.getElementById('businessAddress').value.trim();
    const contact = document.getElementById('businessContact').value.trim();
    const website = document.getElementById('businessWebsite').value.trim();

    if (name === "" || address === "" || contact === "") {
        alert("Please fill all required fields!");
        return;
    }

    // Create business card dynamically
    const businessCard = document.createElement('div');
    businessCard.classList.add('business-card');
    businessCard.innerHTML = `
        <h2>${name}</h2>
        <p>${address}</p>
        <p>Contact: ${contact}</p>
        ${website ? `<a href="${website}" target="_blank">Visit Website</a>` : `<p>Website not available</p>`}
        <div class="ratings">⭐⭐⭐⭐⭐</div>
        <button class="delete-btn">Delete</button>
    `;

    // Append to list
    businessList.appendChild(businessCard);

    // Add event listener for delete button
    businessCard.querySelector('.delete-btn').addEventListener('click', function () {
        businessCard.style.opacity = '0';
        setTimeout(() => businessCard.remove(), 300); // Smooth fade out before removing
    });

    // Reset form
    addBusinessForm.reset();
});

