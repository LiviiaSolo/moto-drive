// // === Global State & Data ===
// const bikes = [
//   { id: 1, brand: "BMW", name: "M 1000 XR", price: 24500, engine: "999cc Inline-4", year: "2025", type: "Sport Touring", img: "images/BMW-M-1000XR.png" },
//   { id: 2, brand: "Yamaha", name: "MT-07", price: 7500, engine: "689cc", year: "2022", type: "Naked", img: "images/Yamaha-MT-07.png" },
//   { id: 3, brand: "Ducati", name: "Multistrada V4", price: 25390, engine: "1158cc", year: "2025", type: "Adventure / Touring", img: "images/Ducati-Multistrada.png" },
//   { id: 4, brand: "Kawasaki", name: "Ninja 650", price: 8200, engine: "649cc", year: "2021", type: "Sport", img: "images/Kawasaki-Ninja-650.png" },
//   { id: 5, brand: "Honda", name: "CBR 1100XX Super Blackbird", price: 11999, engine: "1137cc", year: "2007", type: "Sport", img: "images/Honda-Super Blackbird.png" },
//   { id: 6, brand: "Aprilia", name: "Tuono V4", price: 19699, engine: "1099cc", year: "2025", type: "Sport / Naked", img: "images/Aprilia-Tuono-V4.png" },
//   { id: 7, brand: "BMW", name: "R1200GS", price: 14500, engine: "1170cc", year: "2019", type: "Adventure", img: "images/BMW-R1200GS.png" },
//   { id: 8, brand: "BMW", name: "R1250GS", price: 17900, engine: "1254cc", year: "2023", type: "Adventure", img: "images/BMW-R1250GS.png" },
//   { id: 9, brand: "Kawasaki", name: "Ninja 650", price: 8200, engine: "649cc", year: "2024", type: "Sport", img: "images/Kawasaki-Ninja.png" }
// ];

// let showAll = false;
// const FEATURED_COUNT = 6;
// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // === DOM elements ===
// let bikeContainer, brandFilter, cartCount, cartBox, cartItems, cartBtn, showAllBtn, showFeaturedBtn;

// // === Initialization ===
// document.addEventListener("DOMContentLoaded", () => {
//   // Bind Elements
//   bikeContainer = document.querySelector(".bikes");
//   brandFilter = document.getElementById("brandFilter");
//   cartCount = document.getElementById("cartCount");
//   cartBox = document.getElementById("cart");
//   cartItems = document.getElementById("cartItems");
//   cartBtn = document.getElementById("cartBtn");
//   showAllBtn = document.getElementById("showAllBtn");
//   showFeaturedBtn = document.getElementById("showFeaturedBtn");

//   // Init Burger Menu
//   initBurgerMenu();

//   // Init Catalog & Cart
//   renderBikes();
//   renderCart();
//   initSingleBikePage();
//   initEventListeners();
//   initContactForm(); 
// });

// // === Burger menu logic ===
// function initBurgerMenu() {
//   const burger = document.getElementById("burger");
//   const navMenu = document.getElementById("navMenu");

//   if (!burger || !navMenu) return;

//   burger.addEventListener("click", (e) => {
//     e.stopPropagation();
//     burger.classList.toggle("active");
//     navMenu.classList.toggle("open");
//   });

//   document.querySelectorAll("#navMenu a").forEach(link => {
//     link.addEventListener("click", () => {
//       burger.classList.remove("active");
//       navMenu.classList.remove("open");
//     });
//   });

//   document.addEventListener("click", (e) => {
//     if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !burger.contains(e.target)) {
//       navMenu.classList.remove("open");
//       burger.classList.remove("active");
//     }
//   });
// }

// // === Configuring event listeners ===
// function initEventListeners() {
//   if (cartBtn) cartBtn.addEventListener("click", openCart);

//   if (showAllBtn) {
//     showAllBtn.addEventListener("click", () => {
//       showAll = true;
//       renderBikes(brandFilter?.value || "all");
//     });
//   }

//   if (showFeaturedBtn) {
//     showFeaturedBtn.addEventListener("click", () => {
//       showAll = false;
//       renderBikes(brandFilter?.value || "all");
//     });
//   }

//   if (brandFilter) {
//     brandFilter.addEventListener("change", (e) => {
//       renderBikes(e.target.value);
//     });
//   }

