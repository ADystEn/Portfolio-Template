// Nav-Item Dropdown activate ( Pfeil Steuerung) + activate (DROPDOWN MENU)
        // #1.1

        document.querySelectorAll('.nav-item-dropdown').forEach(item => {
            item.addEventListener('click', (eventobject) => {
                eventobject.stopPropagation(); // Verhindert das sofortige Schließen
                item.classList.toggle('active');
                
                const dropdownMenuA = item.querySelector('.dropdown-menu'); // Zugehöriges Kindelement / Dropdown
                if(item.classList.contains("active")){
                    dropdownMenuA.classList.toggle('active');
                }
                else{
                    dropdownMenuA.classList.remove('active');
                }
                
                // Alle anderen Dropdowns schließen
                // # 1.2
                document.querySelectorAll('.nav-item-dropdown').forEach(dropdown => {
                    if (dropdown !== item) {
                        dropdown.classList.remove('active'); // Schließe 'nicht-geklicktes' navitemdropdown
                        const dropdownMenuB = dropdown.querySelector('.dropdown-menu');
                        dropdownMenuB.classList.remove('active'); //Schließe dropdown(menü)
                    }
                }); //Ende 1.2


            }); // Ende Eventlistener von 1.1
        }); // Ende 1.1


        // Dropdown schließen, wenn außerhalb geklickt wird
        // # 2.1
        document.addEventListener('click', () => {
            document.querySelectorAll('.nav-item-dropdown').forEach(item => {
                item.classList.remove('active'); 
                const dropdownMenu = item.querySelector('.dropdown-menu');
                dropdownMenu.classList.remove('active');
            });
        }); //Ende 2.1