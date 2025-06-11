let score = 0;
let level = 1;
let timeLimit = 10;
let tapTarget = 10;
let timeLeft = timeLimit;
let timerInterval;

const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const plusOne = document.getElementById("plusOne");
const timer = document.getElementById("timer");
const timeLeftDisplay = document.getElementById("timeLeft");
const startBtn = document.getElementById("startBtn");

target.style.pointerEvents = "none"; // disable tap sebelum mulai

function startChallenge() {
  clearInterval(timerInterval);
  score = 0;
  timeLeft = timeLimit;
  tapTarget = level * 10;
  scoreDisplay.textContent = score;
  message.classList.add("hidden");
  timer.classList.remove("hidden");
  timeLeftDisplay.textContent = timeLeft;

  // SEMBUNYIKAN tombol mulai saat challenge aktif
  startBtn.style.display = "none";
  target.style.pointerEvents = "auto";

  // Mulai countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      target.style.pointerEvents = "none";

      if (score >= tapTarget) {
        level++;
        message.innerHTML = `✅ Level ${level - 1} selesai! Naik ke level ${level}<br>🎯 Target: ${level * 10} tap dalam ${timeLimit} detik`;
        startBtn.textContent = "🎮 Mulai Tantangan";
      } else {
        message.innerHTML = `❌ Kamu gagal di level ${level}<br>Skor kamu: ${score}/${tapTarget}`;
        startBtn.textContent = "🔁 Coba Lagi";
      }

      message.classList.remove("hidden");
      startBtn.style.display = "inline-block";
    }
  }, 1000);
}

target.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;

  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const randomX = Math.floor(Math.random() * 80) - 40;
  const randomY = Math.floor(Math.random() * 80) - 40;

  plusOne.style.left = `${centerX + randomX}px`;
  plusOne.style.top = `${centerY + randomY}px`;

  plusOne.classList.remove("opacity-0");
  plusOne.style.transform = "translateY(-20px)";
  setTimeout(() => {
    plusOne.classList.add("opacity-0");
    plusOne.style.transform = "translateY(0)";
  }, 400);
});

startBtn.addEventListener("click", () => {
  startChallenge();
});
