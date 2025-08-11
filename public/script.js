// Smooth scroll and fake enquiry form for demo
document.querySelector('.enquire-btn').addEventListener('click', () => {
  document.getElementById('enquiry').scrollIntoView({behavior: 'smooth'});
});

document.getElementById('enquiryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('enquiryThanks').textContent = "Thank you for your enquiry! We'll get back to you soon.";
  setTimeout(() => {
    document.getElementById('enquiryThanks').textContent = "";
    document.getElementById('enquiryForm').reset();
  }, 4500);
});
// Splash logic with session skip
(function () {
  const splash = document.getElementById('splash');
  const site = document.getElementById('site-content');

  // If user has already entered during this session, skip splash
  const alreadyEntered = sessionStorage.getItem('kws_entered') === '1';
  if (alreadyEntered) {
    if (splash) splash.style.display = 'none';
    if (site) {
      site.classList.remove('is-hidden');
      site.classList.add('is-visible');
    }
    return;
  }

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', () => {
    // Ensure site hidden until splash exits
    site?.classList.add('is-hidden');

    // Handle click/tap on splash
    splash?.addEventListener('click', () => {
      splash.classList.add('is-exiting');

      // After transition, hide splash and show site
      setTimeout(() => {
        splash.style.display = 'none';
        site.classList.remove('is-hidden');
        site.classList.add('is-visible');
        sessionStorage.setItem('kws_entered', '1');
      }, 480);
    }, { once: true });
  });
})();