//   const checkoutForm = document.getElementById("checkoutForm");
//   if (checkoutForm) {
//     checkoutForm.addEventListener("submit", handleCheckoutSubmit);
//   }

//   const backBtn = document.getElementById("backBtn");
//   if (backBtn) {
//     backBtn.addEventListener("click", () => {
//       if (window.history.length > 1) {
//         history.back();
//       } else {
//         window.location.href = "index.html#bikes";
//       }
//     });
//   }
// }

// // === Contact Form Handler ===
// function initContactForm() {
//   const contactForm = document.querySelector("#contact form");

//   if (!contactForm) return;

//   contactForm.addEventListener("submit", (e) => {
//     e.preventDefault(); 

//     const nameInput = contactForm.querySelector('input[type="text"]');
//     const emailInput = contactForm.querySelector('input[type="email"]');
//     const textarea = contactForm.querySelector("textarea");

//     const formData = {
//       name: nameInput ? nameInput.value : "",
//       email: emailInput ? emailInput.value : "",
//       message: textarea ? textarea.value : ""
//     };

//     console.log("Contact form submitted:", formData);

//     // Show message to user
//     alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);

//     // Clear the form (including the text field for the test drive)
//     contactForm.reset();
//   });
// }

// // === Helpers ===
// function saveCart() {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// function formatPrice(amount) {
//   return "€" + amount.toLocaleString();
// }

// // === Motorcycle catalog rendering ===
// function renderBikes(filter = "all") {
//   if (!bikeContainer) return;

//   let filtered = bikes.filter(b => filter === "all" || b.brand === filter);

//   if (!showAll) {
//     filtered = filtered.slice(0, FEATURED_COUNT);
//   }

//   // Optimize DOM
//   bikeContainer.innerHTML = filtered.map(b => `
//     <div class="bike">
//       <a href="bike.html?id=${b.id}" class="bike-img-link">
//         <img src="${b.img}" alt="${b.brand} ${b.name}">
//       </a>
//       <h3>
//         <a href="bike.html?id=${b.id}" class="bike-title-link">
//           ${b.brand} ${b.name}
//         </a>
//       </h3>
//       <span>${formatPrice(b.price)}</span>
//       <div class="bike-actions" style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 8px;">
//         <button class="btn" onclick="addToCart(${b.id})" style="flex: 1; min-width: 120px; font-size: 0.85rem; padding: 10px 6px;">
//           🛒 Add to Cart
//         </button>
//         <button class="btn test-drive-btn" onclick="openTestDriveModal('${b.brand} ${b.name}')" style="flex: 1; min-width: 120px; font-size: 0.85rem; padding: 10px 6px; border-color: var(--color-accent);">
//           🏍️ Test Drive
//         </button>
//         <a class="details-btn" href="bike.html?id=${b.id}" style="width: 100%; text-align: center; margin-top: 5px;">
//           View details →
//         </a>
//       </div>
//     </div>
//   `).join("");

//   updateToggleButtons();
// }

// // === Cart Functionality ===
// function addToCart(id) {
//   const bike = bikes.find(b => b.id === id);
//   if (!bike) return;

//   const existingItem = cart.find(item => item.id === id);
//   if (existingItem) {
//     existingItem.quantity = (existingItem.quantity || 1) + 1;
//   } else {
//     cart.push({ ...bike, quantity: 1 });
//   }

//   saveCart();
//   renderCart();
//   openCart();
// }

// function removeFromCart(id) {
//   cart = cart.filter(item => item.id !== id);
//   saveCart();
//   renderCart();
// }

// function updateQuantity(id, delta) {
//   const item = cart.find(i => i.id === id);
//   if (!item) return;

//   item.quantity += delta;
//   if (item.quantity <= 0) {
//     removeFromCart(id);
//   } else {
//     saveCart();
//     renderCart();
//   }
// }

// function clearCart() {
//   cart = [];
//   saveCart();
//   renderCart();
// }

// function calculateTotal() {
//   return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
// }

// function renderCart() {
//   const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
//   if (cartCount) cartCount.textContent = totalItems;

//   if (!cartItems) return;

