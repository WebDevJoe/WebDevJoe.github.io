// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Get the target section
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      if (hamburger.classList.contains("open")) {
        hamburger.classList.remove("open");
        navLinks.classList.remove("active");
        body.classList.remove("menu-open");
      }
    }
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all game cards and content cards
document.querySelectorAll(".game-card, .content-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  observer.observe(el);
});

// Add animation class
const style = document.createElement("style");
style.textContent = `
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
    
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

// Hero parallax effect
const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  // Only apply parallax effect when not actively scrolling between sections
  if (!isScrolling) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    // Limit the background position to avoid extreme movement
    if (rate < 100) {
      hero.style.backgroundPositionY = `calc(70% + ${rate}px)`;
    }
  }
});

// Function to check which section is currently in view
function checkSectionInView() {
  const sections = document.querySelectorAll(
    ".hero, .featured-games-section, .news-section, .stats-section, .why-succeed-section, .careers-section"
  );

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top <= 100 && rect.bottom >= 300;

    if (inView) {
      section.classList.add("in-view");

      // Add a subtle entrance animation
      if (!section.classList.contains("animated")) {
        section.classList.add("animated");
        section.style.animation = "sectionFadeIn 0.5s ease forwards";
      }
    } else {
      section.classList.remove("in-view");
    }
  });
}

// Check which section is in view on scroll
window.addEventListener("scroll", checkSectionInView);
// Run once on page load
window.addEventListener("load", checkSectionInView);

// Add section animation style
const sectionStyle = document.createElement("style");
sectionStyle.textContent = `
  @keyframes sectionFadeIn {
    from {
      opacity: 0.8;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(sectionStyle);

// Button hover effects
document.querySelectorAll(".cta-button, .learn-more").forEach((button) => {
  button.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)";
    this.style.transition = "transform 0.3s ease";
  });

  button.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
  });
});

// Add loading animation for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.animation = "fadeIn 0.5s ease";
  });
});

// Track scrolling state
let isScrolling = false;
let scrollTimeout;

// Function to handle scroll events
function handleScroll() {
  isScrolling = true;
  clearTimeout(scrollTimeout);

  // Reset the timeout
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 100);
}

// Add scroll event listener
window.addEventListener("scroll", handleScroll);

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("active");
  body.classList.toggle("menu-open");
});

// Close menu when clicking on a nav link
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove("open");
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
  }
});

// Header scroll effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Adjust padding for small screens
function adjustMobilePadding() {
  if (window.innerWidth <= 480) {
    document
      .querySelectorAll(
        ".feature-item, .news-item .news-content, .featured-news .news-content"
      )
      .forEach((el) => {
        el.style.padding = "1rem";
      });

    document
      .querySelectorAll(
        ".news-header h2, .featured-games-section h2, .why-succeed-section h2"
      )
      .forEach((el) => {
        el.style.fontSize = "2.5rem";
      });
  }
}

// Execute on load and resize
window.addEventListener("load", adjustMobilePadding);
window.addEventListener("resize", adjustMobilePadding);

// Fix diamond position on different screen sizes
function adjustDiamondPosition() {
  const hero = document.querySelector(".hero h1");
  const windowWidth = window.innerWidth;

  if (windowWidth <= 360) {
    hero.style.setProperty("--diamond-top", "3.8%");
    hero.style.setProperty("--diamond-left", "10%");
    hero.style.setProperty("--diamond-size", "0.15em");
  } else if (windowWidth <= 480) {
    hero.style.setProperty("--diamond-top", "4%");
    hero.style.setProperty("--diamond-left", "12%");
    hero.style.setProperty("--diamond-size", "0.18em");
  } else if (windowWidth <= 767) {
    hero.style.setProperty("--diamond-top", "4.25%");
    hero.style.setProperty("--diamond-left", "14.5%");
    hero.style.setProperty("--diamond-size", "0.2em");
  } else if (windowWidth <= 991) {
    hero.style.setProperty("--diamond-top", "4.45%");
    hero.style.setProperty("--diamond-left", "16.5%");
    hero.style.setProperty("--diamond-size", "0.25em");
  } else {
    hero.style.setProperty("--diamond-top", "4.65%");
    hero.style.setProperty("--diamond-left", "17.7%");
    hero.style.setProperty("--diamond-size", "0.25em");
  }
}

// Run on load and resize
window.addEventListener("load", adjustDiamondPosition);
window.addEventListener("resize", adjustDiamondPosition);

// Prevent content shifting when switching to mobile menu
function preventContentShift() {
  const hamburger = document.querySelector(".hamburger");
  const body = document.body;

  hamburger.addEventListener("click", () => {
    if (hamburger.classList.contains("open")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      body.style.overflow = "";
    });
  });
}

preventContentShift();

// Add mouse parallax effect to careers card
function initCareersParallax() {
  const careersCard = document.querySelector(".careers-card-inner");
  if (!careersCard) return;

  let rafId = null;
  let isMouseOver = false;

  careersCard.addEventListener("mousemove", function (e) {
    if (window.innerWidth <= 768) return;
    isMouseOver = true;

    const cardRect = this.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const offsetX = ((mouseX - cardCenterX) / cardRect.width) * 10;
    const offsetY = ((mouseY - cardCenterY) / cardRect.height) * 10;

    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      this.style.backgroundPosition = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;
      this.style.transition = "0.1s background-position ease-out";
    });
  });

  careersCard.addEventListener("mouseleave", function () {
    isMouseOver = false;
    this.style.backgroundPosition = "center";
    this.style.transition = "0.5s background-position ease-out";
  });

  // Disable animation when using mouse parallax
  careersCard.addEventListener("mouseenter", function () {
    if (window.innerWidth <= 768) return;
    this.style.animation = "none";
  });

  // Re-enable animation when mouse leaves
  careersCard.addEventListener("mouseleave", function () {
    this.style.animation = "parallax-careers 25s ease infinite alternate";
  });
}

