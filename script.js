/* --------------- CARD FLIP --------------- */
const card = document.getElementById("card");
card.addEventListener("click", () => {
  card.classList.toggle("is-flipped");
  fireConfetti();
});

/* --------------- CELEBRATE BUTTON --------------- */
document.getElementById("celebrateBtn").addEventListener("click", fireConfetti);

/* --------------- CONFETTI --------------- */
function fireConfetti() {
  confetti({ particleCount: 140, spread: 70, origin: { y: 0.6 }, scalar: 1.15 });
  const end = Date.now() + 2000;
  (function frame() {
    confetti({
      particleCount: 6,
      startVelocity: 20,
      ticks: 130,
      spread: 360,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* --------------- STAR-FIELD BACKGROUND --------------- */
const bgCanvas = document.getElementById("bgCanvas");
const ctx = bgCanvas.getContext("2d");
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const dots = Array.from({ length: 70 }, () => ({
  x: Math.random() * bgCanvas.width,
  y: Math.random() * bgCanvas.height,
  r: Math.random() * 2 + 1.2,
  s: Math.random() * 0.7 + 0.3
}));

(function animate() {
  ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  dots.forEach(d => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,.25)";
    ctx.fill();
    d.y += d.s;
    if (d.y - d.r > bgCanvas.height) d.y = -d.r;
  });
  requestAnimationFrame(animate);
})();

function resizeCanvas() {
  bgCanvas.width  = innerWidth;
  bgCanvas.height = innerHeight;
}
