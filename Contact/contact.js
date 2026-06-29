// Run code after HTML is loaded
document.addEventListener("DOMContentLoaded", () => {
  // ===== HEADER SEARCH (go to products page) =====
  const headerSearchInput = document.querySelector("header .search input");

  function goToSearch() {
    if (!headerSearchInput) return;
    const term = headerSearchInput.value.trim();
    if (!term) return;
    const url = "/products/products.html?search=" + encodeURIComponent(term);
    window.location.href = url;
  }

  if (headerSearchInput) {
    headerSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        goToSearch();
      }
    });
  }

  // --- Redirect Show More buttons to products page ---
  document.querySelectorAll(".btn-outline").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = "/products/products.html";
    });
  });

  // --- Redirect View All button to products page ---
  const viewAll = document.querySelector(".view-all");
  if (viewAll) {
    viewAll.addEventListener("click", (e) => {
      e.preventDefault(); // stops default link (if any)
      window.location.href = "/products/products.html";
    });
  }

  // ======================
  //   LANGUAGE SYSTEM
  // ======================

  const langSelect = document.querySelector(".lang-select");

  // ----- عناصر هدر + هوم (اگر در این صفحه باشند) -----
  const navLinks = document.querySelectorAll(".nav a");
  const navIconsHTML = Array.from(navLinks).map((link) => {
    const img = link.querySelector("img");
    return img ? img.outerHTML : "";
  });

  const heroTitle = document.getElementById("hero-title");
  const heroText = document.querySelector(".hero__content p");
  const heroBtn = document.querySelector(".hero__content .btn-outline");

  const catsTitle = document.getElementById("cats-title");
  const catsText = document.querySelector(".cats .section-head p");

  const featTitle = document.getElementById("featured-title");
  const featText = document.querySelector(".featured-header p");

  const footerSections = document.querySelectorAll(".footer-section");
  const footerBrandText = footerSections[0]?.querySelector("p") || null;
  const footerQuick = footerSections[1]?.querySelector("h3") || null;
  const footerCats = footerSections[2]?.querySelector("h3") || null;
  const footerFollow = footerSections[3]?.querySelector("h3") || null;
  const footerBuilt = document.querySelector(".footer-bottom p:last-child");
  const homeCatTitles = document.querySelectorAll(".cats .cat-card h3");
  const footerCatLinks = footerSections[2]
    ? footerSections[2].querySelectorAll("ul li a")
    : [];

  // ----- عناصر صفحه CONTACT (اگر در این صفحه باشند) -----
  const cTitle = document.getElementById("txt-getintouch");
  const cSubtitle = document.getElementById("txt-subtitle");
  const cSendMsg = document.getElementById("txt-sendmsg");
  const lblFullName = document.getElementById("lbl-fullName");
  const lblEmail = document.getElementById("lbl-email");
  const lblPhone = document.getElementById("lbl-phone");
  const lblMessage = document.getElementById("lbl-message");
  const cBtn = document.getElementById("contactBtn");

  const cInfoTitle = document.getElementById("txt-contactinfo");
  const cPhoneTitle = document.getElementById("txt-phone");
  const cEmailTitle = document.getElementById("txt-email");
  const cAddressTitle = document.getElementById("txt-address");
  const cHoursTitle = document.getElementById("txt-hours");
  const cHoursText = document.getElementById("txt-hourstext");
  const cShowroomTitle = document.getElementById("txt-showroom");

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  const translations = {
    en: {
      // NAV & HOME
      navHome: "Home",
      navProducts: "Products",
      navAbout: "About",
      navContact: "Contact",

      heroTitleHTML:
        '<span class="color">Everything</span> for your <span class="color">dream home</span>',
      heroText:
        "From furniture to kitchenware, electronics to lighting—find everything you need to make your house feel like home, all in one place.",
      heroBtn: "Shop now",

      catsTitle: "Shop by Category",
      catsText: "Find everything you need for every room in your home",

      featTitle: "Featured Products",
      featText: "Our most popular items, loved by thousands of customers",

      footerBrand:
        "Your one-stop destination for all home essentials. Quality, convenience, and value in one place.",
      footerQuick: "Quick Links",
      footerCats: "Categories",
      footerFollow: "Follow Us",
      footerBuilt: "Built with ❤️ for your home.",

      catLabels: [
        "Furniture",
        "Electronics",
        "Lighting",
        "Decor",
        "Bedding",
        "Kitchenware",
        "Storage",
        "Appliances",
      ],

      // CONTACT PAGE
      getInTouch: "Get in Touch",
      subtitle:
        "Have a question about our products or need help with your order? We're here to help and would love to hear from you.",
      sendMessage: "Send us a message",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone number",
      message: "Message",
      sendBtn: "Send message",

      contactInfo: "Contact Information",
      cPhone: "Phone",
      cEmail: "Email",
      cAddress: "Address",
      businessHours: "Business Hours",
      hoursText: "Monday - Friday: 9AM - 6PM",
      showroom: "Visit Our Showroom",

      successMsg: "Thank you! Your message has been sent.",
      errorMsg: "Please fill in all required fields.",
    },

    fr: {
      // NAV & HOME
      navHome: "Accueil",
      navProducts: "Produits",
      navAbout: "À propos",
      navContact: "Contact",

      heroTitleHTML:
        '<span class="color">Tout</span> pour votre <span class="color">maison de rêve</span>',
      heroText:
        "Des meubles à la vaisselle, de l’électronique à l’éclairage — trouvez tout ce dont vous avez besoin pour vous sentir chez vous.",
      heroBtn: "Magasiner",

      catsTitle: "Magasiner par catégorie",
      catsText:
        "Trouvez tout ce qu’il vous faut pour chaque pièce de votre maison.",

      featTitle: "Produits vedettes",
      featText:
        "Nos articles les plus populaires, appréciés par des milliers de clients.",

      footerBrand:
        "Votre destination unique pour tous les essentiels de la maison. Qualité, commodité et valeur au même endroit.",
      footerQuick: "Liens rapides",
      footerCats: "Catégories",
      footerFollow: "Suivez-nous",
      footerBuilt: "Créé avec ❤️ pour votre maison.",

      catLabels: [
        "Meubles",
        "Électronique",
        "Éclairage",
        "Décor",
        "Literie",
        "Articles de cuisine",
        "Rangement",
        "Électroménagers",
      ],

      // CONTACT PAGE
      getInTouch: "Contactez-nous",
      subtitle:
        "Vous avez une question sur nos produits ou besoin d'aide pour votre commande ? Nous sommes là pour vous aider et serions ravis d’avoir de vos nouvelles.",
      sendMessage: "Envoyez-nous un message",
      fullName: "Nom complet",
      emailAddress: "Adresse e-mail",
      phoneNumber: "Numéro de téléphone",
      message: "Message",
      sendBtn: "Envoyer le message",

      contactInfo: "Informations de contact",
      cPhone: "Téléphone",
      cEmail: "Courriel",
      cAddress: "Adresse",
      businessHours: "Heures d’ouverture",
      hoursText: "Lundi - Vendredi : 9h - 18h",
      showroom: "Visitez notre salle d’exposition",

      successMsg: "Merci ! Votre message a été envoyé.",
      errorMsg: "Veuillez remplir tous les champs requis.",
    },
  };

  let currentLang = localStorage.getItem("homeease-lang") || "en";

  function applyLanguage(lang) {
    currentLang = lang;
    const t = translations[lang] || translations.en;

    // ----- NAV -----
    if (navLinks.length) {
      const labels = [t.navHome, t.navProducts, t.navAbout, t.navContact];
      navLinks.forEach((link, i) => {
        const iconHTML = navIconsHTML[i] || "";
        link.innerHTML = iconHTML + " " + labels[i];
      });
    }

    // ----- HOME / INDEX بخش‌ها اگر روی این صفحه باشند -----
    if (heroTitle) heroTitle.innerHTML = t.heroTitleHTML;
    if (heroText) heroText.textContent = t.heroText;
    if (heroBtn) heroBtn.textContent = t.heroBtn;

    if (catsTitle) catsTitle.textContent = t.catsTitle;
    if (catsText) catsText.textContent = t.catsText;

    if (featTitle) featTitle.textContent = t.featTitle;
    if (featText) featText.textContent = t.featText;

    if (footerBrandText) footerBrandText.textContent = t.footerBrand;
    if (footerQuick) footerQuick.textContent = t.footerQuick;
    if (footerCats) footerCats.textContent = t.footerCats;
    if (footerFollow) footerFollow.textContent = t.footerFollow;
    if (footerBuilt) footerBuilt.textContent = t.footerBuilt;

    if (homeCatTitles.length && t.catLabels) {
      homeCatTitles.forEach((el, i) => {
        if (t.catLabels[i]) el.textContent = t.catLabels[i];
      });
    }
    if (footerCatLinks.length && t.catLabels) {
      footerCatLinks.forEach((el, i) => {
        if (t.catLabels[i]) el.textContent = t.catLabels[i];
      });
    }

    // ----- CONTACT PAGE -----
    if (cTitle) cTitle.textContent = t.getInTouch;
    if (cSubtitle) cSubtitle.textContent = t.subtitle;
    if (cSendMsg) cSendMsg.textContent = t.sendMessage;

    if (lblFullName) lblFullName.textContent = t.fullName;
    if (lblEmail) lblEmail.textContent = t.emailAddress;
    if (lblPhone) lblPhone.textContent = t.phoneNumber;
    if (lblMessage) lblMessage.textContent = t.message;

    if (cBtn) cBtn.textContent = t.sendBtn;

    if (cInfoTitle) cInfoTitle.textContent = t.contactInfo;
    if (cPhoneTitle) cPhoneTitle.textContent = t.cPhone;
    if (cEmailTitle) cEmailTitle.textContent = t.cEmail;
    if (cAddressTitle) cAddressTitle.textContent = t.cAddress;
    if (cHoursTitle) cHoursTitle.textContent = t.businessHours;
    if (cHoursText) cHoursText.textContent = t.hoursText;
    if (cShowroomTitle) cShowroomTitle.textContent = t.showroom;
  }

  // اجرای اولیه (بر اساس localStorage)
  applyLanguage(currentLang);
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;
      localStorage.setItem("homeease-lang", lang);
      applyLanguage(lang); // هدر + کانتکت همزمان عوض می‌شن
    });
  }

  // ===== CONTACT FORM VALIDATION =====
  if (form && statusEl) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const t = translations[currentLang];

      const name = form.fullName.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        statusEl.textContent = t.errorMsg;
        statusEl.classList.remove("success");
        statusEl.classList.add("error");
        return;
      }

      statusEl.textContent = t.successMsg;
      statusEl.classList.remove("error");
      statusEl.classList.add("success");

      form.reset();

      setTimeout(() => {
        statusEl.textContent = "";
      }, 4000);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("contactMap");

  if (map) {
    map.addEventListener("click", () => {
      window.open(
        "https://www.google.com/maps/place/123+Yonge+St,+Toronto,+ON",
        "_blank"
      );
    });
  }
});
