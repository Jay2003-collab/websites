
const opening = document.getElementById("opening");
const delivery = document.getElementById("delivery");
const surprise = document.getElementById("surprise");

const knockBtn = document.getElementById("knockBtn");
const enterBtn = document.getElementById("enterBtn");
const musicBtn = document.getElementById("musicBtn");

const bgMusic = document.getElementById("bgMusic");
const hearts = document.getElementById("hearts");

let musicPlaying = false;

// KNOCK KNOCK
knockBtn.addEventListener("click", () => {

    opening.classList.add("hidden");
    delivery.classList.remove("hidden");

    // Play background music
    bgMusic.play().then(() => {
        musicPlaying = true;
    }).catch(() => {
        console.log("Music could not play. Check music.mp3");
    });

    // Teddy bear delivery animation
    setTimeout(() => {
        enterBtn.classList.remove("hidden");
    }, 2500);

    createHearts();
});

// ENTER THE SURPRISE
enterBtn.addEventListener("click", () => {

    delivery.classList.add("hidden");
    surprise.classList.remove("hidden");

    createHearts();
});

// MUSIC CONTROL
musicBtn.addEventListener("click", () => {

    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = "🔇 Play Music";
        musicPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.textContent = "🔊 Pause Music";
        musicPlaying = true;
    }
});

// FLOATING HEARTS
function createHearts() {

    const emojis = ["💗", "💕", "💖", "🌸", "✨"];

    setInterval(() => {

        const heart = document.createElement("div");

        heart.classList.add("heart");
        heart.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (15 + Math.random() * 20) + "px";

        hearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);

    }, 500);
}
