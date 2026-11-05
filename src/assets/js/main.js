/**
 * Irasema Ezcurdia Portfolio - Main JavaScript
 *
 * Navigation, lightbox, video facades, and scroll effects.
 * Layout reads are batched and scroll handlers are throttled with
 * requestAnimationFrame to avoid forced reflows.
 */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initLightbox();
    initVideoFacades();
    initReveal();
    initNavigation();

    // Signals the inline head script that reveal handling is active. Without
    // it, that script removes the `js` class and shows all content.
    window.siteInitialized = true;
  });

  /**
   * Toggle the mobile navigation menu.
   */
  function initMobileMenu() {
    const button = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");

    if (!button || !menu) return;

    function setExpanded(expanded) {
      menu.classList.toggle("hidden", !expanded);
      button.setAttribute("aria-expanded", String(expanded));
      button.setAttribute(
        "aria-label",
        expanded ? "Cerrar menú de navegación" : "Abrir menú de navegación"
      );
    }

    button.addEventListener("click", function () {
      setExpanded(menu.classList.contains("hidden"));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setExpanded(false);
      });
    });
  }

  /**
   * Open gallery images in a modal lightbox.
   * Triggers use `data-lightbox="<url>"` and are real buttons, so the
   * interaction works with keyboard and assistive technology.
   */
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightbox-img");
    const closeButton = lightbox?.querySelector(".lightbox-close");

    if (!lightbox || !image || !closeButton) return;

    let lastFocusedElement = null;

    function open(src, alt) {
      lastFocusedElement = document.activeElement;
      image.src = src;
      image.alt = alt || "Obra ampliada";
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    }

    function close() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
      lastFocusedElement = null;
    }

    document.addEventListener("click", function (event) {
      const target = event.target instanceof Element ? event.target : null;
      const trigger = target?.closest("[data-lightbox]");

      if (trigger) {
        event.preventDefault();
        const triggerImage = trigger.querySelector("img");
        open(
          trigger.getAttribute("data-lightbox"),
          trigger.getAttribute("data-lightbox-alt") || triggerImage?.alt
        );
        return;
      }

      if (event.target === lightbox) close();
    });

    closeButton.addEventListener("click", close);

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("active")) return;

      if (event.key === "Escape") {
        close();
      } else if (event.key === "Tab") {
        // The close button is the only focusable control in the dialog.
        event.preventDefault();
        closeButton.focus();
      }
    });
  }

  /**
   * Replace a video poster facade with the real <video> on first click.
   * This keeps nine poster images and players out of the initial load.
   */
  function initVideoFacades() {
    document.querySelectorAll("[data-video]").forEach(function (facade) {
      facade.addEventListener(
        "click",
        function () {
          const video = document.createElement("video");

          video.className = "w-full h-auto object-cover";
          video.controls = true;
          video.autoplay = true;
          video.playsInline = true;
          video.setAttribute("playsinline", "");
          video.preload = "metadata";
          video.setAttribute(
            "aria-label",
            facade.getAttribute("data-video-label") || "Video"
          );
          video.style.aspectRatio = facade.style.aspectRatio;

          const poster = facade.getAttribute("data-poster");
          if (poster) video.poster = poster;

          video.src = facade.getAttribute("data-video");

          facade.replaceWith(video);

          const playback = video.play();
          if (playback && typeof playback.catch === "function") {
            playback.catch(function () {
              /* Autoplay may be blocked; the controls remain available. */
            });
          }
        },
        { once: true }
      );
    });
  }

  /**
   * Reveal sections as they enter the viewport.
   * IntersectionObserver avoids layout reads on every scroll event.
   */
  function initReveal() {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("active");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  /**
   * Navbar shadow on scroll and active section link.
   * The shadow uses one passive, rAF-throttled scroll handler. The current
   * section is tracked with IntersectionObserver so the page never reads
   * layout (offsetTop / getBoundingClientRect) from JavaScript.
   */
  function initNavigation() {
    const navbar = document.getElementById("navbar");
    const links = Array.from(document.querySelectorAll(".nav-link"));
    const sections = Array.from(document.querySelectorAll("section[id]"));

    if (!navbar) return;

    function setActiveSection(id) {
      links.forEach(function (link) {
        const target = (link.getAttribute("href") || "").split("#")[1];
        const isActive = target === id;

        link.classList.toggle("text-rose-gold", isActive);
        link.classList.toggle("font-semibold", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    if (sections.length && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        // A band across the middle of the viewport: whichever section crosses
        // it becomes the current one.
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(function () {
        ticking = false;
        navbar.classList.toggle("shadow-md", window.scrollY > 100);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
