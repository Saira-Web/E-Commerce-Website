document.addEventListener("DOMContentLoaded", () => {
  // ================== PRODUCT META ==================
  const PRODUCT_META = [
    {
      id: 1,
      name: "Dining table",
      price: 100.0,
      category: "Decor",
      brand: "BrightHome",
      rating: 5,
      mainImg: "/images /Kitchen 3.png",
      hoverImg: "/images /kitchen4.jpg",
    },
    {
      id: 2,
      name: "Lamp",
      price: 60.5,
      category: "Lighting",
      brand: "BrightHome",
      rating: 4,
      mainImg: "/images /Lamp1.png",
      hoverImg: "/images /lamp3.jpg",
    },
    {
      id: 3,
      name: "pot",
      price: 80.99,
      category: "Appliances",
      brand: "BakeMaster",
      rating: 4,
      mainImg: "/images /Kitchen.png",
      hoverImg: "/images /kitchen5.jpg",
    },
    {
      id: 4,
      name: "Mixer",
      price: 55.66,
      category: "Appliances",
      brand: "ChefMaster",
      rating: 3,
      mainImg: "/images /Kitchen-2.png",
      hoverImg: "/images /mixer.jpg",
    },
    {
      id: 5,
      name: "Mirror",
      price: 54.77,
      category: "Decor",
      brand: "ReflectStyle",
      rating: 5,
      mainImg: "/images /Mirror.png",
      hoverImg: "/images /mirror2.jpg",
    },
    {
      id: 6,
      name: "tv",
      price: 110.99,
      category: "Electronics",
      brand: "BrightHome",
      rating: 4,
      mainImg: "/images /Tv.png",
      hoverImg: "/images /tv2.jpg",
    },
  ];

  const META_BY_NAME = PRODUCT_META.reduce((acc, item) => {
    acc[item.name] = item;
    return acc;
  }, {});

  // ================= GRID & SIDEBAR BASE (Setayesh/Rolando) =================
  const productGrid = document.querySelector(".product-grid");
  const cards = Array.from(document.querySelectorAll(".product-card"));

  const filterBoxes = Array.from(document.querySelectorAll(".filter-box"));

  const categoryBox = filterBoxes.find((box) =>
    box.querySelector("h3")?.textContent.includes("Categories")
  );
  const priceBox = filterBoxes.find((box) =>
    box.querySelector("h3")?.textContent.includes("Price Range")
  );
  const brandBox = filterBoxes.find((box) =>
    box.querySelector("h3")?.textContent.includes("Brands")
  );

  const categoryLis = Array.from(categoryBox.querySelectorAll("li"));
  const priceLis = Array.from(priceBox.querySelectorAll("li"));
  const brandLis = Array.from(brandBox.querySelectorAll("li"));

  const categoryShowMoreBtn = categoryBox.querySelector(".show-more");
  const brandShowMoreBtn = brandBox.querySelector(".show-more");
  const clearBtn = document.querySelector(".clear-filters");

  categoryLis.forEach(
    (li) => (li.dataset.key = li.childNodes[0].nodeValue.trim())
  );
  priceLis.forEach((li) => (li.dataset.key = li.childNodes[0].nodeValue.trim()));
  brandLis.forEach((li) => (li.dataset.key = li.childNodes[0].nodeValue.trim()));

  // ================= SEARCH AREA =================
  const headerSearch = document.querySelector("header .search input");
  const mainSearch = document.querySelector(".products-search input");

  const categorySelect = document.querySelector(
    ".products-search select:nth-of-type(1)"
  );
  const sortSelect = document.querySelector(
    ".products-search select:nth-of-type(2)"
  );

  const categoryOptionValues = categorySelect
    ? Array.from(categorySelect.options).map((o) => o.value)
    : [];
  const sortOptionValues = sortSelect
    ? Array.from(sortSelect.options).map((o) => o.value)
    : [];

  let searchTerm = "";

  function updateSearch(value, source) {
    searchTerm = value.toLowerCase().trim();

    if (source === "header" && mainSearch) mainSearch.value = value;
    if (source === "main" && headerSearch) headerSearch.value = value;

    applyFiltersAndSort();
  }

  if (headerSearch) {
    headerSearch.addEventListener("input", (e) =>
      updateSearch(e.target.value, "header")
    );
  }

  if (mainSearch) {
    mainSearch.addEventListener("input", (e) =>
      updateSearch(e.target.value, "main")
    );
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      categoryLis.forEach((li) => li.classList.remove("active"));
      applyFiltersAndSort();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", applyFiltersAndSort);
  }

  // ============ LANGUAGE SWITCH (EN / FR) ============
  const langSelect = document.querySelector(".lang-select");

  const navLinks = document.querySelectorAll(".nav a");
  const navIconsHTML = Array.from(navLinks).map((link) => {
    const img = link.querySelector("img");
    return img ? img.outerHTML : "";
  });

  const productsTitle = document.querySelector(".products-header h2");
  const productsText = document.querySelector(".products-header p");

  const productsSearchInput = document.querySelector(".products-search input");

  const sidebarBoxes = document.querySelectorAll(".sidebar .filter-box");
  const sidebarCatsBox = sidebarBoxes[0];
  const sidebarPriceBox = sidebarBoxes[1];
  const sidebarBrandsBox = sidebarBoxes[2];

  const sidebarCatsTitle = sidebarCatsBox?.querySelector("h3");
  const sidebarCatsItems = sidebarCatsBox?.querySelectorAll("li") || [];
  const sidebarCatsMoreBtn = sidebarCatsBox?.querySelector("button");

  const sidebarPriceTitle = sidebarPriceBox?.querySelector("h3");
  const sidebarPriceItems = sidebarPriceBox?.querySelectorAll("li") || [];

  const sidebarBrandsTitle = sidebarBrandsBox?.querySelector("h3");
  const sidebarBrandsMoreBtn = sidebarBrandsBox?.querySelector("button");

  // --- FOOTER ---
  const footerSections = document.querySelectorAll(
    ".site-footer .footer-section"
  );
  const footerBrandText = footerSections[0]?.querySelector(".footer-text");
  const footerQuickTitle = footerSections[1]?.querySelector("h3");
  const footerQuickLinks =
    footerSections[1]?.querySelectorAll("ul li a") || [];
  const footerCatsTitle = footerSections[2]?.querySelector("h3");
  const footerCatsLinks = footerSections[2]?.querySelectorAll("ul li a") || [];
  const footerFollowTitle = footerSections[3]?.querySelector("h3");
  const footerBottomText = document.querySelector(
    ".footer-bottom p:last-child"
  );

  const translations = {
    en: {
      // nav
      navHome: "Home",
      navProducts: "Products",
      navAbout: "About",
      navContact: "Contact",

      // header products
      productsTitle: "All Products",
      productsText: "Discover everything you need for your perfect home",
      productsSearchPlaceholder: "Search products...",

      // search selects
      categorySelect: [
        "All Categories",
        "Lighting",
        "Appliances",
        "Decor",
        "Electronics",
      ],
      sortSelect: ["A–Z", "Z–A", "Lowest Price", "Highest Price"],

      // sidebar
      sidebarCatsTitle: "Categories",
      sidebarCats: ["Lighting", "Appliances", "Decor", "Electronics"],
      sidebarCatsMore: "Show more",

      sidebarPriceTitle: "Price Range",
      sidebarPrice: [
        "Under $50",
        "$50–$100",
        "$100–200",
        "$200–500",
        "Over $500",
      ],

      sidebarBrandsTitle: "Brands",
      sidebarBrandsMore: "Show more",
      clearFilters: "Clear Filters",

      // footer
      footerBrand:
        "Your one-stop destination for all home essentials. Quality, convenience, and value in one place.",
      footerQuickTitle: "Quick Links",
      footerQuick: ["Home", "About", "Contact"],
      footerCatsTitle: "Categories",
      footerCats: [
        "Furniture",
        "Kitchenware",
        "Electronics",
        "Lighting",
        "Decor",
        "Storage",
        "Bedding",
        "Appliances",
      ],
      footerFollowTitle: "Follow Us",
      footerBuilt: "Built with ❤️ for your home.",
    },

    fr: {
      // nav
      navHome: "Accueil",
      navProducts: "Produits",
      navAbout: "À propos",
      navContact: "Contact",

      // header products
      productsTitle: "Tous les produits",
      productsText:
        "Découvrez tout ce dont vous avez besoin pour votre maison idéale.",
      productsSearchPlaceholder: "Rechercher des produits...",

      // search selects
      categorySelect: [
        "Toutes les catégories",
        "Éclairage",
        "Électroménagers",
        "Décor",
        "Électronique",
      ],
      sortSelect: [
        "A–Z",
        "Z–A",
        "Prix le plus bas",
        "Prix le plus élevé",
      ],

      // sidebar
      sidebarCatsTitle: "Catégories",
      sidebarCats: ["Éclairage", "Électroménagers", "Décor", "Électronique"],
      sidebarCatsMore: "Afficher plus",

      sidebarPriceTitle: "Fourchette de prix",
      sidebarPrice: [
        "Moins de 50 $",
        "50–100 $",
        "100–200 $",
        "200–500 $",
        "Plus de 500 $",
      ],

      sidebarBrandsTitle: "Marques",
      sidebarBrandsMore: "Afficher plus",
      clearFilters: "Réinitialiser les filtres",

      // footer
      footerBrand:
        "Votre destination unique pour tous les essentiels de la maison. Qualité, commodité et valeur au même endroit.",
      footerQuickTitle: "Liens rapides",
      footerQuick: ["Accueil", "À propos", "Contact"],
      footerCatsTitle: "Catégories",
      footerCats: [
        "Meubles",
        "Articles de cuisine",
        "Électronique",
        "Éclairage",
        "Décor",
        "Rangement",
        "Literie",
        "Électroménagers",
      ],
      footerFollowTitle: "Suivez-nous",
      footerBuilt: "Créé avec ❤️ pour votre maison.",
    },
  };

  function applyLanguage(lang) {
    const t = translations[lang] || translations.en;

    // --- nav ---
    const navLabels = [t.navHome, t.navProducts, t.navAbout, t.navContact];
    navLinks.forEach((link, i) => {
      const iconHTML = navIconsHTML[i] || "";
      link.innerHTML = iconHTML + " " + navLabels[i];
    });

    // --- header products ---
    if (productsTitle) productsTitle.textContent = t.productsTitle;
    if (productsText) productsText.textContent = t.productsText;
    if (productsSearchInput)
      productsSearchInput.placeholder = t.productsSearchPlaceholder;

    if (categorySelect) {
      const opts = categorySelect.options;
      t.categorySelect.forEach((txt, i) => {
        if (opts[i]) {
          opts[i].textContent = txt;
          opts[i].value = categoryOptionValues[i];
        }
      });
    }

    // sort select
    if (sortSelect) {
      const opts = sortSelect.options;
      t.sortSelect.forEach((txt, i) => {
        if (opts[i]) {
          opts[i].textContent = txt;
          opts[i].value = sortOptionValues[i];
        }
      });
    }

    // --- sidebar: categories ---
    if (sidebarCatsTitle) sidebarCatsTitle.textContent = t.sidebarCatsTitle;
    sidebarCatsItems.forEach((li, i) => {
      if (t.sidebarCats[i]) {
        li.childNodes[0].textContent = t.sidebarCats[i] + " ";
      }
    });
    if (sidebarCatsMoreBtn) sidebarCatsMoreBtn.textContent = t.sidebarCatsMore;

    // price range
    if (sidebarPriceTitle) sidebarPriceTitle.textContent = t.sidebarPriceTitle;
    sidebarPriceItems.forEach((li, i) => {
      if (t.sidebarPrice[i]) {
        li.childNodes[0].textContent = t.sidebarPrice[i] + " ";
      }
    });

    // brands
    if (sidebarBrandsTitle) sidebarBrandsTitle.textContent = t.sidebarBrandsTitle;
    if (sidebarBrandsMoreBtn)
      sidebarBrandsMoreBtn.textContent = t.sidebarBrandsMore;

    if (clearBtn) clearBtn.textContent = t.clearFilters;

    // --- footer ---
    if (footerBrandText) footerBrandText.textContent = t.footerBrand;

    if (footerQuickTitle) footerQuickTitle.textContent = t.footerQuickTitle;
    footerQuickLinks.forEach((a, i) => {
      if (t.footerQuick[i]) a.textContent = t.footerQuick[i];
    });

    if (footerCatsTitle) footerCatsTitle.textContent = t.footerCatsTitle;
    footerCatsLinks.forEach((a, i) => {
      if (t.footerCats[i]) a.textContent = t.footerCats[i];
    });

    if (footerFollowTitle) footerFollowTitle.textContent = t.footerFollowTitle;
    if (footerBottomText) footerBottomText.textContent = t.footerBuilt;
  }

  const savedLang = localStorage.getItem("homeease-lang") || "en";
  applyLanguage(savedLang);
  if (langSelect) langSelect.value = savedLang;

  if (langSelect) {
    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;
      localStorage.setItem("homeease-lang", lang);
      applyLanguage(lang);
    });
  }

  // ================= MAIN FILTERS & SORT(Saira/Setayesh) =================
  const products = cards
    .map((card) => {
      const name = card.querySelector("h4").textContent.trim();
      const meta = META_BY_NAME[name];

      if (!meta) {
        console.warn("No meta defined for product:", name);
        return null;
      }

      card.dataset.name = name.toLowerCase();
      card.dataset.category = meta.category;
      card.dataset.brand = meta.brand;
      card.dataset.price = meta.price;
      card.dataset.rating = meta.rating;

      const priceEl = card.querySelector(".product-info p");
      priceEl.textContent = `$ ${meta.price.toFixed(2)}`;

      renderStars(card, meta.rating);

      return {
        card,
        name,
        category: meta.category,
        brand: meta.brand,
        price: meta.price,
        rating: meta.rating,
      };
    })
    .filter(Boolean);

  function renderStars(card, rating) {
    const starsEl = card.querySelector(".stars");
    const full = Math.round(rating);
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += i <= full ? "★" : "☆";
    }
    starsEl.textContent = html;
  }

  function getPriceRangeLabel(price) {
    if (price < 50) return "Under $50";
    if (price < 100) return "$50–$100";
    if (price < 200) return "$100–200";
    if (price < 500) return "$200–500";
    return "Over $500";
  }

  function recomputeSidebarCounts() {
    const categoryCounts = {};
    const brandCounts = {};
    const priceCounts = {
      "Under $50": 0,
      "$50–$100": 0,
      "$100–200": 0,
      "$200–500": 0,
      "Over $500": 0,
    };

    products.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
      priceCounts[getPriceRangeLabel(p.price)]++;
    });

    categoryLis.forEach((li) => {
      const key = li.dataset.key;
      const span = li.querySelector("span");
      span.textContent = categoryCounts[key] || 0;
    });

    priceLis.forEach((li) => {
      const key = li.dataset.key;
      const span = li.querySelector("span");
      span.textContent = priceCounts[key] || 0;
    });

    brandLis.forEach((li) => {
      const key = li.dataset.key;
      const span = li.querySelector("span");
      span.textContent = brandCounts[key] || 0;
    });
  }

  function initShowMore(listItems, button) {
    if (!button) return;

    const HIDDEN_CLASS = "is-hidden";

    listItems.forEach((li, index) => {
      if (index > 2) {
        li.classList.add(HIDDEN_CLASS);
        li.style.display = "none";
      }
    });

    let expanded = false;

    button.addEventListener("click", () => {
      expanded = !expanded;

      listItems.forEach((li, index) => {
        if (index > 2) {
          li.style.display = expanded ? "flex" : "none";
        }
      });

      button.textContent = expanded ? "Show less" : "Show more";
    });
  }

  function setupSingleSelect(listItems) {
    listItems.forEach((li) => {
      li.addEventListener("click", () => {
        const alreadyActive = li.classList.contains("active");

        listItems.forEach((item) => item.classList.remove("active"));

        if (!alreadyActive) {
          li.classList.add("active");
        }

        applyFiltersAndSort();
      });
    });
  }

  function applyFiltersAndSort() {
    const activeCategories = new Set(
      categoryLis
        .filter((li) => li.classList.contains("active"))
        .map((li) => li.dataset.key)
    );
    const activeBrands = new Set(
      brandLis
        .filter((li) => li.classList.contains("active"))
        .map((li) => li.dataset.key)
    );
    const activePrices = new Set(
      priceLis
        .filter((li) => li.classList.contains("active"))
        .map((li) => li.dataset.key)
    );

    const selectCategoryValue = categorySelect
      ? categorySelect.value
      : categoryOptionValues[0] || "";

    products.forEach((p) => {
      let visible = true;

      if (searchTerm) {
        const text = `${p.name} ${p.category} ${p.brand}`.toLowerCase();
        if (!text.includes(searchTerm)) visible = false;
      }

      if (visible && activeCategories.size > 0) {
        if (!activeCategories.has(p.category)) visible = false;
      }

      const allValue = categoryOptionValues[0];

      if (
        visible &&
        selectCategoryValue &&
        allValue &&
        selectCategoryValue !== allValue
      ) {
        if (p.category !== selectCategoryValue) visible = false;
      }

      if (visible && activeBrands.size > 0) {
        if (!activeBrands.has(p.brand)) visible = false;
      }

      if (visible && activePrices.size > 0) {
        const rangeLabel = getPriceRangeLabel(p.price);
        if (!activePrices.has(rangeLabel)) visible = false;
      }

      p.card.style.display = visible ? "" : "none";
    });

    applySorting();
  }

  function applySorting() {
    if (!sortSelect) return;

    const value = sortSelect.value;
    const visibleProducts = products.filter(
      (p) => p.card.style.display !== "none"
    );

    let sorted = [...visibleProducts];

    if (value === "A–Z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "Z–A") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (value === "Lowest Price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "Highest Price") {
      sorted.sort((a, b) => b.price - a.price);
    }

    sorted.forEach((p) => productGrid.appendChild(p.card));
  }

  // Clear Filters Button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      [...categoryLis, ...priceLis, ...brandLis].forEach((li) =>
        li.classList.remove("active")
      );
      if (headerSearch) headerSearch.value = "";
      if (mainSearch) mainSearch.value = "";
      searchTerm = "";
      if (categorySelect) categorySelect.value = categoryOptionValues[0] || "";
      if (sortSelect) sortSelect.value = sortOptionValues[0] || "";
      applyFiltersAndSort();
    });
  }

  recomputeSidebarCounts();
  initShowMore(categoryLis, categoryShowMoreBtn);
  initShowMore(brandLis, brandShowMoreBtn);
  setupSingleSelect(categoryLis);
  setupSingleSelect(priceLis);
  setupSingleSelect(brandLis);
  applyFiltersAndSort();
});
