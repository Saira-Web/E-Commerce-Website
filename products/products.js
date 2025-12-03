document.addEventListener("DOMContentLoaded", () => {
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

  // ================= HEADER & LEFT SIDEBAR (Setayesh / Rolando) =================
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

  // ================= SEARCH AREA =================
  const headerSearch = document.querySelector("header .search input");
  const mainSearch = document.querySelector(".products-search input");

  const categorySelect = document.querySelector(
    ".products-search select:nth-of-type(1)"
  );
  const sortSelect = document.querySelector(
    ".products-search select:nth-of-type(2)"
  );

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

  // ================= MAIN FILTERS & SORT (Saira / Setayesh) =================
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
      const label = li.childNodes[0].nodeValue.trim();
      const span = li.querySelector("span");
      span.textContent = categoryCounts[label] || 0;
    });

    priceLis.forEach((li) => {
      const label = li.childNodes[0].nodeValue.trim();
      const span = li.querySelector("span");
      span.textContent = priceCounts[label] || 0;
    });

    brandLis.forEach((li) => {
      const label = li.childNodes[0].nodeValue.trim();
      const span = li.querySelector("span");
      span.textContent = brandCounts[label] || 0;
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
        .map((li) => li.childNodes[0].nodeValue.trim())
    );
    const activeBrands = new Set(
      brandLis
        .filter((li) => li.classList.contains("active"))
        .map((li) => li.childNodes[0].nodeValue.trim())
    );
    const activePrices = new Set(
      priceLis
        .filter((li) => li.classList.contains("active"))
        .map((li) => li.childNodes[0].nodeValue.trim())
    );

    const selectCategoryValue = categorySelect
      ? categorySelect.value
      : "All Categories";

    products.forEach((p) => {
      let visible = true;

      if (searchTerm) {
        const text = `${p.name} ${p.category} ${p.brand}`.toLowerCase();
        if (!text.includes(searchTerm)) visible = false;
      }

      if (visible && activeCategories.size > 0) {
        if (!activeCategories.has(p.category)) visible = false;
      }

      if (
        visible &&
        selectCategoryValue &&
        selectCategoryValue !== "All Categories"
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
const clearBtn = document.querySelector(".clear-filters");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    [...categoryLis, ...priceLis, ...brandLis].forEach((li) =>
      li.classList.remove("active")
    );
    if (headerSearch) headerSearch.value = "";
    if (mainSearch) mainSearch.value = "";
    searchTerm = "";
    if (categorySelect) categorySelect.value = "All Categories";
    if (sortSelect) sortSelect.value = "Default";
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
