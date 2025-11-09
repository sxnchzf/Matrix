const canvas = document.getElementById("MatrixCanvas");
const ctx = canvas.getContext("2d");

let speed = 10;
let message = "Te Amo";
let color = "#ff69b4";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

document.getElementById("SpeedControl").addEventListener("input", e => {
  speed = parseInt(e.target.value);
});

document.getElementById("ColorPicker").addEventListener("input", e => {
  color = e.target.value;
});

document.getElementById("TextInput").addEventListener("input", e => {
  message = e.target.value;
});

canvas.addEventListener("click", e => {
  explosion(e.clientX, e.clientY);
});

function explosion(x, y) {
  const parts = 20;
  for (let i = 0; i < parts; i++) {
    const angle = (Math.PI * 2 * i) / parts;
    const dx = Math.cos(angle) * 5;
    const dy = Math.sin(angle) * 5;
    animateExplosion(x, y, dx, dy);
  }
}

function animateExplosion(x, y, dx, dy) {
  let life = 30;
  function frame() {
    if (life <= 0) return;
    ctx.fillStyle = color;
    ctx.font = "bold 16px monospace";
    ctx.fillText(message, x + dx * (30 - life), y + dy * (30 - life));
    life--;
    requestAnimationFrame(frame);
  }
  frame();
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = message[Math.floor(Math.random() * message.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    draw();
  }, 1000 / speed);
}

animate();
