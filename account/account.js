document.addEventListener("DOMContentLoaded", () => {
  // عناصر اصلی
  const nameEl = document.getElementById("accountName");
  const emailEl = document.getElementById("accountEmail");
  const avatarInitial = document.getElementById("avatarInitial");

  const ovName = document.getElementById("ovName");
  const ovEmail = document.getElementById("ovEmail");
  const ovOrders = document.getElementById("ovOrders");
  const ovLastOrder = document.getElementById("ovLastOrder");

  const ordersList = document.getElementById("ordersList");

  const profileForm = document.getElementById("profileForm");
  const profileNameInput = document.getElementById("profileName");
  const profileEmailInput = document.getElementById("profileEmail");
  const newPasswordInput = document.getElementById("newPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const statusEl = document.getElementById("accountStatus");

  const navButtons = document.querySelectorAll(".account-nav-btn");
  const tabs = document.querySelectorAll(".account-tab");
  
  // ===== Load profile from localStorage =====
  function loadProfile() {
    const storedName = localStorage.getItem("homeease-profile-name") || "Guest";
    const storedEmail =
      localStorage.getItem("homeease-profile-email") || "guest@example.com";

    nameEl.textContent = storedName;
    emailEl.textContent = storedEmail;

    ovName.textContent = storedName;
    ovEmail.textContent = storedEmail;

    profileNameInput.value = storedName;
    profileEmailInput.value = storedEmail;

    avatarInitial.textContent = storedName.trim()[0]?.toUpperCase() || "G";
    const loginSpan = document.querySelector(".login span");
    if (loginSpan) {
      loginSpan.textContent = storedName;
    }
  }

  // ===== Orders render =====
  function renderOrders() {
    if (!ordersList) return;

    ordersList.innerHTML = "";

    if (!demoOrders.length) {
      ordersList.innerHTML = "<p>You have no orders yet.</p>";
      ovOrders.textContent = "0";
      ovLastOrder.textContent = "—";
      return;
    }

    ovOrders.textContent = String(demoOrders.length);
    ovLastOrder.textContent = demoOrders[0].date;

    demoOrders.forEach((order) => {
      const card = document.createElement("article");
      card.className = "order-card";

      card.innerHTML = `
        <div class="order-main">
          <p><strong>Order #${order.id}</strong></p>
          <p>${order.date} • ${order.items} item(s)</p>
        </div>
        <div class="order-side">
          <p><strong>$${order.total.toFixed(2)}</strong></p>
          <p class="order-status ${order.status}">
            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </p>
        </div>
      `;
      ordersList.appendChild(card);
    });
  }

  // ===== Tabs switching =====
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.dataset.tab;

      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.id === `tab-${tabName}`);
      });
    });
  });

  // ===== Profile form submit =====
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.className = "form-status";

    const name = profileNameInput.value.trim();
    const email = profileEmailInput.value.trim();
    const newPass = newPasswordInput.value;
    const confirmPass = confirmPasswordInput.value;

    if (!name || !email) {
      statusEl.textContent = "Name and email are required.";
      statusEl.classList.add("error");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      statusEl.textContent = "Please enter a valid email address.";
      statusEl.classList.add("error");
      return;
    }

    if (newPass || confirmPass) {
      if (newPass.length < 6) {
        statusEl.textContent =
          "Password should be at least 6 characters long.";
        statusEl.classList.add("error");
        return;
      }
      if (newPass !== confirmPass) {
        statusEl.textContent = "Passwords do not match.";
        statusEl.classList.add("error");
        return;
      }
    }

 
    localStorage.setItem("homeease-profile-name", name);
    localStorage.setItem("homeease-profile-email", email);

    loadProfile();

   
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";

    statusEl.textContent = "Profile updated successfully.";
    statusEl.classList.add("success");
  });

  // ===== initial load =====
  loadProfile();
  renderOrders();
});
