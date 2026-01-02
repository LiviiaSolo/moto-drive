// Burger menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu");

  if (!burger || !navMenu) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });
});


// Closing the menu when clicking outside it
document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("open") &&
    !navMenu.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    navMenu.classList.remove("open");
    burger.classList.remove("active");
  }
});


// Data
const bikes = [
  {
    id: 1,
    brand: "BMW",
    name: "M 1000 XR",
    price: 24500,
    engine: "999cc Inline-4",
    year: "2025",
    type: "Sport Touring",
    power: "201 hp",
    img: "images/BMW-M-1000XR.png"
  },
  {
    id: 2,
    brand: "Yamaha",
    name: "MT-07",
    price: 7500,
    engine: "689cc",
    year: "2022",
    type: "Naked",
    img: "images/Yamaha-MT-07.png"
  },
  {
    id: 3,
    brand: "Ducati",
    name: "Multistrada V4",
    price: 25390,
    engine: "1158cc",
    year: "2025",
    type: "Adventure / Touring",
    img: "images/Ducati-Multistrada.png"
  },
  {
    id: 4,
    brand: "Kawasaki",
    name: "Ninja 650",
    price: 8200,
    engine: "649cc",
    year: "2021",
    type: "Sport",
    img: "images/Kawasaki-Ninja-650.png"
  },
  {
    id: 5,
    brand: "Honda",
    name: "CBR 1100XX Super Blackbird",
    price: 11999,
    engine: "1137cc",
    year: "2007",
    type: "Sport",
    img: "images/Honda-Super Blackbird.png"
  },
  {
    id: 6,
    brand: "Aprilia",
    name: "Tuono V4",
    price: 19699,
    engine: "1099cc",
    year: "2025",
    type: "Sport / Naked",
    img: "images/Aprilia-Tuono-V4.png"
  },
  {
    id: 7,
    brand: "BMW",
    name: "R1200GS",
    price: 14500,
    engine: "1170cc",
    year: "2019",
    type: "Adventure",
    img: "images/BMW-R1200GS.png"
  },
  {
    id: 8,
    brand: "BMW",
    name: "R1250GS",
    price: 17900,
    engine: "1254cc",
    year: "2023",
    type: "Adventure",
    img: "images/BMW-R1250GS.png"
  },
  {
    id: 9,
    brand: "Kawasaki",
    name: "Ninja 650",
    price: 8200,
    engine: "649cc",
    year: "2024",
    type: "Sport",
    img: "images/Kawasaki-Ninja.png"
  }
];

// State
let showAll = false;
const FEATURED_COUNT = 6;

// cart with localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const bikeContainer = document.querySelector(".bikes");
const brandFilter = document.getElementById("brandFilter");
const cartCount = document.getElementById("cartCount");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartBtn = document.getElementById("cartBtn");

const showAllBtn = document.getElementById("showAllBtn");
const showFeaturedBtn = document.getElementById("showFeaturedBtn");

// Helpers
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Bikes
function renderBikes(filter = "all") {
  if (!bikeContainer) return;

  bikeContainer.innerHTML = "";

  let filtered = bikes.filter(
    b => filter === "all" || b.brand === filter
  );

  if (!showAll) {
    filtered = filtered.slice(0, FEATURED_COUNT);
  }

  filtered.forEach(b => {
    bikeContainer.innerHTML += `
      <div class="bike">
        <img src="${b.img}" alt="${b.brand} ${b.name}">
        <h3>${b.brand} ${b.name}</h3>
        <span>€${b.price}</span>

        <a class="details-btn" href="bike.html?id=${b.id}">
          View details
        </a>

        <button class="btn" onclick="addToCart(${b.id})">
          Add to cart
        </button>
      </div>
    `;
  });

  updateToggleButtons();
}

// Cart
function addToCart(id) {
  const bike = bikes.find(b => b.id === id);
  if (!bike) return;

  cart.push(bike);
  saveCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <li>
        ${item.brand} ${item.name}
        <button onclick="removeFromCart(${index})">✕</button>
      </li>
    `;
  });

  if (cartCount) cartCount.textContent = cart.length;
}

// Cart UI
cartBtn && cartBtn.addEventListener("click", () => {
  cartBox.classList.add("open");
});

function closeCart() {
  cartBox && cartBox.classList.remove("open");
}

// Featured / all
function updateToggleButtons() {
  if (!showAll) {
    showAllBtn && (showAllBtn.style.display = "inline-block");
    showFeaturedBtn && (showFeaturedBtn.style.display = "none");
  } else {
    showAllBtn && (showAllBtn.style.display = "none");
    showFeaturedBtn && (showFeaturedBtn.style.display = "inline-block");
  }
}

showAllBtn && showAllBtn.addEventListener("click", () => {
  showAll = true;
  renderBikes(brandFilter?.value || "all");
});

showFeaturedBtn && showFeaturedBtn.addEventListener("click", () => {
  showAll = false;
  renderBikes("all");
});

// Filter
brandFilter && brandFilter.addEventListener("change", e => {
  renderBikes(e.target.value);
});

// Bike page
const params = new URLSearchParams(window.location.search);
const bikeId = Number(params.get("id"));

if (bikeId) {
  const bike = bikes.find(b => b.id === bikeId);

  if (bike) {
    document.getElementById("bikeImage")?.setAttribute("src", bike.img);
    document.getElementById("bikeName").textContent = bike.name;
    document.getElementById("bikeBrand").textContent = bike.brand;
    document.getElementById("bikePrice").textContent = "€" + bike.price;
    document.getElementById("bikeEngine").textContent = bike.engine;
    document.getElementById("bikeYear").textContent = bike.year;
    document.getElementById("bikeType").textContent = bike.type;
  }

  const addBtn = document.getElementById("addBtn");

  addBtn && addBtn.addEventListener("click", () => {
  addToCart(bikeId);

  // update counter
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  addBtn.textContent = "Added ✓";
  addBtn.disabled = true;
});

}

// Init 
renderBikes();
renderCart();


// Back button functionality
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


