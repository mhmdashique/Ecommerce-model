// Shopping Cart System
let cart = [];
let cartTotal = 0;

// DOM Elements
const cartBtn = document.getElementById("cartBtn");
const shoppingCart = document.getElementById("shoppingCart");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");

// Cart Toggle
cartBtn.addEventListener("click", () => {
  shoppingCart.classList.add("active");
  overlay.classList.add("active");
});

closeCart.addEventListener("click", () => {
  shoppingCart.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  shoppingCart.classList.remove("active");
  overlay.classList.remove("active");
});

// Product Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    productCards.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        const category = card.getAttribute("data-category");
        if (category === filter) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      }
    });
  });
});

// Add to Cart
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("quick-add") ||
    e.target.parentElement.classList.contains("quick-add")
  ) {
    const btn = e.target.classList.contains("quick-add")
      ? e.target
      : e.target.parentElement;
    const id = btn.getAttribute("data-id");
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));

    addToCart(id, name, price);

    // Visual feedback
    btn.style.transform = "scale(0.9)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);

    showNotification(`${name} added to cart!`);
  }
});

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
                <button class="continue-shopping" onclick="closeCartAndContinue()">Continue Shopping</button>
            </div>
        `;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid var(--border-light);">
                <div>
                    <h4 style="font-size: 0.9rem; margin-bottom: 0.25rem; color: var(--text-dark);">${item.name}</h4>
                    <div style="color: var(--text-light); font-size: 0.8rem;">$${item.price} × ${item.quantity}</div>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="background: var(--accent-color); color: white; border: none; padding: 0.5rem; border-radius: 3px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
      )
      .join("");
  }
}

function closeCartAndContinue() {
  shoppingCart.classList.remove("active");
  overlay.classList.remove("active");
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-name")
      .textContent.toLowerCase();
    if (productName.includes(searchTerm) || searchTerm === "") {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Notification system
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: var(--shadow-medium);
        z-index: 1003;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Smooth scrolling for navigation
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Update active nav item
      document
        .querySelectorAll(".nav-link")
        .forEach((item) => item.classList.remove("active"));
      link.classList.add("active");

      // Smooth scroll
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navigation scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".clean-nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(255, 255, 255, 0.98)";
    nav.style.boxShadow = "var(--shadow-light)";
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.95)";
    nav.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".product-card, .stat-item, .feature"
  );
  animateElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.8s ease";
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
  });
});

// Form submission
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  showNotification("Message sent successfully!");
  e.target.reset();
});

// Newsletter subscription
document.querySelector(".newsletter button").addEventListener("click", (e) => {
  e.preventDefault();
  const emailInput = document.querySelector(".newsletter input");
  const email = emailInput.value.trim();

  if (email && email.includes("@")) {
    showNotification("Successfully subscribed to newsletter!");
    emailInput.value = "";
  } else {
    showNotification("Please enter a valid email address");
  }
});

// Continue shopping button
document
  .querySelector(".continue-shopping")
  ?.addEventListener("click", closeCartAndContinue);

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Custom Cursor
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);
});

// Tilt Effect for Gallery Items
document.querySelectorAll("[data-tilt]").forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    element.querySelector(
      ".item-content"
    ).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  element.addEventListener("mouseleave", () => {
    element.querySelector(".item-content").style.transform =
      "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

// Parallax Effect
window.addEventListener("scroll", () => {
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  const scrolled = window.pageYOffset;

  parallaxElements.forEach((element) => {
    const rate = scrolled * -0.5;
    element.style.transform = `translateY(${rate}px)`;
  });
});

// Interactive Hover Effects
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2)";
    cursorFollower.style.transform = "scale(1.5)";
  });

  item.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursorFollower.style.transform = "scale(1)";
  });
});

window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Testimonials Carousel
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

document.getElementById("nextBtn").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto-play carousel
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Live Chat Widget
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");
const chatMessages = document.querySelector(".chat-messages");

chatToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("active");
});

chatClose.addEventListener("click", () => {
  chatWindow.classList.remove("active");
});

function addMessage(text, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;
  messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? "U" : "🤖"}</div>
        <div class="message-text">${text}</div>
    `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMessage.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    addMessage(message, true);
    chatInput.value = "";

    // Simulate bot response
    setTimeout(() => {
      addMessage(
        "Thanks for your message! Our team will get back to you shortly."
      );
    }, 1000);
  }
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage.click();
  }
});

// Hamburger Menu Toggle
const hamburgerMenu = document.getElementById("hamburgerMenu");
const mobileNavMenu = document.querySelector(".mobile-nav-menu");

hamburgerMenu.addEventListener("click", () => {
  mobileNavMenu.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNavMenu.classList.remove("active");
    hamburgerMenu.classList.remove("active");
  });
});

// Size Guide Modal
function openSizeGuide() {
  document.getElementById("sizeGuideModal").classList.add("active");
}

document.getElementById("closeSizeGuide").addEventListener("click", () => {
  document.getElementById("sizeGuideModal").classList.remove("active");
});

document.getElementById("sizeGuideModal").addEventListener("click", (e) => {
  if (e.target.id === "sizeGuideModal") {
    document.getElementById("sizeGuideModal").classList.remove("active");
  }
});
