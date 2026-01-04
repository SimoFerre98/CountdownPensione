// Data di pensionamento: 31 Dicembre 2028 alle 23:59:59
const retirementDate = new Date('2028-12-31T23:59:59').getTime();

// Data di inizio lavoro (stimata - puoi modificarla)
const workStartDate = new Date('1990-01-01T00:00:00').getTime();

// Variabili globali
let currentCalendarDate = new Date();

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

// Definizione traguardi
const achievements = [
    { id: 1, icon: '🎯', title: 'Inizio del Viaggio', description: 'Hai iniziato il countdown!', daysRemaining: 999999 },
    { id: 2, icon: '🚀', title: 'Sotto i 1000 giorni', description: 'Meno di 1000 giorni alla pensione!', daysRemaining: 1000 },
    { id: 3, icon: '🎪', title: 'Due Anni', description: 'Mancano solo 2 anni!', daysRemaining: 730 },
    { id: 4, icon: '🎊', title: 'Un Anno e Mezzo', description: 'Quasi a metà strada!', daysRemaining: 547 },
    { id: 5, icon: '🎉', title: 'Un Anno', description: 'L\'ultimo anno è iniziato!', daysRemaining: 365 },
    { id: 6, icon: '🏖️', title: 'Sei Mesi', description: 'Solo 6 mesi alla libertà!', daysRemaining: 182 },
    { id: 7, icon: '🌟', title: '100 Giorni', description: 'Conto alla rovescia finale!', daysRemaining: 100 },
    { id: 8, icon: '💫', title: 'Un Mese', description: 'L\'ultimo mese di lavoro!', daysRemaining: 30 },
    { id: 9, icon: '🎆', title: 'Una Settimana', description: 'Gli ultimi 7 giorni!', daysRemaining: 7 },
    { id: 10, icon: '🏆', title: 'Pensionato!', description: 'Benvenuto nella tua nuova vita!', daysRemaining: 0 }
];

// Funzione per calcolare anni e mesi
function calculateTimeUnits(distance) {
    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30.44; // Media giorni per mese
    const msPerYear = msPerDay * 365.25; // Considerando anni bisestili

    const years = Math.floor(distance / msPerYear);
    const months = Math.floor((distance % msPerYear) / msPerMonth);
    const days = Math.floor((distance % msPerMonth) / msPerDay);
    const hours = Math.floor((distance % msPerDay) / msPerHour);
    const minutes = Math.floor((distance % msPerHour) / msPerMinute);
    const seconds = Math.floor((distance % msPerMinute) / msPerSecond);

    return { years, months, days, hours, minutes, seconds };
}

// Funzione per aggiornare il countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = retirementDate - now;

    // Calcolo delle unità di tempo
    const time = calculateTimeUnits(distance);

    // Aggiornamento del DOM con animazione
    updateElement('years', time.years, 1);
    updateElement('months', time.months, 1);
    updateElement('days', time.days, 2);
    updateElement('hours', time.hours, 2);
    updateElement('minutes', time.minutes, 2);
    updateElement('seconds', time.seconds, 2);

    // Calcolo della percentuale di progresso
    const totalTime = retirementDate - workStartDate;
    const elapsedTime = now - workStartDate;
    const percentage = Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));

    updateProgress(percentage);

    // Aggiorna i traguardi
    const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    updateAchievements(totalDays);

    // Controlla se è arrivato il momento
    if (distance < 0) {
        celebrateRetirement();
    }
}

