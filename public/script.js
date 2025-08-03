// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.onclick = () => {
  navLinks.classList.toggle('open');
};

// Active nav link highlight on click
[...navLinks.querySelectorAll('a')].forEach(link => {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
    navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});

// Modal logic
const enquiryModal = document.getElementById('enquiryModal');
const enquiryBtns = [document.getElementById('enquiryBtn'), document.getElementById('enquiryBtn2')].filter(Boolean);
const closeModal = document.getElementById('closeModal');

enquiryBtns.forEach(btn => {
  btn.onclick = () => {
    enquiryModal.classList.add('active');
    document.getElementById('enquiryStatus').textContent = '';
    document.getElementById('enquiryForm').reset();
  };
});
closeModal.onclick = () => enquiryModal.classList.remove('active');
window.onclick = (e) => { if (e.target === enquiryModal) enquiryModal.classList.remove('active'); };

// Form logic
document.getElementById('enquiryForm').onsubmit = function(e) {
  e.preventDefault();
  // In real app, send via fetch to backend/email API!
  document.getElementById('enquiryStatus').textContent = "Thank you! We'll contact you soon.";
  setTimeout(() => enquiryModal.classList.remove('active'), 1200);
};

