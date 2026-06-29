document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.querySelector(".lang-select");

  // =========================
  // NAV (Header)
  // =========================
  const navLinks = document.querySelectorAll(".nav a");
  const navIconsHTML = Array.from(navLinks).map((link) => {
    const img = link.querySelector("img");
    return img ? img.outerHTML : "";
  });

  // =========================
  // FOOTER
  // =========================
  const footerSections = document.querySelectorAll(".footer-section");
  const footerBrandText = footerSections[0]?.querySelector("p") || null;
  const footerQuick = footerSections[1]?.querySelector("h3") || null;
  const footerCats = footerSections[2]?.querySelector("h3") || null;
  const footerFollow = footerSections[3]?.querySelector("h3") || null;
  const footerBuilt = document.querySelector(".footer-bottom p:last-child");

  const footerCatLinks = footerSections[2]
    ? footerSections[2].querySelectorAll("ul li a")
    : [];

  // =========================
  // ABOUT PAGE ELEMENTS
  // =========================
  const elements = {
    aboutTitle: document.getElementById("about-title"),
    aboutP1: document.getElementById("about-p1"),
    aboutP2: document.getElementById("about-p2"),
    aboutP3: document.getElementById("about-p3"),

    valuesTitle: document.getElementById("values-title"),
    valuesSubtitle: document.getElementById("values-subtitle"),

    value1Title: document.getElementById("value1-title"),
    value1Text: document.getElementById("value1-text"),

    value2Title: document.getElementById("value2-title"),
    value2Text: document.getElementById("value2-text"),

    value3Title: document.getElementById("value3-title"),
    value3Text: document.getElementById("value3-text"),

    value4Title: document.getElementById("value4-title"),
    value4Text: document.getElementById("value4-text"),

    whyTitle: document.getElementById("why-title"),
    whySubtitle: document.getElementById("why-subtitle"),

    why1Title: document.getElementById("why1-title"),
    why1Text: document.getElementById("why1-text"),

    why2Title: document.getElementById("why2-title"),
    why2Text: document.getElementById("why2-text"),

    why3Title: document.getElementById("why3-title"),
    why3Text: document.getElementById("why3-text"),
  };

  // =========================
  // TRANSLATIONS
  // =========================
  const translations = {
    en: {
      // NAV
      navHome: "Home",
      navProducts: "Products",
      navAbout: "About",
      navContact: "Contact",

      // FOOTER
      footerBrand:
        "Your one-stop destination for all home essentials. Quality, convenience, and value in one place.",
      footerQuick: "Quick Links",
      footerCats: "Categories",
      footerFollow: "Follow Us",
      footerBuilt: "Built with ❤️ for your home.",
      catLabels: [
        "Furniture",
        "Kitchenware",
        "Electronics",
        "Lighting",
        "Decor",
        "Storage",
        "Bedding",
        "Appliances",
      ],

      // ABOUT
      aboutTitle: 'About <span>HomeEase</span>',
      aboutP1:
        "We're passionate about helping families, students, and new homeowners create comfortable, functional living spaces without the hassle of visiting multiple stores.",
      aboutP2:
        "Founded with the vision of simplifying home shopping, HomeEase brings together everything you need for your home in one convenient platform.",
      aboutP3:
        "Whether you're furnishing your first apartment, upgrading your space, or setting up your Canadian home, we make the process simple and enjoyable.",

      valuesTitle: "Our Values",
      valuesSubtitle: "The principles that guide everything we do.",

      value1Title: "Customer First",
      value1Text: "Every decision we make puts our customers first.",

      value2Title: "Quality Guaranteed",
      value2Text: "We ensure every item meets our standards.",

      value3Title: "Community Focus",
      value3Text: "We build relationships with local communities.",

      value4Title: "Innovation Driven",
      value4Text: "We find new ways to improve your experience.",

      whyTitle: "Why Choose HomeEase?",
      whySubtitle: "We make home shopping simple and reliable.",

      why1Title: "Fast & Free Delivery",
      why1Text: "Free delivery on orders over $99.",

      why2Title: "24/7 Customer Support",
      why2Text: "Our team is always ready to help.",

      why3Title: "Secure Shopping",
      why3Text: "Your information is always protected.",
    },

    fr: {
      // NAV
      navHome: "Accueil",
      navProducts: "Produits",
      navAbout: "À propos",
      navContact: "Contact",

      // FOOTER
      footerBrand:
        "Votre destination unique pour tous les essentiels de la maison. Qualité, commodité et valeur au même endroit.",
      footerQuick: "Liens rapides",
      footerCats: "Catégories",
      footerFollow: "Suivez-nous",
      footerBuilt: "Créé avec ❤️ pour votre maison.",
      catLabels: [
        "Meubles",
        "Articles de cuisine",
        "Électronique",
        "Éclairage",
        "Décor",
        "Rangement",
        "Literie",
        "Électroménagers",
      ],

      // ABOUT
      aboutTitle: 'À propos de <span>HomeEase</span>',
      aboutP1:
        "Nous aidons les familles, les étudiants et les nouveaux propriétaires à créer des espaces confortables et fonctionnels sans avoir à visiter plusieurs magasins.",
      aboutP2:
        "Créé pour simplifier les achats pour la maison, HomeEase rassemble tout ce dont vous avez besoin sur une seule plateforme pratique.",
      aboutP3:
        "Que vous aménagiez votre premier appartement, que vous amélioriez votre espace ou que vous installiez votre maison au Canada, nous rendons le processus simple et agréable.",

      valuesTitle: "Nos valeurs",
      valuesSubtitle: "Les principes qui guident tout ce que nous faisons.",

      value1Title: "Client d’abord",
      value1Text:
        "Chaque décision que nous prenons place nos clients au centre.",

      value2Title: "Qualité garantie",
      value2Text:
        "Nous veillons à ce que chaque article respecte nos normes élevées.",

      value3Title: "Communauté",
      value3Text:
        "Nous construisons des liens solides avec les communautés locales.",

      value4Title: "Innovation continue",
      value4Text:
        "Nous trouvons constamment de nouvelles façons d’améliorer votre expérience.",

      whyTitle: "Pourquoi choisir HomeEase ?",
      whySubtitle:
        "Nous rendons les achats pour la maison simples et fiables.",

      why1Title: "Livraison rapide et gratuite",
      why1Text: "Livraison gratuite pour les commandes de plus de 99 $.",

      why2Title: "Service client 24h/24 et 7j/7",
      why2Text: "Notre équipe est toujours prête à vous aider.",

      why3Title: "Achat sécurisé",
      why3Text: "Vos informations sont toujours protégées.",
    },
  };

  // =========================
  // APPLY LANGUAGE
  // =========================
  function applyLanguage(lang) {
    const t = translations[lang] || translations.en;

    // ----- NAV -----
    if (navLinks.length) {
      const labels = [t.navHome, t.navProducts, t.navAbout, t.navContact];
      navLinks.forEach((link, i) => {
        const iconHTML = navIconsHTML[i] || "";
        link.innerHTML = iconHTML + " " + labels[i];
      });
    }

    // ----- FOOTER -----
    if (footerBrandText) footerBrandText.textContent = t.footerBrand;
    if (footerQuick) footerQuick.textContent = t.footerQuick;
    if (footerCats) footerCats.textContent = t.footerCats;
    if (footerFollow) footerFollow.textContent = t.footerFollow;
    if (footerBuilt) footerBuilt.textContent = t.footerBuilt;

    if (footerCatLinks.length && t.catLabels) {
      footerCatLinks.forEach((el, i) => {
        if (t.catLabels[i]) el.textContent = t.catLabels[i];
      });
    }

    // ----- ABOUT PAGE -----
    if (elements.aboutTitle && t.aboutTitle) {
      elements.aboutTitle.innerHTML = t.aboutTitle; // span حفظ می‌شود
    }

    for (const key in elements) {
      if (key === "aboutTitle") continue; // بالا هندل شد

      const el = elements[key];
      if (el && t[key]) {
        el.textContent = t[key];
      }
    }
  }

  // =========================
  // INIT
  // =========================
  if (!langSelect) return;

  const savedLang = localStorage.getItem("homeease-lang") || "en";
  langSelect.value = savedLang;
  applyLanguage(savedLang);

  langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    localStorage.setItem("homeease-lang", lang);
    applyLanguage(lang);
  });
});
