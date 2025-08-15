document.querySelectorAll('.nav-item-dropdown').forEach(item => {
    item.addEventListener('click', (eventobject) => {
        eventobject.stopPropagation(); 
        item.classList.toggle('active');
        const dropdownMenuA = item.querySelector('.dropdown-menu'); 
        if(item.classList.contains("active")){
            dropdownMenuA.classList.toggle('active');
        }
        else{
            dropdownMenuA.classList.remove('active');
        }
        document.querySelectorAll('.nav-item-dropdown').forEach(dropdown => {
            if (dropdown !== item) {
                dropdown.classList.remove('active'); 
                const dropdownMenuB = dropdown.querySelector('.dropdown-menu');
                dropdownMenuB.classList.remove('active');
            }
        }); 
    }); 
}); 
      
document.addEventListener('click', () => {
    document.querySelectorAll('.nav-item-dropdown').forEach(item => {
        item.classList.remove('active'); 
        const dropdownMenu = item.querySelector('.dropdown-menu');
        dropdownMenu.classList.remove('active');
    });
}); 