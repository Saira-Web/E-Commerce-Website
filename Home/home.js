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
      if (e.key === "Enter") goToSearch();
    });
  }

  // --- Redirect Show More buttons to products page ---
  document.querySelectorAll(".btn-outline").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "/products/products.html";
    });
  });

  // --- Redirect View All button to products page ---
  const viewAll = document.querySelector(".view-all");
  if (viewAll) {
    viewAll.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/products/products.html";
    });
  }

  // ===== ELEMENTS =====
  const langSelect = document.querySelector(".lang-select");

  const heroTitle  = document.getElementById("hero-title");
  const heroText   = document.querySelector(".hero__content p");
  const heroBtn    = document.querySelector(".hero__content .btn-outline");

  const catsTitle  = document.getElementById("cats-title");
  const catsText   = document.querySelector(".cats .section-head p");

  const featTitle  = document.getElementById("featured-title");
  const featText   = document.querySelector(".featured-header p");

  const footerSections = document.querySelectorAll(".footer-section");
  const footerBrandText = footerSections[0]?.querySelector("p") || null;
  const footerQuick  = footerSections[1]?.querySelector("h3") || null;
  const footerCats   = footerSections[2]?.querySelector("h3") || null;
  const footerFollow = footerSections[3]?.querySelector("h3") || null;
  const footerBuilt  = document.querySelector(".footer-bottom p:last-child");
  const homeCatTitles = document.querySelectorAll(".cats .cat-card .cat-title");
  const footerCatLinks = footerSections[2]?.querySelectorAll("ul li a") || [];

  const loginText = document.querySelector(".login span");
  const cartTitle = document.querySelector(".cart-dropdown .cart-title");
  const cartSummaryTotal = document.querySelector(".cart-summary span:first-child"); // "Total:"
  const checkoutBtn = document.querySelector(".cart-dropdown .checkout-btn");

  // ===== TRANSLATIONS =====
  const translations = {
    en: {
      navHome: "Home",
      navProducts: "Products",
      navAbout: "About",
      navContact: "Contact",
      heroTitleHTML: '<span class="color">Everything</span> for your <span class="color">dream home</span>',
      heroText: "From furniture to kitchenware, electronics to lighting—find everything you need to make your house feel like home, all in one place.",
      heroBtn: "Shop now",
      catsTitle: "Shop by Category",
      catsText: "Find everything you need for every room in your home",
      featTitle: "Featured Products",
      featText: "Our most popular items, loved by thousands of customers",
      footerBrand: "Your one-stop destination for all home essentials. Quality, convenience, and value in one place.",
      footerQuick: "Quick Links",
      footerCats: "Categories",
      footerFollow: "Follow Us",
      footerBuilt: "Built with ❤️ for your home.",
      catLabels: ["Furniture","Electronics","Lighting","Decor","Bedding","Kitchenware","Storage","Appliances"],
      login: "Log in",
      cartTitle: "My Cart",
      cartTotalLabel: "Total:",
      checkoutBtn: "Go to checkout"
    },
    fr: {
      navHome: "Accueil",
      navProducts: "Produits",
      navAbout: "À propos",
      navContact: "Contact",
      heroTitleHTML: '<span class="color">Tout</span> pour votre <span class="color">maison de rêve</span>',
      heroText: "Des meubles à la vaisselle, de l’électronique à l’éclairage — trouvez tout ce dont vous avez besoin pour vous sentir chez vous.",
      heroBtn: "Magasiner",
      catsTitle: "Magasiner par catégorie",
      catsText: "Trouvez tout ce qu’il vous faut pour chaque pièce de votre maison.",
      featTitle: "Produits vedettes",
      featText: "Nos articles les plus populaires, appréciés par des milliers de clients.",
      footerBrand: "Votre destination unique pour tous les essentiels de la maison. Qualité, commodité et valeur au même endroit.",
      footerQuick: "Liens rapides",
      footerCats: "Catégories",
      footerFollow: "Suivez-nous",
      footerBuilt: "Créé avec ❤️ pour votre maison.",
      catLabels: ["Meubles","Électronique","Éclairage","Décor","Literie","Articles de cuisine","Rangement","Électroménagers"],
      login: "Se connecter",
      cartTitle: "Mon panier",
      cartTotalLabel: "Total :",
      checkoutBtn: "Passer à la caisse"
    }
  };

  // ===== FUNCTION TO APPLY LANGUAGE =====
  function applyLanguage(lang) {
    const t = translations[lang] || translations.en;

    // Nav links
    const navLinks = document.querySelectorAll(".nav a");
    const labels = [t.navHome, t.navProducts, t.navAbout, t.navContact];
    navLinks.forEach((link, i) => {
      const iconHTML = link.querySelector("img")?.outerHTML || "";
      link.innerHTML = iconHTML + " " + labels[i];
    });

    // Hero
    if(heroTitle) heroTitle.innerHTML = t.heroTitleHTML;
    if(heroText) heroText.textContent = t.heroText;
    if(heroBtn) heroBtn.textContent = t.heroBtn;

    // Categories
    if(catsTitle) catsTitle.textContent = t.catsTitle;
    if(catsText) catsText.textContent = t.catsText;
    homeCatTitles.forEach((el,i)=>{ if(t.catLabels[i]) el.textContent = t.catLabels[i]; });

    // Featured
    if(featTitle) featTitle.textContent = t.featTitle;
    if(featText) featText.textContent = t.featText;

    // Footer
    if(footerBrandText) footerBrandText.textContent = t.footerBrand;
    if(footerQuick) footerQuick.textContent = t.footerQuick;
    if(footerCats) footerCats.textContent = t.footerCats;
    if(footerFollow) footerFollow.textContent = t.footerFollow;
    if(footerBuilt) footerBuilt.textContent = t.footerBuilt;
    footerCatLinks.forEach((el,i)=>{ if(t.catLabels[i]) el.textContent = t.catLabels[i]; });

    // Header login + cart
    if (loginText) loginText.textContent = t.login;
    if (cartTitle) cartTitle.textContent = t.cartTitle;
    if (cartSummaryTotal) cartSummaryTotal.textContent = t.cartTotalLabel;
    if (checkoutBtn) checkoutBtn.textContent = t.checkoutBtn;
  }

  // ===== INITIAL LANGUAGE SETUP =====
  const savedLang = localStorage.getItem("homeease-lang") || "en";
  if(langSelect) langSelect.value = savedLang;
  applyLanguage(savedLang);

  // On dropdown change
  if(langSelect){
    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;
      localStorage.setItem("homeease-lang", lang);
      applyLanguage(lang);
    });
  }
});
