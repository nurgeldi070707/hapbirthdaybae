 // Reasons database
 // Reasons database
const reasons = [
  {
    text: "Whenever I look into those beautiful eyes of yours, everything else just fades away. You have the most captivating gaze in the world. 👀❤️",
    emoji: "👀",
    gif: "giphy.gif"
  },
  {
    text: "我们的寿司之夜总是令人难忘！我喜欢和你一起尝试新事物，在桌前对坐，分享彼此的世界。🍣✨",
    emoji: "🍣",
    gif: "bob.gif"
  },
  {
    text: "When we hold each other's hands, I feel an incredible sense of safety. It feels like I can conquer the whole world as long as I'm holding your hand. 🤝💖",
    emoji: "🤝",
    gif: "holdhands.jpg"
  },
  {
    text: "和你一起在奇什米吉乌公园并肩散步，听着你的声音，是我一生中最平静美好的时光。🌳✨",
    emoji: "🌳",
    gif: "gif2.gif"
  },
  {
    text: "Your beautiful smile makes everything around brighter, just like these lovely flowers. You are the prettiest bloom in my life. 🌸",
    emoji: "🌸",
    gif: "flowerss.jpg"
  },
  {
    text: "每当你看着我时，那害羞又可爱的样子，真的让我着迷。你总是能让我心动如初！🥰",
    emoji: "🥰",
    gif: "gif1.gif"
  },
  {
    text: "Every single moment with you feels like we are living in our own perfect little world. We are the best team ever! 🎨💕",
    emoji: "🎨",
    gif: "stickerai.jpg"
  }
];
    

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);