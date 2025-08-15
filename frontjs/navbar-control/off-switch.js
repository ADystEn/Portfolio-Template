        
/* Globale Variablen ############################################################## */

//Get Documents
let burgerMenuO = document.querySelector('.nav-burger-menu-box');
let offSwitch = document.querySelector('.burger-off-switch');
let navItemsBoxO = document.querySelector('.nav-items-box');

// Off-Switch-Opacity Variablen
let lastScrollY = window.scrollY;  
let ticking = false;  
let isScrolling = false;  

/* FN Definition ################################################################## */

function onScrollOpacityOffSwitch() {
    const switchOffOnScroll = document.querySelector('.burger-off-switch');
    const currentScrollY = window.scrollY;

    switchOffOnScroll.style.opacity = '0.3';  

    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    ticking = false;
    isScrolling = true;

    clearTimeout(switchOffOnScroll.scrollTimeout);
    
    switchOffOnScroll.scrollTimeout = setTimeout(() => {
        switchOffOnScroll.style.opacity = '1'; 
    }, 500); 
}

// Positionsverhalten des Off-Switch
function adjustOffSwitchPosition() {
    //Elements
    const offSwitchActive = document.querySelector('.burger-off-switch.active');
    const footer = document.querySelector('.footer-container');  // Footer-Selektor anpassen
    const navItemsBoxActive = document.querySelector('.nav-items-box.active');
    if(!navItemsBoxActive) return;
    if(!offSwitchActive) return;
    // Positions
    const footerTopPosition = footer.getBoundingClientRect().top + window.scrollY;
    const viewportHeight = window.innerHeight;
    const offSwitchActiveTopPosition = offSwitchActive.getBoundingClientRect().top + window.scrollY;
    const navItemBoxBottomRect = navItemsBoxActive.getBoundingClientRect().bottom;
    // > Parken über Footer
    if (window.scrollY + viewportHeight >= footerTopPosition) {
        offSwitchActive.style.bottom = `${viewportHeight - ((footerTopPosition-10) - window.scrollY)}px`;
    } 
    else {
        offSwitchActive.style.bottom = "";
    }
    // > Anzeigen unter Navbar bei VH <= 320px
    if(viewportHeight <= 1024){
        offSwitchActive.style.display = 'none';
        if(window.scrollY + viewportHeight > viewportHeight + navItemBoxBottomRect){
            offSwitchActive.style.display = 'flex';
        }
    }
    else{
        offSwitchActive.style.display = 'flex';
        console.log('HAAALOOOO');
    }
    
}

/* FN CALLS ###############################################*/

// Bei Start Initialisieren
adjustOffSwitchPosition();

/* Eventlistener Calls ####################################*/
// Bei Scrollen : OffSwitch Korrigieren
window.addEventListener('scroll', adjustOffSwitchPosition);
// Bei Resizing : OffSwitch Korrigieren
window.addEventListener('resize', adjustOffSwitchPosition);

// Bei Scrollen : OffSwitch Opacity verändern
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(onScrollOpacityOffSwitch);  
        ticking = true;
    }
});
offSwitch.addEventListener('click', (eventobject) => {
    if (burgerMenuO.classList.contains('active')){
        eventobject.stopPropagation();
        burgerMenuO.classList.toggle('active');
        navItemsBoxO.classList.toggle('active');
        offSwitch.classList.toggle('active');
    }
});