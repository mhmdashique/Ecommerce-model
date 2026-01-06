// Cart functionality (shared with main site)
let cart = [];
let cartTotal = 0;

// DOM Elements
const cartToggle = document.getElementById("cartToggle");
const floatingCart = document.getElementById("floatingCart");
const cartClose = document.getElementById("cartClose");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");
const overlay = document.getElementById("overlay");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");

// Catalog specific elements
const productsGrid = document.getElementById("productsGrid");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortBy = document.getElementById("sortBy");

// Catalog state
let currentPage = 1;
const itemsPerPage = 12;
let filteredProducts = [];
let allProducts = [];

// Sample products data (expanded)
allProducts = [
  {
    id: 1,
    name: "Classic White Shirt",
    category: "shirts",
    price: 89,
    rating: 5,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop",
    badge: "new",
  },
  {
    id: 2,
    name: "Premium Jeans",
    category: "jeans",
    price: 120,
    rating: 4,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=300&h=400&fit=crop",
    badge: "sale",
  },
  {
    id: 3,
    name: "Leather Jacket",
    category: "jackets",
    price: 199,
    rating: 5,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Premium Hoodie",
    category: "hoodies",
    price: 85,
    rating: 4,
    reviews: 23,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
    badge: "new",
  },
  {
    id: 5,
    name: "Casual Blue Shirt",
    category: "shirts",
    price: 65,
    rating: 4,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Slim Fit Jeans",
    category: "jeans",
    price: 110,
    rating: 5,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Summer Dress",
    category: "dresses",
    price: 95,
    rating: 4,
    reviews: 29,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
    badge: "new",
  },
  {
    id: 8,
    name: "Elegant Dress",
    category: "dresses",
    price: 125,
    rating: 5,
    reviews: 38,
    image:
      "https://images.unsplash.com/photo-1566479179817-c0b2b2b5b5b5?w=300&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Running Shoes",
    category: "shoes",
    price: 150,
    rating: 4,
    reviews: 55,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop",
  },
  {
    id: 10,
    name: "Leather Boots",
    category: "shoes",
    price: 180,
    rating: 5,
    reviews: 41,
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop",
  },
  {
    id: 11,
    name: "Designer Sunglasses",
    category: "accessories",
    price: 75,
    rating: 4,
    reviews: 33,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=400&fit=crop",
  },
  {
    id: 12,
    name: "Leather Belt",
    category: "accessories",
    price: 45,
    rating: 4,
    reviews: 27,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop",
  },
  {
    id: 13,
    name: "Cotton T-Shirt",
    category: "shirts",
    price: 35,
    rating: 4,
    reviews: 19,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
  },
  {
    id: 14,
    name: "Denim Jacket",
    category: "jackets",
    price: 140,
    rating: 4,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&h=400&fit=crop",
  },
  {
    id: 15,
    name: "Sweater",
    category: "hoodies",
    price: 70,
    rating: 4,
    reviews: 36,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop",
  },
  {
    id: 16,
    name: "Maxi Dress",
    category: "dresses",
    price: 110,
    rating: 5,
    reviews: 44,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop",
  },
  {
    id: 17,
    name: "Sneakers",
    category: "shoes",
    price: 95,
    rating: 4,
    reviews: 28,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
  },
  {
    id: 18,
    name: "Watch",
    category: "accessories",
    price: 200,
    rating: 5,
    reviews: 61,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=400&fit=crop",
  },
  {
    id: 19,
    name: "Polo Shirt",
    category: "shirts",
    price: 55,
    rating: 4,
    reviews: 22,
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop",
  },
  {
    id: 20,
    name: "Cargo Pants",
    category: "jeans",
    price: 90,
    rating: 4,
    reviews: 35,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop",
  },
];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupEventListeners();
  updateCartUI();
});

