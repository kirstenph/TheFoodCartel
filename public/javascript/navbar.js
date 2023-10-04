const nav = document.querySelector("nav");

const navHeight = nav.offsetHeight;
const scrollThreshold = 175; // You can adjust this threshold as needed

window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
        nav.classList.add("nav-black"); // Add the class when scrolling down
    } else {
        nav.classList.remove("nav-black"); // Remove the class when scrolling up
    }
});

// toggle menu
// function toggleMenu() {
//     var menu = document.querySelector('.menu');
//     menu.classList.toggle('active');
// }

// $(document).ready(function () {
//     // When the "Sign in" button is clicked
//     $(".login").click(function () {
//         // Toggle the visibility of the login form
//         $(".login-form-wrap").toggle();
//     });
// });


// TOGGLE NAV MENU
function myFunction() {
    document.getElementsByClassName(".menu-toggle").classList.toggle("nav");
}