// Funzione per aggiornare un elemento con animazione
function updateElement(id, value, padding) {
    const element = document.getElementById(id);
    const newValue = String(value).padStart(padding, '0');

    if (element && element.textContent !== newValue) {
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

    if (progressFill && percentageElement) {
        progressFill.style.width = percentage.toFixed(2) + '%';
        percentageElement.textContent = percentage.toFixed(2) + '%';
    }
}

// Funzione per aggiornare i traguardi
function updateAchievements(daysRemaining) {
    const container = document.getElementById('achievementsContainer');
    if (!container) return;

    // Carica traguardi salvati
    let unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');

    container.innerHTML = '';

    achievements.forEach(achievement => {
        const isUnlocked = daysRemaining <= achievement.daysRemaining;
        const wasUnlocked = unlockedAchievements.includes(achievement.id);

        // Se è appena sbloccato, celebra!
        if (isUnlocked && !wasUnlocked) {
            unlockedAchievements.push(achievement.id);
            localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
            celebrateAchievement(achievement);
        }

        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        const unlockedDate = isUnlocked && wasUnlocked
            ? `<div class="achievement-date">Sbloccato!</div>`
            : '';

        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-description">${achievement.description}</div>
            ${unlockedDate}
        `;

        container.appendChild(card);
    });
}

// Funzione per celebrare un traguardo
function celebrateAchievement(achievement) {
    // Notifica visiva
    showNotification(`🎉 Traguardo Sbloccato: ${achievement.title}!`);
}

// Funzione per mostrare una notifica
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 40px;
        border-radius: 24px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-size: 1.2rem;
        font-weight: 600;
        animation: slideDown 0.5s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Aggiungi l'animazione
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-100px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.5s ease-out reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Funzione per celebrare il pensionamento
function celebrateRetirement() {
    document.querySelector('.title-big').textContent = 'PENSIONATO!';
    document.querySelector('.subtitle p').textContent = 'Benvenuto nella tua nuova vita!';

    // Aggiorna i numeri a zero
    ['years', 'months', 'days', 'hours', 'minutes', 'seconds'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = '00';
    });

    // Aggiorna la citazione
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
        quoteElement.textContent = 'Congratulazioni! Oggi inizia il primo giorno del resto della tua vita! 🎉🎊';
    }

    // Crea effetto confetti
    createConfetti();
}

// Funzione per creare effetto confetti
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#43e97b', '#38f9d7', '#ffd89b', '#ff6e7f'];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = '1';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';

            document.body.appendChild(confetti);

            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;

            confetti.animate([
                {
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 720}deg)`,
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
        }, i * 30);
    }
}

// Funzione per cambiare citazione casualmente
function changeQuote() {
    const quoteElement = document.getElementById('quote');
    if (!quoteElement) return;

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(10px)';

    setTimeout(() => {
        quoteElement.textContent = randomQuote;
        quoteElement.style.opacity = '1';
        quoteElement.style.transform = 'translateY(0)';
    }, 300);
}

// ============ CALENDARIO ============

function renderCalendar(date = currentCalendarDate) {
    const grid = document.getElementById('calendarGrid');
    const monthElement = document.getElementById('calendarMonth');
    if (!grid || !monthElement) return;

    const year = date.getFullYear();
    const month = date.getMonth();

    // Aggiorna titolo mese
    const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    monthElement.textContent = `${monthNames[month]} ${year}`;

    // Pulisci griglia
    grid.innerHTML = '';

    // Aggiungi header giorni
    const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        grid.appendChild(header);
    });

    // Primo giorno del mese
    const firstDay = new Date(year, month, 1);
    let dayOfWeek = firstDay.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Converti da domenica=0 a lunedì=0

    // Giorni del mese precedente
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = dayOfWeek - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = prevMonthDays - i;
        grid.appendChild(day);
    }

    // Giorni del mese corrente
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const retirementDay = new Date(2028, 11, 31); // 31 Dicembre 2028

    // Calcola giorni milestone (esempio: ogni 100 giorni)
    const milestoneDays = calculateMilestoneDays();

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const currentDate = new Date(year, month, day);

        // Controlla se è oggi
        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }

        // Controlla se è il giorno del pensionamento
        if (currentDate.toDateString() === retirementDay.toDateString()) {
            dayElement.classList.add('retirement');
        }

        // Controlla se è un milestone
        if (milestoneDays.some(d => d.toDateString() === currentDate.toDateString())) {
            dayElement.classList.add('milestone');
        }

        grid.appendChild(dayElement);
    }

    // Giorni del mese successivo
    const remainingCells = 42 - grid.children.length + 7; // 6 righe * 7 giorni + header
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = day;
        grid.appendChild(dayElement);
    }
}

function calculateMilestoneDays() {
    const milestones = [];
    const today = new Date();
    const retirement = new Date(2028, 11, 31);

    // Aggiungi milestone specifici dei traguardi
    achievements.forEach(achievement => {
        if (achievement.daysRemaining > 0 && achievement.daysRemaining < 999999) {
            const milestoneDate = new Date(retirement.getTime() - (achievement.daysRemaining * 24 * 60 * 60 * 1000));
            if (milestoneDate >= today) {
                milestones.push(milestoneDate);
            }
        }
    });

    return milestones;
}

// ============ IMPOSTAZIONI ============