//   if (cart.length === 0) {
//     cartItems.innerHTML = `<li style="justify-content: center; opacity: 0.6; padding: 20px 0;">Your cart is empty</li>`;
//   } else {
//     cartItems.innerHTML = cart.map(item => {
//       const qty = item.quantity || 1;
//       return `
//         <li>
//           <div style="display: flex; flex-direction: column;">
//             <strong>${item.brand} ${item.name}</strong>
//             <small style="color: var(--color-accent);">${formatPrice(item.price)} x ${qty}</small>
//           </div>
//           <div style="display: flex; align-items: center; gap: 8px;">
//             <button onclick="updateQuantity(${item.id}, -1)" style="padding: 2px 6px;">-</button>
//             <span>${qty}</span>
//             <button onclick="updateQuantity(${item.id}, 1)" style="padding: 2px 6px;">+</button>
//             <button onclick="removeFromCart(${item.id})" style="margin-left: 8px; color: var(--color-accent);">✕</button>
//           </div>
//         </li>
//       `;
//     }).join("");
//   }

//   const cartTotalEl = document.getElementById("cartTotal");
//   if (cartTotalEl) {
//     cartTotalEl.textContent = formatPrice(calculateTotal());
//   }
// }

// // === Drawer Controls ===
// function openCart() {
//   if (cartBox) cartBox.classList.add("open");
// }

// function closeCart() {
//   if (cartBox) cartBox.classList.remove("open");
// }

// // === Filter & Catalog Controls ===
// function updateToggleButtons() {
//   if (!showAll) {
//     if (showAllBtn) showAllBtn.style.display = "inline-block";
//     if (showFeaturedBtn) showFeaturedBtn.style.display = "none";
//   } else {
//     if (showAllBtn) showAllBtn.style.display = "none";
//     if (showFeaturedBtn) showFeaturedBtn.style.display = "inline-block";
//   }
// }

// // === Initialization function ===
// function initSingleBikePage() {
//   const params = new URLSearchParams(window.location.search);
//   const bikeId = Number(params.get("id"));

//   if (!bikeId) return;

//   const bike = bikes.find(b => b.id === bikeId);
//   if (bike) {
//     const imgEl = document.getElementById("bikeImage");
//     const nameEl = document.getElementById("bikeName");
//     const brandEl = document.getElementById("bikeBrand");
//     const priceEl = document.getElementById("bikePrice");
//     const engineEl = document.getElementById("bikeEngine");
//     const yearEl = document.getElementById("bikeYear");
//     const typeEl = document.getElementById("bikeType");

//     if (imgEl) imgEl.src = bike.img;
//     if (nameEl) nameEl.textContent = bike.name;
//     if (brandEl) brandEl.textContent = bike.brand;
//     if (priceEl) priceEl.textContent = formatPrice(bike.price);
//     if (engineEl) engineEl.textContent = bike.engine;
//     if (yearEl) yearEl.textContent = bike.year;
//     if (typeEl) typeEl.textContent = bike.type;
//   }

//   const addBtn = document.getElementById("addBtn");
//   if (addBtn) {
//     addBtn.addEventListener("click", () => {
//       addToCart(bikeId);
//       const originalText = addBtn.textContent;
//       addBtn.textContent = "Added to Cart ✓";
//       addBtn.classList.add("added");

//       setTimeout(() => {
//         addBtn.textContent = originalText;
//         addBtn.classList.remove("added");
//       }, 2000);
//     });
//   }
// }

// // === Test Drive Modal ===
// function openTestDriveModal(modelName) {
//   const contactSection = document.getElementById("contact");
//   if (contactSection) {
//     contactSection.scrollIntoView({ behavior: "smooth" });
//     const textarea = contactSection.querySelector("textarea");
//     if (textarea) {
//       textarea.value = `Hello, I would like to book a test drive for the ${modelName}.`;
//       textarea.focus();
//     }
//   } else {
//     alert(`Thank you for your interest in ${modelName}! Please use the contact form to book a test drive.`);
//   }
// }

// // === Checkout Modal Functions ===
// function openCheckoutModal() {
//   if (cart.length === 0) {
//     alert("Your cart is empty!");
//     return;
//   }

//   const checkoutModal = document.getElementById("checkoutModal");
//   const countEl = document.getElementById("checkoutItemsCount");
//   const priceEl = document.getElementById("checkoutTotalPrice");

//   const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
//   const totalPrice = calculateTotal();

//   if (countEl) countEl.textContent = totalItems;
//   if (priceEl) priceEl.textContent = formatPrice(totalPrice);

//   if (checkoutModal) {
//     checkoutModal.classList.add("open");
//     closeCart();
//   }
// }

