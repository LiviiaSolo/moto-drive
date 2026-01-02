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
    name: "Multistrada V4 (2025)",
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
    img: "images/kawasaki-ninja-650.png"
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
let cart = [];

// Elemnts
const bikeContainer = document.querySelector(".bikes");
const brandFilter = document.getElementById("brandFilter");
const cartCount = document.getElementById("cartCount");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartBtn = document.getElementById("cartBtn");

const showAllBtn = document.getElementById("showAllBtn");
const showFeaturedBtn = document.getElementById("showFeaturedBtn");

// Bikes rendering
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
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.textContent = `${item.brand} ${item.name}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.onclick = () => removeFromCart(index);

    li.appendChild(name);
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  if (cartCount) cartCount.textContent = cart.length;
}

// Cart UI
if (cartBtn && cartBox) {
  cartBtn.onclick = () => cartBox.classList.add("open");
}

function closeCart() {
  if (cartBox) cartBox.classList.remove("open");
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

showAllBtn && (showAllBtn.onclick = () => {
  showAll = true;
  renderBikes(brandFilter?.value || "all");
});

showFeaturedBtn && (showFeaturedBtn.onclick = () => {
  showAll = false;
  renderBikes("all");
});

// Filter
brandFilter && (brandFilter.onchange = e => {
  renderBikes(e.target.value);
});

// Bike Page
const params = new URLSearchParams(window.location.search);
const bikeId = parseInt(params.get("id"));

if (bikeId) {
  const bike = bikes.find(b => b.id === bikeId);

  if (bike) {
  const img = document.getElementById("bikeImage");
  const name = document.getElementById("bikeName");
  const price = document.getElementById("bikePrice");
  const engine = document.getElementById("bikeEngine");

  if (img) img.src = bike.img;
  if (name) name.textContent = bike.brand + " " + bike.name;
  if (price) price.textContent = "€" + bike.price;
  if (engine) engine.textContent = bike.engine;
}
}

// Init 
renderBikes();



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


