(function () {
  'use strict';

  // Load profile photo: try multiple paths (root + assets, jpg + jpeg + png)
  var photoPaths = ['photo.jpg', 'assets/photo.jpg', 'photo.jpeg', 'assets/photo.jpeg', 'photo.png', 'assets/photo.png'];
  var profilePhotos = document.querySelectorAll('.profile-photo');
  function tryPhoto(i) {
    if (!profilePhotos.length || i >= photoPaths.length) return;
    var img = new Image();
    img.onload = function () {
      var src = photoPaths[i];
      profilePhotos.forEach(function (el) { el.src = src; });
    };
    img.onerror = function () { tryPhoto(i + 1); };
    img.src = photoPaths[i];
  }
  tryPhoto(0);

  var navLinks = document.querySelectorAll('.nav-list a');
  var sections = document.querySelectorAll('.page');

  function setActive() {
    var scrollY = window.scrollY;
    var navHeight = document.querySelector('.nav').offsetHeight;

    sections.forEach(function (section) {
      var top = section.offsetTop - navHeight;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (id && scrollY >= top - 80 && scrollY < top + height - 80) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  }

  window.addEventListener('scroll', setActive);
  window.addEventListener('load', setActive);

  // Smooth scroll for nav links (slower, controlled transition)
  var nav = document.querySelector('.nav');
  nav.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || !a.getAttribute('href') || a.getAttribute('href') === '#') return;
    var id = a.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (!section) return;
    e.preventDefault();
    var navHeight = nav.offsetHeight;
    var targetY = section.offsetTop - navHeight;
    var startY = window.scrollY;
    var startTime = null;
    var duration = 900;

    function step(t) {
      if (startTime === null) startTime = t;
      var elapsed = t - startTime;
      var progress = Math.min(elapsed / duration, 1);
      progress = 1 - Math.pow(1 - progress, 2);
      window.scrollTo(0, startY + (targetY - startY) * progress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  // Flip cards: click or Enter/Space toggles flip
  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      card.classList.toggle('flipped');
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
})();