function initSettings() {
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsContent = document.getElementById('settingsContent');
    const themeToggle = document.getElementById('themeToggle');

    if (!settingsToggle || !settingsContent) return;

    // Toggle pannello impostazioni
    settingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsContent.classList.toggle('active');
    });

    // Chiudi se si clicca fuori
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.settings-panel')) {
            settingsContent.classList.remove('active');
        }
    });

    // Carica tema salvato
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'light';
    }

    // Toggle tema
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const theme = themeToggle.checked ? 'light' : 'dark';
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }
}

// ============ INIZIALIZZAZIONE ============

// Funzione per aggiungere transizioni fluide agli elementi
function addSmoothTransitions() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(num => {
        num.style.transition = 'transform 0.2s ease-out';
    });

    const quote = document.getElementById('quote');
    if (quote) {
        quote.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    // Imposta la prima citazione
    changeQuote();

    // Aggiungi transizioni
    addSmoothTransitions();

    // Inizializza impostazioni
    initSettings();

    // Renderizza calendario
    renderCalendar();

    // Aggiungi eventi calendario
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Aggiorna il countdown immediatamente
    updateCountdown();

    // Aggiorna il countdown ogni secondo
    setInterval(updateCountdown, 1000);

    // Cambia citazione ogni 10 secondi
    setInterval(changeQuote, 10000);

    // Aggiorna calendario ogni ora
    setInterval(renderCalendar, 3600000);
});

// Easter egg: doppio click sul titolo per confetti
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.title-big');
    if (title) {
        title.addEventListener('dblclick', () => {
            createConfetti();
        });
    }
});

// ============ STATISTICHE CARRIERA ============

function calculateStatistics() {
    // Data inizio lavoro: 1965 (anno nascita) + 17 anni = 1982
    const workStart = new Date('1982-01-01');
    const now = new Date();
    const retirementDay = new Date('2028-12-31');

    // Calcola anni di lavoro
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const yearsWorked = (now - workStart) / msPerYear;
    const totalYears = (retirementDay - workStart) / msPerYear;

    // Statistiche base (stimabili con dati reali)
    const stats = {
        workHours: Math.floor(yearsWorked * 260 * 8), // 260 giorni lavorativi/anno, 8 ore/giorno
        seaHours: Math.floor(yearsWorked * 4 * 5 * 12), // Stima 4 trasferte/anno, ~5 giorni ciascuna, 12h/giorno
        countries: Math.floor(yearsWorked * 3.5), // Stima ~3-4 paesi/anno
        nauticalMiles: Math.floor(yearsWorked * 8000), // Stima ridotta per trasferte brevi
        flights: Math.floor(yearsWorked * 25), // Stima voli per trasferte
        coffees: Math.floor(yearsWorked * 365 * 3), // 3 caffè al giorno
        mondays: Math.floor(yearsWorked * 52), // 52 lunedì/anno
        sunrises: Math.floor(yearsWorked * 4 * 3), // Trasferte: 4 trasferte/anno, ~3 albe per traferta
        repairs: Math.floor(yearsWorked * 120), // Stima manutenzioni
        storms: Math.floor(yearsWorked * 4 * 0.3), // 4 trasferte/anno, ~30% possibilità di maltempo
        experience: Math.floor(totalYears)
    };

    return stats;
}

function animateStatNumber(element, targetValue, duration = 2000) {
    const startValue = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);

        // Formatta il numero con separatori
        element.textContent = currentValue.toLocaleString('it-IT');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = targetValue.toLocaleString('it-IT');
        }
    }

    requestAnimationFrame(update);
}

function initStatistics() {
    const stats = calculateStatistics();

    // Anima tutti i numeri delle statistiche con delay
    Object.keys(stats).forEach((key, index) => {
        const element = document.querySelector(`[data-stat="${key}"]`);
        if (element) {
            setTimeout(() => {
                animateStatNumber(element, stats[key], 2000);
            }, index * 100); // Delay progressivo per effetto cascata
        }
    });
}

// ============ SCREENSAVER MODE ============

function initScreensaver() {
    const screensaverBtn = document.getElementById('screensaverBtn');
    if (!screensaverBtn) return;

    screensaverBtn.addEventListener('click', () => {
        enterScreensaverMode();
    });

    // Esci dalla modalità screensaver con ESC o doppio click
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('screensaver-mode')) {
            exitScreensaverMode();
        }
    });

    document.addEventListener('dblclick', () => {
        if (document.body.classList.contains('screensaver-mode')) {
            exitScreensaverMode();
        }
    });
}

