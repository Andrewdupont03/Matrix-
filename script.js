// Smooth scroll pour navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fermer le menu mobile après clic
            const nav = document.getElementById('nav-menu');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// Menu burger mobile
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Changer l'icône
        if (navMenu.classList.contains('active')) {
            menuToggle.textContent = '✕';
        } else {
            menuToggle.textContent = '☰';
        }
    });
}

// Animation au scroll avec IntersectionObserver
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observer tous les éléments avec classe reveal
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Calculateur de cycle
const calcBtn = document.getElementById('calc-btn');
const resultatDiv = document.getElementById('resultat');

calcBtn.addEventListener('click', () => {
    // Récupération des valeurs
    const dateRegles = document.getElementById('date-regles').value;
    const dureeCycle = parseInt(document.getElementById('duree-cycle').value);
    const dureeRegles = parseInt(document.getElementById('duree-regles').value);
    
    // Validation
    if (!dateRegles) {
        alert('Veuillez sélectionner la date de vos dernières règles');
        return;
    }
    
    // Calculs
    const dateDernieresRegles = new Date(dateRegles);
    const aujourd = new Date();
    const diffTemps = aujourd - dateDernieresRegles;
    const joursCycle = Math.floor(diffTemps / (1000 * 60 * 60 * 24));
    
    // Jour actuel du cycle
    const jourDuCycle = joursCycle % dureeCycle || dureeCycle;
    
    // Phase actuelle
    let phaseActuelle;
    if (jourDuCycle <= dureeRegles) {
        phaseActuelle = 'Menstruelle';
    } else if (jourDuCycle <= 13) {
        phaseActuelle = 'Folliculaire';
    } else if (jourDuCycle <= 16) {
        phaseActuelle = 'Ovulation';
    } else {
        phaseActuelle = 'Lutéale';
    }
    
    // Prochaine ovulation (jour 14 du cycle)
    const joursAvantOvulation = 14 - jourDuCycle;
    const dateOvulation = new Date(aujourd);
    dateOvulation.setDate(aujourd.getDate() + (joursAvantOvulation >= 0 ? joursAvantOvulation : joursAvantOvulation + dureeCycle));
    
    // Prochaines règles
    const joursAvantRegles = dureeCycle - jourDuCycle;
    const dateProchainesRegles = new Date(aujourd);
    dateProchainesRegles.setDate(aujourd.getDate() + joursAvantRegles);
    
    // Affichage des résultats
    document.getElementById('phase-actuelle').textContent = phaseActuelle;
    document.getElementById('jour-cycle').textContent = `Jour ${jourDuCycle}`;
    document.getElementById('prochaine-ovulation').textContent = formatDate(dateOvulation);
    document.getElementById('prochaines-regles').textContent = formatDate(dateProchainesRegles);
    
    // Animation d'apparition
    resultatDiv.classList.remove('hidden');
    setTimeout(() => {
        resultatDiv.classList.add('show');
    }, 100);
});

// Fonction de formatage de date
function formatDate(date) {
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
}

// Animation header au scroll
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '10px 0';
    } else {
        header.style.padding = '20px 0';
    }
    
    lastScroll = currentScroll;
});