// function closeCheckoutModal() {
//   const checkoutModal = document.getElementById("checkoutModal");
//   if (checkoutModal) {
//     checkoutModal.classList.remove("open");
//   }
// }

// function handleCheckoutSubmit(event) {
//   event.preventDefault();

//   const orderData = {
//     customer: {
//       name: document.getElementById("clientName")?.value || "",
//       phone: document.getElementById("clientPhone")?.value || "",
//       email: document.getElementById("clientEmail")?.value || "",
//     },
//     delivery: document.getElementById("deliveryMethod")?.value || "",
//     payment: document.getElementById("paymentMethod")?.value || "",
//     items: cart,
//     totalPrice: calculateTotal(),
//     date: new Date().toISOString()
//   };

//   console.log("Order submitted:", orderData);
//   alert(`Thank you for your order, ${orderData.customer.name}!\nOur manager will contact you at ${orderData.customer.phone} shortly.`);

//   clearCart();
//   closeCheckoutModal();

//   const form = document.getElementById("checkoutForm");
//   if (form) form.reset();
// }




// === Global State & Data ===
const bikes = [
  { id: 1, brand: "BMW", name: "M 1000 XR", price: 24500, engine: "999cc Inline-4", year: "2025", type: "Sport Touring", img: "images/BMW-M-1000XR.png" },
  { id: 2, brand: "Yamaha", name: "MT-07", price: 7500, engine: "689cc", year: "2022", type: "Naked", img: "images/Yamaha-MT-07.png" },
  { id: 3, brand: "Ducati", name: "Multistrada V4", price: 25390, engine: "1158cc", year: "2025", type: "Adventure / Touring", img: "images/Ducati-Multistrada.png" },
  { id: 4, brand: "Kawasaki", name: "Ninja 650", price: 8200, engine: "649cc", year: "2021", type: "Sport", img: "images/Kawasaki-Ninja-650.png" },
  { id: 5, brand: "Honda", name: "CBR 1100XX Super Blackbird", price: 11999, engine: "1137cc", year: "2007", type: "Sport", img: "images/Honda-Super Blackbird.png" },
  { id: 6, brand: "Aprilia", name: "Tuono V4", price: 19699, engine: "1099cc", year: "2025", type: "Sport / Naked", img: "images/Aprilia-Tuono-V4.png" },
  { id: 7, brand: "BMW", name: "R1200GS", price: 14500, engine: "1170cc", year: "2019", type: "Adventure", img: "images/BMW-R1200GS.png" },
  { id: 8, brand: "BMW", name: "R1250GS", price: 17900, engine: "1254cc", year: "2023", type: "Adventure", img: "images/BMW-R1250GS.png" },
  { id: 9, brand: "Kawasaki", name: "Ninja 650", price: 8200, engine: "649cc", year: "2024", type: "Sport", img: "images/Kawasaki-Ninja.png" }
];

let showAll = false;
let showOnlyFavs = false;
const FEATURED_COUNT = 6;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// === DOM elements ===
let bikeContainer, brandFilter, cartCount, cartBox, cartItems, cartBtn, showAllBtn, showFeaturedBtn, favoritesBtn, favCount;

// === Initialization ===
document.addEventListener("DOMContentLoaded", () => {
  bikeContainer = document.querySelector(".bikes");
  brandFilter = document.getElementById("brandFilter");
  cartCount = document.getElementById("cartCount");
  cartBox = document.getElementById("cart");
  cartItems = document.getElementById("cartItems");
  cartBtn = document.getElementById("cartBtn");
  showAllBtn = document.getElementById("showAllBtn");
  showFeaturedBtn = document.getElementById("showFeaturedBtn");
  favoritesBtn = document.getElementById("favoritesBtn");
  favCount = document.getElementById("favCount");

  initBurgerMenu();
  renderBikes();
  renderCart();
  updateFavCount();
  initSingleBikePage();
  initEventListeners();
  initContactForm();
});

// === Burger menu logic ===
function initBurgerMenu() {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu");

  if (!burger || !navMenu) return;

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    burger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !burger.contains(e.target)) {
      navMenu.classList.remove("open");
      burger.classList.remove("active");
    }
  });
}

// === Favorites Functionality ===
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavCount();
  renderBikes(brandFilter?.value || "all");
}

function updateFavCount() {
  if (favCount) {
    favCount.textContent = favorites.length;
  }
}

