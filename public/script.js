// Modal open/close logic
const enquiryBtn = document.getElementById('enquiryBtn');
const enquiryModal = document.getElementById('enquiryModal');
const closeModal = document.getElementById('closeModal');

enquiryBtn.onclick = () => enquiryModal.classList.add('active');
closeModal.onclick = () => enquiryModal.classList.remove('active');
window.onclick = (e) => {
  if (e.target === enquiryModal) enquiryModal.classList.remove('active');
};

// Enquiry form logic
document.getElementById('enquiryForm').onsubmit = function(e) {
  e.preventDefault();
  document.getElementById('enquiryStatus').textContent = "Thank you! We'll contact you soon.";
  setTimeout(() => {
    enquiryModal.classList.remove('active');
    document.getElementById('enquiryStatus').textContent = '';
    document.getElementById('enquiryForm').reset();
  }, 1400);
};
