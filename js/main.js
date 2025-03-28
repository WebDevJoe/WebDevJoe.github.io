// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
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
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = scrolled * 0.5 + "px";
});

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
