function onScrollOpacityHomeSwitch() {
    const homeSwitchOnScroll = document.querySelector('.home-switch');
    const currentScrollY = window.scrollY; // current weil onScroll auf das scrollen unmittelbar reagiert

    homeSwitchOnScroll.style.opacity = '0.3';  

    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;  // Verhindert negative Werte - ternärer Operator (if)
    ticking = false;
    isScrolling = true;

    clearTimeout(homeSwitchOnScroll.scrollTimeout);
    
    homeSwitchOnScroll.scrollTimeout = setTimeout(() => {
        homeSwitchOnScroll.style.opacity = '1'; 
    }, 500); 
}


// Bei Scrollen : OffSwitch Opacity verändern
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(onScrollOpacityHomeSwitch);  
        ticking = true;
    }
});