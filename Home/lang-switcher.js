// lang.js
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.querySelector(".lang-select");

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
      catLabels: ["Furniture","Electronics","Lighting","Decor","Bedding","Kitchenware","Storage","Appliances"]
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
      catLabels: ["Meubles","Électronique","Éclairage","Décor","Literie","Articles de cuisine","Rangement","Électroménagers"]
    }
  };

  // Elements
  const heroTitle = document.getElementById("hero-title");
  const heroText = document.querySelector(".hero__content p");
  const heroBtn = document.querySelector(".hero__content .btn-outline");
  const catsTitle = document.getElementById("cats-title");
  const catsText = document.querySelector(".cats .section-head p");
  const homeCatTitles = document.querySelectorAll(".cats .cat-card .cat-title");
  const featTitle = document.getElementById("featured-title");
  const featText = document.querySelector(".featured-header p");
  const footerSections = document.querySelectorAll(".footer-section");
  const footerBrandText = footerSections[0]?.querySelector("p");
  const footerQuick = footerSections[1]?.querySelector("h3");
  const footerCats = footerSections[2]?.querySelector("h3");
  const footerFollow = footerSections[3]?.querySelector("h3");
  const footerBuilt = document.querySelector(".footer-bottom p:last-child");
  const footerCatLinks = footerSections[2]?.querySelectorAll("ul li a") || [];

  function applyLanguage(lang){
    const t = translations[lang] || translations.en;

    // Nav links
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach((link,i)=>{
      const iconHTML = link.querySelector("img")?.outerHTML || "";
      const labels = [t.navHome,t.navProducts,t.navAbout,t.navContact];
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
  }

  // Load saved language
  const savedLang = localStorage.getItem("homeease-lang") || "en";
  if(langSelect) langSelect.value = savedLang;
  applyLanguage(savedLang);

  // On change
  if(langSelect){
    langSelect.addEventListener("change", ()=>{
      const lang = langSelect.value;
      localStorage.setItem("homeease-lang", lang);
      applyLanguage(lang);
    });
  }
});
