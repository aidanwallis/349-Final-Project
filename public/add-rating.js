

// Find the form and the message area.
const form = document.getElementById("ratingForm");
const message = document.getElementById("message");

// When the form is submitted, send the new rating to the server.
form.addEventListener("submit", async (event) => {
    event.preventDefault();   // stop the browser from reloading the page

    // Read each input's value into an object shaped like the database.
    const newRating = {
        name: document.getElementById("name").value.trim(),
        rating: Number(document.getElementById("rating").value),
        genre: document.getElementById("genre").value.trim(),
        datePlayed: document.getElementById("datePlayed").value,
        review: document.getElementById("review").value.trim()
    };

    if (newRating.name === "") {
        message.textContent = "Please enter a game title.";
        return;
    }
    if (newRating.rating < 1 || newRating.rating > 10) {
        message.textContent = "Please enter between 1 and 10";
        return;
    }

    // Send it to the server.
    try {
        const response = await fetch("/api/ratings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRating)
        });
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        window.location.href = "/index.html";   // go back to the ratings list
    } catch (error) {
        console.error("Failed to save rating:", error);
        message.textContent = "Could not save the rating. Please try again.";
    }
});