// === Event Listeners ===
function initEventListeners() {
  if (cartBtn) cartBtn.addEventListener("click", openCart);

  if (favoritesBtn) {
    favoritesBtn.addEventListener("click", () => {
      showOnlyFavs = !showOnlyFavs;
      favoritesBtn.classList.toggle("active-filter", showOnlyFavs);
      renderBikes(brandFilter?.value || "all");
    });
  }

  if (showAllBtn) {
    showAllBtn.addEventListener("click", () => {
      showAll = true;
      renderBikes(brandFilter?.value || "all");
    });
  }

  if (showFeaturedBtn) {
    showFeaturedBtn.addEventListener("click", () => {
      showAll = false;
      renderBikes(brandFilter?.value || "all");
    });
  }

  if (brandFilter) {
    brandFilter.addEventListener("change", (e) => {
      renderBikes(e.target.value);
    });
  }

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  }

  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (window.history.length > 1) {
        history.back();
      } else {
        window.location.href = "index.html#bikes";
      }
    });
  }
}

// === Contact Form Handler ===
function initContactForm() {
  const contactForm = document.querySelector("#contact form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const textarea = contactForm.querySelector("textarea");

    const formData = {
      name: nameInput ? nameInput.value : "",
      email: emailInput ? emailInput.value : "",
      message: textarea ? textarea.value : ""
    };

    alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
    contactForm.reset();
  });
}

// === Helpers ===
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function formatPrice(amount) {
  return "€" + amount.toLocaleString();
}

// === Motorcycle Catalog Rendering ===
function renderBikes(filter = "all") {
  if (!bikeContainer) return;

  let filtered = bikes.filter(b => filter === "all" || b.brand === filter);

  if (showOnlyFavs) {
    filtered = filtered.filter(b => favorites.includes(b.id));
  } else if (!showAll) {
    filtered = filtered.slice(0, FEATURED_COUNT);
  }

  if (filtered.length === 0) {
    bikeContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; opacity: 0.7;">No motorcycles found in Favorites.</p>`;
    updateToggleButtons();
    return;
  }

  bikeContainer.innerHTML = filtered.map(b => {
    const isFav = favorites.includes(b.id);
    return `
      <div class="bike">
        <div style="position: relative;">
          <a href="bike.html?id=${b.id}" class="bike-img-link">
            <img src="${b.img}" alt="${b.brand} ${b.name}">
          </a>
          <button onclick="toggleFavorite(${b.id})" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;" title="Toggle Favorite">
            ${isFav ? "❤️" : "🤍"}
          </button>
        </div>
        <h3>
          <a href="bike.html?id=${b.id}" class="bike-title-link">
            ${b.brand} ${b.name}
          </a>
        </h3>
        <span>${formatPrice(b.price)}</span>
        <div class="bike-actions" style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 8px;">
          <button class="btn" onclick="addToCart(${b.id})" style="flex: 1; min-width: 120px; font-size: 0.85rem; padding: 10px 6px;">
            🛒 Add to Cart
          </button>
          <button class="btn test-drive-btn" onclick="openTestDriveModal('${b.brand} ${b.name}')" style="flex: 1; min-width: 120px; font-size: 0.85rem; padding: 10px 6px; border-color: var(--color-accent);">
            🏍️ Test Drive
          </button>
          <a class="details-btn" href="bike.html?id=${b.id}" style="width: 100%; text-align: center; margin-top: 5px;">
            View details →
          </a>
        </div>
      </div>
    `;
  }).join("");

  updateToggleButtons();
}

// === Cart Functionality ===
function addToCart(id) {
  const bike = bikes.find(b => b.id === id);
  if (!bike) return;

  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ ...bike, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function updateQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    renderCart();
  }
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (cartCount) cartCount.textContent = totalItems;

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `<li style="justify-content: center; opacity: 0.6; padding: 20px 0;">Your cart is empty</li>`;
  } else {
    cartItems.innerHTML = cart.map(item => {
      const qty = item.quantity || 1;
      return `
        <li>
          <div style="display: flex; flex-direction: column;">
            <strong>${item.brand} ${item.name}</strong>
            <small style="color: var(--color-accent);">${formatPrice(item.price)} x ${qty}</small>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button onclick="updateQuantity(${item.id}, -1)" style="padding: 2px 6px;">-</button>
            <span>${qty}</span>
            <button onclick="updateQuantity(${item.id}, 1)" style="padding: 2px 6px;">+</button>
            <button onclick="removeFromCart(${item.id})" style="margin-left: 8px; color: var(--color-accent);">✕</button>
          </div>
        </li>
      `;
    }).join("");
  }

  const cartTotalEl = document.getElementById("cartTotal");
  if (cartTotalEl) {
    cartTotalEl.textContent = formatPrice(calculateTotal());
  }
}

