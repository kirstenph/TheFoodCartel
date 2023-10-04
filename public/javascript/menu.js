window.onscroll = function () {
    scrollFunction();
};

let mybutton = document.getElementById("add-to-cart");

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}











// const categoryButtons = document.querySelectorAll('.category-button'); // Update the class name to match your HTML
// const menuItems = document.querySelectorAll('.menu .list'); // Select individual menu items

// let activeBtn = 'sr-sabrozo'; // Initialize the active category

// categoryButtons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         resetActiveBtn();
//         showFoodMenu(btn.id);
//         btn.classList.add('active-button');
//     });
// });

// function resetActiveBtn() {
//     categoryButtons.forEach((btn) => {
//         btn.classList.remove('active-button');
//     });
// }

// function showFoodMenu(newMenuBtn) {
//     activeBtn = newMenuBtn;
//     menuItems.forEach((item) => {
//         if (item.classList.contains(activeBtn)) {
//             item.style.display = 'block';
//         } else {
//             item.style.display = 'none';
//         }
//     });
// }


