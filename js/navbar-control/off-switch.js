        
        /* Globale Variablen ############################################################## */
        
        //Get Documents
        let burgerMenuO = document.querySelector('.nav-burger-menu-box');
        let offSwitch = document.querySelector('.burger-off-switch');
        let navItemsBoxO = document.querySelector('.nav-items-box');

        // Off-Switch-Opacity Variablen
        let lastScrollY = window.scrollY;  // Die letzte bekannte Scroll-Position
        let ticking = false;  // Variable zum verhindern des mehrfachen ausführens der Scroll-Logik
        let isScrolling = false;  // Variable, ob gerade gescrollt wird

        /* FN Definition ################################################################## */

        function onScrollOpacityOffSwitch() {
            const switchOffOnScroll = document.querySelector('.burger-off-switch');
            const currentScrollY = window.scrollY; // current weil onScroll auf das scrollen unmittelbar reagiert

            switchOffOnScroll.style.opacity = '0.3';  

            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;  // Verhindert negative Werte - ternärer Operator (if)
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
            const footer = document.querySelector('.footer-container');  // Deinen Footer-Selektor anpassen
            if(!offSwitchActive) return;
            // Positions
            const footerTopPosition = footer.getBoundingClientRect().top + window.scrollY;
            const viewportHeight = window.innerHeight;
            const offSwitchActiveTopPosition = offSwitchActive.getBoundingClientRect().top + window.scrollY;

            /*console.log(`footerTopposition : ${footerTopPosition}`);
            console.log(`viewportHeight : ${viewportHeight}`);
            console.log(`offSwitchActiveTopPosition : ${offSwitchActiveTopPosition}`);
            console.log(`scrollY : ${window.scrollY}`);*/

            // > Parken über Footer
            if (window.scrollY + viewportHeight >= footerTopPosition) {
                offSwitchActive.style.bottom = `${viewportHeight - ((footerTopPosition-0) - window.scrollY)}px`;
            } 
            else {
                offSwitchActive.style.bottom = ""; // Wert in CSS
            }

            // > Anzeigen unter Navbar bei VH <= 320px
            if(viewportHeight <= 320){
                offSwitchActive.style.display = 'none';
                if(window.scrollY + viewportHeight > viewportHeight){
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
        
        
        /* Eventlistener Calls #####################################*/

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

        // Mit Off-Switch die Elemente schließen die active sind.
        offSwitch.addEventListener('click', (eventobject) => {
            if (burgerMenuO.classList.contains('active')){
                eventobject.stopPropagation;
                burgerMenuO.classList.toggle('active');
                navItemsBoxO.classList.toggle('active');
                offSwitch.classList.toggle('active');
            }
        });