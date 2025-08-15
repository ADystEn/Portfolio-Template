let burgerMenus = document.querySelectorAll('.nav-burger-menu-box');
let navItemsBox = document.querySelector('.nav-items-box');
let switchOff = document.querySelector('.burger-off-switch')

burgerMenus.forEach((burgerMenu) => {
    burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        burgerMenu.classList.toggle('active')
        if(burgerMenu.classList.contains("active")){
            console.log('Burger-Menu geklickt: Auf');
            navItemsBox.classList.toggle('active');
            switchOff.classList.toggle('active');
            

        }else{
            console.log('Burger-Menu geklickt: Zu');
            navItemsBox.classList.toggle('active');
            switchOff.classList.toggle('active');
        }
    });
});