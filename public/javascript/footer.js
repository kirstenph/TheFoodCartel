$(document).ready(function () {
  // // Show/hide the scroll-up button based on scroll position
  // $(window).scroll(function () {
  //     if ($(this).scrollTop() > 100) {
  //         $('#scrollup').fadeIn();
  //     } else {
  //         $('#scrollup').fadeOut();
  //     }
  // });

  // Scroll to top when the button is clicked
  $('#scrollup').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 100);
      return false;
  });
});
