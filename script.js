/**
 * Divyarsh Health Care Institute - Official JavaScript
 * NGO Regd. No. 191267
 * File: script.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLanguageSwitcher();
  initEligibilityChecker();
  initSurgeryTabs();
  initFaqAccordion();
  initInquiryForm();
  initDownloadModal();
});

// ----------------- MOBILE MENU -----------------
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '80px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = '#ffffff';
      navMenu.style.padding = '24px';
      navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      navMenu.style.borderBottom = '1px solid #e2e8f0';
    });
  }
}

// ----------------- BILINGUAL LANGUAGE SWITCHER -----------------
const translations = {
  hi: {
    heroTitle: 'गरीब और मध्यमवर्गीय परिवारों के लिए <span class="highlight">100% कैशलेस व नि:शुल्क</span> सर्जरी सहायता',
    heroSub: 'दिव्यार्ष हेल्थ केयर इंस्टीट्यूट (NGO Regd. 191267) के माध्यम से सरकारी योजनाओं और निजी चैरिटी अस्पतालों में बिना किसी अग्रिम भुगतान के सम्मानजनक इलाज कराएं।',
    checkEligibilityBtn: 'पात्रता जांचें (Eligibility)',
    callHelplineBtn: 'हेल्पलाइन कॉल करें',
    calcTitle: 'सरकारी योजना व अस्पताल पात्रता कैलकुलेटर',
    calcSub: 'जांचें कि आपकी सर्जरी (घुटना, कूल्हा, रीढ़, हृदय, मोतियाबिंद) किस योजना में पूर्णतः कैशलेस होगी',
    treatmentLabel: 'उपचार या सर्जरी चुनें',
    cardLabel: 'आपके पास कौन सा कार्ड है?',
    incomeLabel: 'वार्षिक पारिवारिक आय',
    resultTitle: 'बधाई हो! आप 100% कैशलेस सहायता के पात्र हैं',
    resultDesc: 'हमारे NGO प्रतिनिधि आपको सरकारी अस्पताल या पैनलबद्ध निजी अस्पताल में 0 रुपये खर्च पर भर्ती करवाने में सहायता करेंगे।',
    contactOfficerBtn: 'हमारे केस मैनेजर से बात करें'
  },
  en: {
    heroTitle: '<span class="highlight">100% Cashless & Free</span> Surgery Assistance for Families in Need',
    heroSub: 'Divyarsh Health Care Institute (NGO Regd. 191267) connects eligible patients to government healthcare schemes and empaneled hospitals with zero upfront charges.',
    checkEligibilityBtn: 'Check Eligibility Now',
    callHelplineBtn: 'Call Emergency Helpline',
    calcTitle: 'Healthcare Scheme & Eligibility Checker',
    calcSub: 'Verify if your surgery (Knee, Hip, Spine, Heart, Cataract) qualifies for 100% cashless assistance',
    treatmentLabel: 'Select Treatment or Surgery',
    cardLabel: 'Which Card / Scheme do you hold?',
    incomeLabel: 'Annual Family Income',
    resultTitle: 'Congratulations! You qualify for 100% Cashless Aid',
    resultDesc: 'Our NGO case managers will facilitate your hospital admission and scheme approval with zero out-of-pocket costs.',
    contactOfficerBtn: 'Speak to Case Officer'
  }
};

let currentLang = 'hi';

function initLanguageSwitcher() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (!langToggleBtn) return;

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'hi' ? 'en' : 'hi';
    langToggleBtn.textContent = currentLang === 'hi' ? 'English' : 'हिंदी';
    applyTranslations();
  });
}

function applyTranslations() {
  const t = translations[currentLang];
  if (!t) return;

  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerHTML = t.heroTitle;

  const heroSub = document.getElementById('heroSub');
  if (heroSub) heroSub.textContent = t.heroSub;

  const checkEligibilityBtn = document.getElementById('checkEligibilityBtn');
  if (checkEligibilityBtn) checkEligibilityBtn.textContent = t.checkEligibilityBtn;

  const calcTitle = document.getElementById('calcTitle');
  if (calcTitle) calcTitle.textContent = t.calcTitle;

  const calcSub = document.getElementById('calcSub');
  if (calcSub) calcSub.textContent = t.calcSub;
}

// ----------------- ELIGIBILITY CALCULATOR -----------------
function initEligibilityChecker() {
  const treatmentSelect = document.getElementById('treatmentSelect');
  const cardSelect = document.getElementById('cardSelect');
  const calcResultBox = document.getElementById('calcResultBox');

  function updateCalc() {
    if (!calcResultBox) return;
    const treatment = treatmentSelect ? treatmentSelect.value : '';
    const card = cardSelect ? cardSelect.value : '';

    let coverageType = '100% कैशलेस सहायता (0 रुपये खर्च)';
    let schemeName = card || 'आयुष्मान भारत / एनजीओ कोटा';

    if (card === 'none') {
      coverageType = 'एनजीओ चैरिटी फंड से 60% - 90% तक की छूट व सहायता';
    }

    const resultHeadline = document.getElementById('calcResultHeadline');
    if (resultHeadline) {
      resultHeadline.textContent = `${treatment ? treatment : 'चयनित सर्जरी'} — ${coverageType}`;
    }
  }

  if (treatmentSelect) treatmentSelect.addEventListener('change', updateCalc);
  if (cardSelect) cardSelect.addEventListener('change', updateCalc);
}

// ----------------- SURGERY TABS -----------------
function initSurgeryTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const surgeryCards = document.querySelectorAll('.surgery-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      surgeryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ----------------- FAQ ACCORDION -----------------
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// ----------------- INQUIRY FORM -----------------
function initInquiryForm() {
  const inquiryForm = document.getElementById('inquiryForm');
  if (!inquiryForm) return;

  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('patientName');
    const phoneInput = document.getElementById('patientPhone');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !phone) {
      alert('कृपया नाम और मोबाइल नंबर दर्ज करें (Please enter name and phone).');
      return;
    }

    alert(`धन्यवाद ${name} जी! आपका आवेदन दिव्यार्ष हेल्थ केयर इंस्टीट्यूट को प्राप्त हो गया है। हमारे मेडिकल कोऑर्डिनेटर आपसे 24 घंटे के अंदर संपर्क करेंगे। (Helpline: +91 91234 56789)`);
    inquiryForm.reset();
  });
}

// ----------------- DOWNLOAD CODE MODAL -----------------
function initDownloadModal() {
  const openBtns = document.querySelectorAll('.open-download-modal-btn');
  const closeBtn = document.getElementById('closeDownloadModalBtn');
  const modal = document.getElementById('downloadModal');

  if (openBtns && modal) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
      });
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}
