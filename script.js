document.addEventListener('DOMContentLoaded', () => {
    // Initial celebration effect
    celebrate();
    
    // Button to trigger celebration again
    document.getElementById('celebrateBtn').addEventListener('click', celebrate);
    
    // Add floating hearts periodically
    setInterval(createFloatingHeart, 500);
    
    // Balloon floating effect
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
        balloon.style.animationDelay = `${index * 0.5}s`;
    });
});

function celebrate() {
    // Confetti effect
    createConfetti();
    
    // Animation effects
    const title = document.querySelector('h1');
    title.style.animation = 'none';
    setTimeout(() => {
        title.style.animation = 'pulse 2s infinite';
    }, 10);
    
    // Cake candle animation
    const flame = document.querySelector('.flame');
    flame.style.animation = 'none';
    setTimeout(() => {
        flame.style.animation = 'flicker 0.5s infinite alternate';
    }, 10);
    
    // Play birthday sound
    playBirthdaySound();
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4d96ff', '#6bcebb', '#ffd93d', '#9b5de5'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * window.innerWidth;
        const duration = Math.random() * 3 + 2;
        
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${posX}px`;
        confetti.style.top = '-10px';
        confetti.style.animation = `fall ${duration}s linear forwards`;
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

function createFloatingHeart() {
    if (Math.random() > 0.3) return; // Only create sometimes
    
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = `${Math.random() * 30 + 20}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = '105vh';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.zIndex = '0';
    heart.style.animation = `fall ${Math.random() * 10 + 5}s linear forwards`;
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

function playBirthdaySound() {
    try {
        // Create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        
        // Create simple birthday melody
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        // Birthday melody notes (frequencies for C, D, E, F, G)
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00];
        const timing = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1];
        
        // Play melody
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;
        
        // Play sequence
        oscillator.start();
        
        // Play the notes
        timing.forEach((time, index) => {
            const noteIndex = index % notes.length;
            audioCtx.resume().then(() => {
                setTimeout(() => {
                    oscillator.frequency.setValueAtTime(notes[noteIndex], audioCtx.currentTime);
                }, time * 300);
            });
        });
        
        // Stop after sequence
        setTimeout(() => {
            oscillator.stop();
        }, 3000);
    } catch (e) {
        console.log("Audio not supported in this environment");
    }
}