// Run on page load
window.addEventListener("load", initCareersParallax);

// Add scroll progress indicator
function addScrollIndicator() {
  // Create container for scroll indicators
  const indicatorContainer = document.createElement("div");
  indicatorContainer.className = "scroll-indicators";

  // Get all sections
  const sections = document.querySelectorAll(
    ".hero, .featured-games-section, .news-section, .stats-section, .why-succeed-section, .careers-section"
  );

  // Create indicator for each section
  sections.forEach((section, index) => {
    const dot = document.createElement("div");
    dot.className = "scroll-dot";
    dot.dataset.index = index;

    // Make the dot clickable to navigate to the section
    dot.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth" });
    });

    indicatorContainer.appendChild(dot);
  });

  // Add to the document
  document.body.appendChild(indicatorContainer);

  // Update active dot on scroll
  function updateScrollIndicator() {
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const dot = document.querySelector(`.scroll-dot[data-index="${index}"]`);

      if (rect.top <= 100 && rect.bottom >= 300) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Update indicators on scroll and load
  window.addEventListener("scroll", updateScrollIndicator);
  window.addEventListener("load", updateScrollIndicator);
}

// Add indicator styles
const indicatorStyle = document.createElement("style");
indicatorStyle.textContent = `
  .scroll-indicators {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 999;
  }
  
  .scroll-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .scroll-dot:hover {
    background-color: rgba(77, 238, 234, 0.5);
    transform: scale(1.2);
  }
  
  .scroll-dot.active {
    background-color: #4deeea;
    box-shadow: 0 0 10px rgba(77, 238, 234, 0.5);
    transform: scale(1.3);
  }
  
  @media (max-width: 768px) {
    .scroll-indicators {
      right: 10px;
    }
    
    .scroll-dot {
      width: 8px;
      height: 8px;
    }
  }
`;
document.head.appendChild(indicatorStyle);

// Initialize scroll indicator
window.addEventListener("load", addScrollIndicator);

// Handle keyboard navigation
document.addEventListener("keydown", (e) => {
  const sections = document.querySelectorAll(
    ".hero, .featured-games-section, .news-section, .stats-section, .why-succeed-section, .careers-section"
  );
  let currentSectionIndex = -1;

  // Find which section is currently in view
  sections.forEach((section, index) => {
    if (section.classList.contains("in-view")) {
      currentSectionIndex = index;
    }
  });

  // Navigate based on arrow keys
  if (e.key === "ArrowDown" && currentSectionIndex < sections.length - 1) {
    sections[currentSectionIndex + 1].scrollIntoView({ behavior: "smooth" });
  } else if (e.key === "ArrowUp" && currentSectionIndex > 0) {
    sections[currentSectionIndex - 1].scrollIntoView({ behavior: "smooth" });
  }
});

// Add micro-interactions for read more buttons and feature links
function addButtonMicroInteractions() {
  // Target all read more links and feature links
  const interactiveLinks = document.querySelectorAll(
    ".read-more, .feature-link"
  );

  interactiveLinks.forEach((link) => {
    // Create the ripple effect container
    const rippleContainer = document.createElement("span");
    rippleContainer.className = "ripple-container";
    link.appendChild(rippleContainer);

    // Add hover animation
    link.addEventListener("mouseenter", () => {
      // Animate the arrow
      const arrow =
        link.querySelector("span") ||
        link.childNodes[link.childNodes.length - 1];

      // Remove any existing animations
      link.classList.remove("pulse-out");

      // Add the pulse-in animation
      link.classList.add("pulse-in");

      // Add a slight translation to the link
      link.style.transform = "translateX(3px)";
    });

    link.addEventListener("mouseleave", () => {
      // Remove the pulse-in animation
      link.classList.remove("pulse-in");

      // Add the pulse-out animation
      link.classList.add("pulse-out");

      // Reset the translation
      link.style.transform = "translateX(0)";
    });

    // Add click animation with ripple effect
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Create ripple element
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      rippleContainer.appendChild(ripple);

      // Position the ripple where the user clicked
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Remove the ripple after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Simulate page navigation after a short delay
      setTimeout(() => {
        // You would normally navigate to the target page here
        console.log("Navigating to:", link.getAttribute("href"));
      }, 300);
    });
  });
}

// Add styles for the micro-interactions
const microInteractionsStyle = document.createElement("style");
microInteractionsStyle.textContent = `
  .read-more, .feature-link {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .ripple-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(77, 238, 234, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .read-more::after, .feature-link span {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .pulse-in .read-more::after,
  .pulse-in span {
    animation: pulse-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .pulse-out .read-more::after,
  .pulse-out span {
    animation: pulse-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  @keyframes pulse-right {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(3px);
    }
  }
  
  @keyframes pulse-left {
    0% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(microInteractionsStyle);

// Initialize micro-interactions
window.addEventListener("load", addButtonMicroInteractions);
