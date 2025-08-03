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
