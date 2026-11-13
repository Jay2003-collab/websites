
const questionPage = document.getElementById("questionPage");
const datePage = document.getElementById("datePage");
const finalPage = document.getElementById("finalPage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const heartsBg = document.getElementById("heartsBg");

// FLOATING HEARTS

function createHeart() {
    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const heartTypes = ["❤️", "💗", "💕", "💖", "💘", "🌸"];

    heart.innerHTML =
        heartTypes[Math.floor(Math.random() * heartTypes.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    heartsBg.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 500);


// NO BUTTON RUNS AWAY

function moveNo() {

    const rect = noBtn.getBoundingClientRect();

    noBtn.style.position = "fixed";

    const maxX = window.innerWidth - rect.width - 10;
    const maxY = window.innerHeight - rect.height - 10;

    const randomX = 10 + Math.random() * Math.max(0, maxX - 10);
    const randomY = 10 + Math.random() * Math.max(0, maxY - 10);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseenter", moveNo);

noBtn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    moveNo();
});

noBtn.addEventListener("click", moveNo);


// YES BUTTON

yesBtn.addEventListener("click", function() {

    questionPage.classList.add("hidden");

    datePage.classList.remove("hidden");

    createConfetti();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// CONFETTI ANIMATION

function createConfetti() {

    const emojis = ["💖", "💕", "❤️", "🌹", "✨", "💗"];

    for (let i = 0; i < 70; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.fontSize =
            (15 + Math.random() * 20) + "px";

        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}


// DATE MINIMUM TODAY

const dateInput = document.getElementById("date");

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;


// HTML SAFE TEXT

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


// SUBMIT DATE FORM

document.getElementById("dateForm").addEventListener("submit",
function(e) {

    e.preventDefault();

    const selectedDate = dateInput.value;

    const favoritePlace =
        document.getElementById("place").value.trim();

    const specialMessage =
        document.getElementById("message").value.trim();

    if (!selectedDate || !favoritePlace) {
        alert("Please complete the required fields! ❤️");
        return;
    }

    const formattedDate = new Date(
        selectedDate + "T12:00:00"
    ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    document.getElementById("dateDetails").innerHTML = `
        <strong>📅 Our Special Date:</strong><br>
        ${escapeHTML(formattedDate)}
        <br><br>

        <strong>🍓 Favorite Place:</strong><br>
        ${escapeHTML(favoritePlace)}
        <br><br>

        <strong>💌 Your Message:</strong><br>
        ${escapeHTML(specialMessage || "Can't wait for our date! ❤️")}
    `;

    datePage.classList.add("hidden");

    finalPage.classList.remove("hidden");

    createConfetti();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
