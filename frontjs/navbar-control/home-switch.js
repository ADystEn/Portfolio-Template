function onScrollOpacityHomeSwitch() {
    const homeSwitchOnScroll = document.querySelector('.home-switch');
    const currentScrollY = window.scrollY; 

    homeSwitchOnScroll.style.opacity = '0.5';  

    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY; 
    ticking = false;
    isScrolling = true;

    clearTimeout(homeSwitchOnScroll.scrollTimeout);
    
    homeSwitchOnScroll.scrollTimeout = setTimeout(() => {
        homeSwitchOnScroll.style.opacity = '1'; 
    }, 500); 
}

// Positionsverhalten des Home-Switch
        function adjustHomeSwitchPosition(){
            //Elements
            const homeSwitchButton = document.querySelector('.home-switch');
            const footer = document.querySelector('.footer-container');  
            const navItemsBoxActive = document.querySelector('.nav-items-box.active');
            const logoBox = document.querySelector('.logobox1');
            const logoBoxHeight = logoBox.offsetHeight;
            const navBar = document.querySelector('.navbar');
            const navBarHeight = navBar.offsetHeight;
            const navBurgerMenuBox = document.querySelector('.nav-burger-menu-box');
            const navBurgerMenuBoxHeight = navBurgerMenuBox.offsetHeight;
            // Positions
            const footerTopPosition = footer.getBoundingClientRect().top + window.scrollY; 
            const viewportHeight = window.innerHeight; 
            let navItemBoxBottomRect = 0;
            if(navItemsBoxActive){
                navItemBoxBottomRect = navItemsBoxActive.getBoundingClientRect().bottom;
            }
            
            // Anzeigeverhalten: Bei Starthöhe nicht anzeigen / Über Starthöhe anzeigen.
            if(viewportHeight <= 1024){
                homeSwitchButton.style.display = 'none';
                console.log(navItemBoxBottomRect);
                if(!navItemsBoxActive){
                    if(window.scrollY + viewportHeight  > viewportHeight + navBarHeight + logoBoxHeight - (navBurgerMenuBoxHeight/2)){
                        console.log(viewportHeight, navBarHeight, logoBoxHeight, navBurgerMenuBoxHeight);
                        homeSwitchButton.style.display = 'flex';
                    }  
                }
                else if(navItemsBoxActive){
                    if(window.scrollY + viewportHeight  > viewportHeight + navItemBoxBottomRect){
                        homeSwitchButton.style.display = 'flex';
                    }  
                }
                else{
                    return;
                }
            }
            // Anzeigeverhalten : Über Footer Parken.
            if (window.scrollY + viewportHeight >= footerTopPosition) {
                homeSwitchButton.style.bottom = `${viewportHeight - ((footerTopPosition-10) - window.scrollY)}px`;
            } 
            else {
                homeSwitchButton.style.bottom = ""; 
            }
        }

 /* FN CALLS ###############################################*/

        // Bei Start Initialisieren
        adjustHomeSwitchPosition();

        // Bei Scrollen : OffSwitch Opacity verändern
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(onScrollOpacityHomeSwitch);  
                ticking = true;
            }
        });
        // Bei Scrollen : HomeSwitch Korrigieren
        window.addEventListener('scroll', adjustHomeSwitchPosition);
        // Bei Resizing : OffSwitch Korrigieren
        window.addEventListener('resize', adjustHomeSwitchPosition);
        // Bei Start Initialisieren
        adjustHomeSwitchPosition();