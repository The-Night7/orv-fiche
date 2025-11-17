/**
 * main.js - JavaScript principal pour le site Lecteur Omniscient
 */

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Fermer le menu mobile en cliquant en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu && navMenu.contains(event.target);
        const isClickOnToggle = menuToggle && menuToggle.contains(event.target);
        
        if (navMenu && navMenu.classList.contains('show') && !isClickInsideMenu && !isClickOnToggle) {
            navMenu.classList.remove('show');
        }
    });
    
    // Gestion des dropdowns sur mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                event.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');
                
                // Fermer les autres dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        otherToggle.parentElement.classList.remove('open');
                    }
                });
            }
        });
    });
    
    // Effet de parallaxe pour le Star Stream
    window.addEventListener('scroll', function() {
        const starStream = document.querySelector('.star-stream');
        if (starStream) {
            const scrollPosition = window.scrollY;
            starStream.style.backgroundPosition = `0 ${scrollPosition * 0.2}px`;
        }
    });
    
    // Année dans le footer
    const yearElement = document.querySelector('.copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('{{ year }}', currentYear);
    }
    
    // Animation des éléments au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.info-card, .timeline-item, .promo-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Appel initial pour animer les éléments déjà visibles
    
    // Ajout de la classe active aux liens de navigation selon la page actuelle
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});