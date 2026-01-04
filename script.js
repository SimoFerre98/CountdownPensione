// Data di pensionamento: 31 Dicembre 2028 alle 23:59:59
const retirementDate = new Date('2028-12-31T23:59:59').getTime();

// Data di inizio lavoro (stimata - puoi modificarla)
const workStartDate = new Date('1990-01-01T00:00:00').getTime();

// Array di citazioni motivazionali
const quotes = [
    "Il pensionamento non è la fine del viaggio, è l'inizio di una nuova avventura!",
    "Ogni giorno in meno è un giorno in più verso la libertà!",
    "Il miglior momento della vita sta per arrivare!",
    "Finalmente tempo per te, per i tuoi hobby e per i tuoi sogni!",
    "Non è un addio al lavoro, è un benvenuto alla vita!",
    "La pensione è quando smetti di lavorare per vivere e inizi a vivere davvero!",
    "Ogni tramonto porta la promessa di una nuova alba... la tua alba sta arrivando!",
    "Il countdown è iniziato - preparati a vivere i tuoi sogni!"
];

// Funzione per aggiornare il countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = retirementDate - now;

    // Calcolo dei tempi
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Aggiornamento del DOM con animazione
    updateElement('days', days, 3);
    updateElement('hours', hours, 2);
    updateElement('minutes', minutes, 2);
    updateElement('seconds', seconds, 2);

    // Calcolo della percentuale di progresso
    const totalTime = retirementDate - workStartDate;
    const elapsedTime = now - workStartDate;
    const percentage = Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));
    
    updateProgress(percentage);

    // Controlla se è arrivato il momento
    if (distance < 0) {
        celebrateRetirement();
    }
}

// Funzione per aggiornare un elemento con animazione
function updateElement(id, value, padding) {
    const element = document.getElementById(id);
    const newValue = String(value).padStart(padding, '0');
    
    if (element.textContent !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.textContent = newValue;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Funzione per aggiornare la barra di progresso
function updateProgress(percentage) {
    const progressFill = document.getElementById('progressFill');
    const percentageElement = document.getElementById('percentage');
    
    progressFill.style.width = percentage.toFixed(2) + '%';
    percentageElement.textContent = percentage.toFixed(2) + '%';
}

// Funzione per celebrare il pensionamento
function celebrateRetirement() {
    document.querySelector('.title-big').textContent = 'PENSIONATO!';
    document.querySelector('.subtitle p').textContent = 'Benvenuto nella tua nuova vita!';
    
    // Aggiorna i numeri a zero
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
        document.getElementById(id).textContent = '00';
    });
    
    // Aggiorna la citazione
    document.getElementById('quote').textContent = 
        'Congratulazioni! Oggi inizia il primo giorno del resto della tua vita! 🎉🎊';
    
    // Crea effetto confetti
    createConfetti();
}

// Funzione per creare effetto confetti
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#43e97b', '#38f9d7', '#ffd89b', '#ff6e7f'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        confetti.animate([
            { 
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay + 1) * 1000);
    }
}

// Funzione per cambiare citazione casualmente
function changeQuote() {
    const quoteElement = document.getElementById('quote');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        quoteElement.textContent = randomQuote;
        quoteElement.style.opacity = '1';
        quoteElement.style.transform = 'translateY(0)';
    }, 300);
}

// Funzione per aggiungere transizioni fluide agli elementi
function addSmoothTransitions() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(num => {
        num.style.transition = 'transform 0.2s ease-out';
    });
    
    const quote = document.getElementById('quote');
    quote.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// Funzione per aggiungere effetti hover alle card
function addCardEffects() {
    const cards = document.querySelectorAll('.countdown-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const number = card.querySelector('.number');
            number.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            const number = card.querySelector('.number');
            number.style.transform = 'scale(1)';
        });
    });
}

// Funzione per creare particelle animate di sfondo
function createFloatingParticles() {
    const particleCount = 20;
    const container = document.querySelector('.background-animation');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
    
    // Aggiungi l'animazione CSS per le particelle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0.3;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    // Imposta la prima citazione
    changeQuote();
    
    // Aggiungi transizioni
    addSmoothTransitions();
    
    // Aggiungi effetti alle card
    addCardEffects();
    
    // Crea particelle fluttuanti
    createFloatingParticles();
    
    // Aggiorna il countdown immediatamente
    updateCountdown();
    
    // Aggiorna il countdown ogni secondo
    setInterval(updateCountdown, 1000);
    
    // Cambia citazione ogni 10 secondi
    setInterval(changeQuote, 10000);
});

// Easter egg: doppio click sul titolo per confetti
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.title-big');
    title.addEventListener('dblclick', () => {
        createConfetti();
    });
});
