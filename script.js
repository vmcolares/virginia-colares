document.addEventListener('DOMContentLoaded', function () {
  function smoothScroll(target) {
    const element = document.querySelector(target);
    const offset = 100;

    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: 'smooth'
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });

  document.getElementById('ver-sobre-mim').addEventListener('click', function () {
    smoothScroll('#sobre');
  });

  document.getElementById('virginia-colares').addEventListener('click', function () {
    smoothScroll('#hero');
  });

  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (navbarToggle) {
    navbarToggle.addEventListener('click', function () {
      navbarMenu.classList.toggle('show');
    });
  }
});
