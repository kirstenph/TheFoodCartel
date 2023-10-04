// Parallax mousemove effect
document.addEventListener('DOMContentLoaded', function () {
  function parallax(e) {
    document.querySelectorAll('.front-img').forEach(function (move) {
      const moving_value = move.getAttribute('data-value');
      const x = (e.clientX * moving_value) / 50;
      const y = (e.clientY * moving_value) / 50;

      move.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
    });
  }

  // Add the mousemove event listener here
  document.addEventListener('mousemove', parallax);
});


// const box = document.getElementById('box');

// document.body.addEventListener('mousedown', event => {
//   event.preventDefault();
// });

