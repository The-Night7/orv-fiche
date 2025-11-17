// character_sheet.js - Script pour la fiche de personnage

document.addEventListener('DOMContentLoaded', function() {
    // Animation des barres de compétences
    setTimeout(() => {
        // Définir les niveaux de compétences (à personnaliser)
        document.querySelector('[data-skill="vitality"] .skill-level').setAttribute('data-level', '6');
        document.querySelector('[data-skill="strength"] .skill-level').setAttribute('data-level', '5');
        document.querySelector('[data-skill="agility"] .skill-level').setAttribute('data-level', '8');
        document.querySelector('[data-skill="magic"] .skill-level').setAttribute('data-level', '3');
    }, 500);

    // Ajouter des compétences spéciales (exemples)
    const specialSkills = [
        { name: "Cartographie improvisée", level: 7, description: "Capacité à créer rapidement des cartes précises de l'environnement et à identifier les voies de passage sécurisées." },
        { name: "Premiers soins", level: 6, description: "Capacité à traiter efficacement les blessures légères à modérées avec des ressources limitées." },
        { name: "Perception du danger", level: 5, description: "Instinct développé pour détecter les menaces imminentes et anticiper les mouvements hostiles." },
        { name: "Couture tactique", level: 4, description: "Capacité à réparer et modifier des équipements avec des matériaux de fortune." }
    ];

    const specialSkillsContainer = document.querySelector('.special-skills-container');
    
    if (specialSkillsContainer) {
        // Supprimer le texte placeholder
        const placeholder = document.querySelector('.special-skills .placeholder-text');
        if (placeholder) placeholder.remove();
        
        // Ajouter les compétences
        specialSkills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'special-skill';
            
            const nameElement = document.createElement('div');
            nameElement.className = 'special-skill-name';
            nameElement.innerHTML = `${skill.name} <span class="special-skill-level">Niv. ${skill.level}</span>`;
            
            const descElement = document.createElement('div');
            descElement.className = 'special-skill-description';
            descElement.textContent = skill.description;
            
            skillElement.appendChild(nameElement);
            skillElement.appendChild(descElement);
            specialSkillsContainer.appendChild(skillElement);
        });
    }

    // Animation au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observer les paragraphes de l'histoire
    document.querySelectorAll('.history-content p').forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(p);
    });

    // Ajouter une classe pour l'animation
    document.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.history-content p');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, { once: true });

    // Ajouter des caractéristiques (exemples)
    const characteristics = [
        { name: "Tacticienne de terrain", rarity: "Rare", description: "Capacité naturelle à analyser rapidement l'environnement et à élaborer des stratégies adaptatives." },
        { name: "Survivaliste urbaine", rarity: "Peu commune", description: "Expertise dans l'utilisation optimale des ressources limitées en milieu urbain hostile." }
    ];

    const characteristicsSection = document.querySelector('.characteristics');
    
    if (characteristicsSection) {
        // Supprimer le texte placeholder
        const placeholder = document.querySelector('.characteristics .placeholder-text');
        if (placeholder) placeholder.remove();
        
        // Créer un conteneur pour les caractéristiques
        const container = document.createElement('div');
        container.className = 'characteristics-container';
        
        // Ajouter les caractéristiques
        characteristics.forEach(char => {
            const charElement = document.createElement('div');
            charElement.className = 'characteristic-item';
            
            const nameElement = document.createElement('div');
            nameElement.className = 'characteristic-name';
            nameElement.innerHTML = `${char.name} <span class="characteristic-rarity">${char.rarity}</span>`;
            
            const descElement = document.createElement('div');
            descElement.className = 'characteristic-description';
            descElement.textContent = char.description;
            
            charElement.appendChild(nameElement);
            charElement.appendChild(descElement);
            container.appendChild(charElement);
        });
        
        characteristicsSection.appendChild(container);
    }
});

// Classe pour les éléments visibles
document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.history-content p');
    const windowHeight = window.innerHeight;
    
    elements.forEach(function(element) {
        const position = element.getBoundingClientRect().top;
        
        if (position < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
});

// Ajouter la classe visible pour l'animation
document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
});