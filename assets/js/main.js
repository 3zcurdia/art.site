/**
 * Irasema Ezcurdia Portfolio - Main JavaScript
 * Smooth scrolling, lightbox, and scroll animations
 */

document.addEventListener("DOMContentLoaded", function () {
  // ===== Mobile Menu Toggle =====
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      const isHidden = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");

      // Update aria-expanded for accessibility
      mobileMenuBtn.setAttribute("aria-expanded", !isHidden);
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = document.getElementById("navbar")?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== Navbar Background on Scroll =====
  const navbar = document.getElementById("navbar");

  function updateNavbar() {
    if (window.scrollY > 100) {
      navbar?.classList.add("shadow-md");
    } else {
      navbar?.classList.remove("shadow-md");
    }
  }

  window.addEventListener("scroll", updateNavbar);
  updateNavbar();

  // ===== Scroll Reveal Animation =====
  const revealElements = document.querySelectorAll(".reveal");

  function reveal() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal(); // Check on load

  // ===== Active Navigation Highlight =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNav() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("text-rose-gold", "font-semibold");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("text-rose-gold", "font-semibold");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav);
  highlightNav();

  // ===== Form Submission Handler =====
  const contactForm = document.querySelector("form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name")?.value;
      const email = document.getElementById("email")?.value;
      const subject = document.getElementById("subject")?.value;
      const message = document.getElementById("message")?.value;

      // Basic validation
      if (!name || !email || !message) {
        alert("Por favor completa todos los campos requeridos.");
        return;
      }

      // Show success message (in production, send to server)
      alert("¡Gracias por tu mensaje! Te contactaré pronto.");
      contactForm.reset();
    });
  }
});

// ===== Lightbox Functions =====
function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    lightboxImg.src = imageSrc;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");

  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close lightbox on escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

// Close lightbox on background click
document.getElementById("lightbox")?.addEventListener("click", function (e) {
  if (e.target === this) {
    closeLightbox();
  }
});