function enterScreensaverMode() {
    // Aggiungi classe screensaver
    document.body.classList.add('screensaver-mode');

    // Richiedi fullscreen
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => {
            console.log('Fullscreen non supportato:', err);
        });
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }

    // Chiudi pannello impostazioni
    const settingsContent = document.getElementById('settingsContent');
    if (settingsContent) {
        settingsContent.classList.remove('active');
    }
}

function exitScreensaverMode() {
    // Rimuovi classe screensaver
    document.body.classList.remove('screensaver-mode');

    // Esci da fullscreen
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
            console.log('Exit fullscreen error:', err);
        });
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Gestisci anche l'uscita da fullscreen con il tasto F11 o browser
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.body.classList.remove('screensaver-mode');
    }
});

// ============ AGGIORNA INIZIALIZZAZIONE ============

// Aggiungi inizializzazione statistiche e screensaver
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza statistiche
    setTimeout(initStatistics, 500); // Piccolo delay per permettere il caricamento

    // Inizializza screensaver
    initScreensaver();

    // Inizializza grafici
    setTimeout(initCharts, 800); // Delay per animazione dopo statistiche
});

// ============ GRAFICI ============

function initCharts() {
    animateCircularChart();
    animateTimelineChart();
    animateDonutChart();
}

function animateCircularChart() {
    const workStart = new Date('1982-01-01');
    const now = new Date();
    const retirementDay = new Date('2028-12-31');

    const totalTime = retirementDay - workStart;
    const elapsedTime = now - workStart;
    const percentage = Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));

    // SVG circle circumference: 2 * π * r = 2 * 3.14159 * 80 = 502.4
    const circumference = 502.4;
    const offset = circumference - (percentage / 100) * circumference;

    const circle = document.getElementById('circleProgress');
    const text = document.getElementById('circleText');

    if (circle && text) {
        // Anima il cerchio
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);

        // Anima il testo
        animateNumber(0, percentage, 2000, (value) => {
            text.textContent = Math.floor(value) + '%';
        });
    }
}

function animateTimelineChart() {
    const workStart = new Date('1982-01-01');
    const now = new Date();
    const retirementDay = new Date('2028-12-31');

    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const yearsWorked = (now - workStart) / msPerYear;
    const yearsRemaining = (retirementDay - now) / msPerYear;
    const totalYears = yearsWorked + yearsRemaining;

    const workedPercentage = (yearsWorked / totalYears) * 100;
    const remainingPercentage = (yearsRemaining / totalYears) * 100;

    const workedSegment = document.getElementById('timelineWorked');
    const remainingSegment = document.getElementById('timelineRemaining');
    const workedValue = document.getElementById('yearsWorkedValue');
    const remainingValue = document.getElementById('yearsRemainingValue');

    if (workedSegment && remainingSegment) {
        setTimeout(() => {
            workedSegment.style.width = workedPercentage + '%';
            remainingSegment.style.width = remainingPercentage + '%';
        }, 100);

        // Anima i valori
        animateNumber(0, yearsWorked, 1500, (value) => {
            if (workedValue) workedValue.textContent = Math.floor(value);
        });

        animateNumber(0, yearsRemaining, 1500, (value) => {
            if (remainingValue) remainingValue.textContent = Math.ceil(value);
        });
    }
}

function animateDonutChart() {
    const seaPercentage = 60; // 60% in mare
    const landPercentage = 40; // 40% a terra

    const radius = 60;
    const circumference = 2 * Math.PI * radius; // ~376.99

    const seaLength = (seaPercentage / 100) * circumference;
    const landLength = (landPercentage / 100) * circumference;

    const seaSegment = document.getElementById('donutSea');
    const landSegment = document.getElementById('donutLand');

    if (seaSegment && landSegment) {
        setTimeout(() => {
            // Segmento mare (inizia da 0)
            seaSegment.setAttribute('stroke-dasharray', `${seaLength} ${circumference}`);
            seaSegment.setAttribute('stroke-dashoffset', '0');

            // Segmento terra (inizia dove finisce il mare)
            landSegment.setAttribute('stroke-dasharray', `${landLength} ${circumference}`);
            landSegment.setAttribute('stroke-dashoffset', -seaLength);
        }, 100);
    }
}

function animateNumber(start, end, duration, callback) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = start + (end - start) * easeOut;

        callback(currentValue);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            callback(end);
        }
    }

    requestAnimationFrame(update);
}
