

// Holds the ratings from the server so sorting can reuse them later.
let ratings = [];

// Load every rating from the server.
async function loadRatings() {
    try {
        const response = await fetch('/api/ratings');
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        ratings = await response.json();
        sortSelect.dispatchEvent(new Event("change"));
    } catch (error) {
        console.error('Failed to load ratings:', error);
    }
}

loadRatings();


function displayRatings(list) {
    const container = document.getElementById('ratingsList');
    container.textContent = "";          // remove any old cards first

    for (const rating of list) {
        const card = document.createElement("div");
        card.className = "rating-box game-card";

        const info = document.createElement("div");
        info.className = 'game-info';

        const title = document.createElement("h3");
        title.textContent = rating.name;

        const details = document.createElement("div");
        details.className = 'game-details';

        const leftColumn = document.createElement("div");
        leftColumn.className = 'detail-column';
        leftColumn.appendChild(makeDetail("Genre", rating.genre));

        const rightColumn = document.createElement("div");
        rightColumn.className = 'detail-column';
        rightColumn.appendChild(makeDetail("Rating", `${rating.rating}/10`));

        rightColumn.appendChild(makeDetail("Date Played", new Date(rating.datePlayed).toLocaleDateString('en-US', { timeZone: 'UTC' })));

        info.appendChild(title);
        details.appendChild(leftColumn); 
        details.appendChild(rightColumn);  
        info.appendChild(details);    
        card.appendChild(info);
        container.appendChild(card);
    }
}



// Build one <p><strong>Label:</strong> value</p>
function makeDetail(label, value) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = label + ":";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(" " + value));
    return p;
}


// Re-sort the cards whenever the user picks a sort option.
const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", () => {
    const sorted = ratings.slice();      // copy the array so the original stays untouched
    const choice = sortSelect.value;     // "rating", "name", or "date"

    if (choice === "rating") {
        sorted.sort((a, b) => b.rating - a.rating);
    } else if (choice === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (choice === "date") {
        sorted.sort((a, b) => new Date(b.datePlayed) - new Date(a.datePlayed));
    }

    displayRatings(sorted);   // redraw the cards in the new order
});