// Setup event listeners
function setupEventListeners() {
  // Cart events
  cartToggle.addEventListener("click", () => {
    floatingCart.classList.add("active");
    overlay.classList.add("active");
  });

  cartClose.addEventListener("click", () => {
    floatingCart.classList.remove("active");
    overlay.classList.remove("active");
  });

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
  });

  menuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    floatingCart.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Catalog events
  searchInput.addEventListener("input", handleFilters);
  categoryFilter.addEventListener("change", handleFilters);
  priceFilter.addEventListener("change", handleFilters);
  sortBy.addEventListener("change", handleFilters);

  // Add to cart
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("catalog-quick-add") ||
      e.target.parentElement.classList.contains("catalog-quick-add")
    ) {
      const btn = e.target.classList.contains("catalog-quick-add")
        ? e.target
        : e.target.parentElement;
      const id = parseInt(btn.getAttribute("data-id"));
      const product = allProducts.find((p) => p.id === id);
      if (product) {
        addToCart(id, product.name, product.price);
        showNotification(`${product.name} added to cart!`);
      }
    }
  });
}

// Handle filters and sorting
function handleFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const priceRange = priceFilter.value;
  const sort = sortBy.value;

  filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "all" || product.category === category;
    let matchesPrice = true;

    if (priceRange !== "all") {
      const [min, max] = priceRange
        .split("-")
        .map((p) => parseInt(p) || Infinity);
      matchesPrice =
        product.price >= min && (max ? product.price <= max : true);
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sort) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id; // Assuming higher ID is newer
      default:
        return 0;
    }
  });

  currentPage = 1;
  renderProducts();
  renderPagination();
}

// Load initial products
function loadProducts() {
  filteredProducts = [...allProducts];
  renderProducts();
  renderPagination();
}

// Render products
function renderProducts() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const productsToShow = filteredProducts.slice(start, end);

  productsGrid.innerHTML = productsToShow
    .map(
      (product) => `
        <div class="catalog-product-card">
            <div class="catalog-product-image">
                <img src="${product.image}" alt="${product.name}">
                ${
                  product.badge
                    ? `<span class="catalog-product-badge ${product.badge}">${product.badge}</span>`
                    : ""
                }
                <div class="catalog-product-overlay">
                    <button class="catalog-quick-add" data-id="${product.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="catalog-product-info">
                <h3>${product.name}</h3>
                <div class="catalog-product-rating">
                    <div class="catalog-stars">${"★".repeat(
                      product.rating
                    )}${"☆".repeat(5 - product.rating)}</div>
                    <span>(${product.reviews})</span>
                </div>
                <div class="catalog-product-price">$${product.price}</div>
            </div>
        </div>
    `
    )
    .join("");
}

// Render pagination
function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  pagination.innerHTML = "";

  if (totalPages <= 1) return;

  // Previous button
  if (currentPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.className = "page-btn";
    prevBtn.textContent = "←";
    prevBtn.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevBtn);
  }

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `page-btn ${i === currentPage ? "active" : ""}`;
    pageBtn.textContent = i;
    pageBtn.onclick = () => changePage(i);
    pagination.appendChild(pageBtn);
  }

  // Next button
  if (currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.className = "page-btn";
    nextBtn.textContent = "→";
    nextBtn.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextBtn);
  }
}

// Change page
function changePage(page) {
  currentPage = page;
  renderProducts();
  renderPagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Cart functions
function addToCart(id, name, price) {
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1,
    });
  }

  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart total
  cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = cartTotal.toFixed(2);

  // Update cart items display
  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>
        `;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item" style="display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid #e2e8f0;">
                <div style="flex: 1;">
                    <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem;">${item.name}</h4>
                    <div style="color: var(--primary); font-weight: 600;">$${item.price} x ${item.quantity}</div>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: var(--gray); cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
      )
      .join("");
  }
}

// Notification system
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 1003;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Navigation scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".floating-nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(255, 255, 255, 0.95)";
    nav.style.backdropFilter = "blur(20px)";
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.1)";
    nav.style.backdropFilter = "blur(20px)";
  }
});