// === Drawer Controls ===
function openCart() {
  if (cartBox) cartBox.classList.add("open");
}

function closeCart() {
  if (cartBox) cartBox.classList.remove("open");
}

// === Filter & Catalog Controls ===
function updateToggleButtons() {
  if (showOnlyFavs) {
    if (showAllBtn) showAllBtn.style.display = "none";
    if (showFeaturedBtn) showFeaturedBtn.style.display = "none";
    return;
  }

  if (!showAll) {
    if (showAllBtn) showAllBtn.style.display = "inline-block";
    if (showFeaturedBtn) showFeaturedBtn.style.display = "none";
  } else {
    if (showAllBtn) showAllBtn.style.display = "none";
    if (showFeaturedBtn) showFeaturedBtn.style.display = "inline-block";
  }
}

// === Single Bike Page Logic ===
function initSingleBikePage() {
  const params = new URLSearchParams(window.location.search);
  const bikeId = Number(params.get("id"));

  if (!bikeId) return;

  const bike = bikes.find(b => b.id === bikeId);
  if (bike) {
    const imgEl = document.getElementById("bikeImage");
    const nameEl = document.getElementById("bikeName");
    const brandEl = document.getElementById("bikeBrand");
    const priceEl = document.getElementById("bikePrice");
    const engineEl = document.getElementById("bikeEngine");
    const yearEl = document.getElementById("bikeYear");
    const typeEl = document.getElementById("bikeType");

    if (imgEl) imgEl.src = bike.img;
    if (nameEl) nameEl.textContent = bike.name;
    if (brandEl) brandEl.textContent = bike.brand;
    if (priceEl) priceEl.textContent = formatPrice(bike.price);
    if (engineEl) engineEl.textContent = bike.engine;
    if (yearEl) yearEl.textContent = bike.year;
    if (typeEl) typeEl.textContent = bike.type;
  }

  const addBtn = document.getElementById("addBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addToCart(bikeId);
      const originalText = addBtn.textContent;
      addBtn.textContent = "Added to Cart ✓";
      addBtn.classList.add("added");

      setTimeout(() => {
        addBtn.textContent = originalText;
        addBtn.classList.remove("added");
      }, 2000);
    });
  }
}

// === Test Drive Modal ===
function openTestDriveModal(modelName) {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
    const textarea = contactSection.querySelector("textarea");
    if (textarea) {
      textarea.value = `Hello, I would like to book a test drive for the ${modelName}.`;
      textarea.focus();
    }
  } else {
    alert(`Thank you for your interest in ${modelName}! Please use the contact form to book a test drive.`);
  }
}

// === Checkout Modal Functions ===
function openCheckoutModal() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const checkoutModal = document.getElementById("checkoutModal");
  const countEl = document.getElementById("checkoutItemsCount");
  const priceEl = document.getElementById("checkoutTotalPrice");

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = calculateTotal();

  if (countEl) countEl.textContent = totalItems;
  if (priceEl) priceEl.textContent = formatPrice(totalPrice);

  if (checkoutModal) {
    checkoutModal.classList.add("open");
    closeCart();
  }
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById("checkoutModal");
  if (checkoutModal) {
    checkoutModal.classList.remove("open");
  }
}

function handleCheckoutSubmit(event) {
  event.preventDefault();

  const orderData = {
    customer: {
      name: document.getElementById("clientName")?.value || "",
      phone: document.getElementById("clientPhone")?.value || "",
      email: document.getElementById("clientEmail")?.value || "",
    },
    delivery: document.getElementById("deliveryMethod")?.value || "",
    payment: document.getElementById("paymentMethod")?.value || "",
    items: cart,
    totalPrice: calculateTotal(),
    date: new Date().toISOString()
  };

  alert(`Thank you for your order, ${orderData.customer.name}!\nOur manager will contact you at ${orderData.customer.phone} shortly.`);

  clearCart();
  closeCheckoutModal();

  const form = document.getElementById("checkoutForm");
  if (form) form.reset();
}




