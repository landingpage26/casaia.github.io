/* ============================================================================
   Casa IA — Main Application Script
   Reveal animations, interactions, form handling
   ============================================================================ */

(function () {
  "use strict";

  // ---- Init Reveal Elements ----
  function initReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length === 0) return;

    // Safety timeout: reveal everything after 6 seconds
    const timeout = setTimeout(() => {
      reveals.forEach((el) => {
        el.classList.add("active");
      });
    }, 6000);

    // IntersectionObserver for scroll-triggered reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = (entry.target.dataset.delay || 0) * 1000;
            setTimeout(() => {
              entry.target.classList.add("active");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    reveals.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup on page unload
    window.addEventListener("beforeunload", () => {
      clearTimeout(timeout);
      observer.disconnect();
    });
  }

  // ---- Init GSAP Animations (if available) ----
  function initGsapAnimations() {
    if (typeof gsap === "undefined") return;

    // Hero title animation
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle && window.__canHover) {
      gsap.to(heroTitle, {
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      });
    }

    // Feature cards hover tilt
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card) => {
      if (!window.__canHover) return;

      card.addEventListener("mouseenter", function () {
        gsap.to(this, {
          duration: 0.35,
          y: -4,
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", function () {
        gsap.to(this, {
          duration: 0.35,
          y: 0,
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          ease: "power2.out",
        });
      });
    });

    // Gallery item hover zoom
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item) => {
      const img = item.querySelector(".gallery-img");
      if (!img || !window.__canHover) return;

      item.addEventListener("mouseenter", () => {
        gsap.to(img, {
          duration: 0.5,
          scale: 1.08,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(img, {
          duration: 0.5,
          scale: 1,
          ease: "power2.out",
        });
      });
    });

    // Button hover effects
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      if (!window.__canHover) return;

      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          duration: 0.3,
          y: -2,
          ease: "power2.out",
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          duration: 0.3,
          y: 0,
          ease: "power2.out",
        });
      });
    });
  }

  // ---- Init Smooth Scroll Links ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const offsetTop = target.offsetTop - 60; // Nav height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      });
    });
  }

  // ---- Init Form Handling ----
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.querySelector('textarea').value.trim();

      // Validate
      if (!name || !email || !message) {
        alert("Por favor completa todos los campos");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor ingresa un email válido");
        return;
      }

      // Prepare data for sending (you would send this to your backend)
      const data = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString(),
        property: "Casa IA",
      };

      console.log("Form data:", data);

      // Simulate sending
      const btn = form.querySelector("button");
      const originalText = btn.textContent;
      btn.textContent = "Enviando...";
      btn.disabled = true;

      // Simulate network delay
      setTimeout(() => {
        btn.textContent = "¡Mensaje enviado!";
        form.reset();

        // Reset button after 2 seconds
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      }, 1200);
    });
  }

  // ---- Init Navbar Scroll Effects ----
  function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener(
      "scroll",
      __throttle(() => {
        if (window.scrollY > 50) {
          navbar.style.background = "rgba(245, 240, 234, 0.95)";
          navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
        } else {
          navbar.style.background = "rgba(245, 240, 234, 0.7)";
          navbar.style.boxShadow = "none";
        }
      }, 100)
    );
  }

  // ---- Master Init ----
  function init() {
    __safe(initReveal, "initReveal");
    __safe(initGsapAnimations, "initGsapAnimations");
    __safe(initSmoothScroll, "initSmoothScroll");
    __safe(initContactForm, "initContactForm");
    __safe(initNavbarScroll, "initNavbarScroll");

    console.log("Casa IA • Application initialized");
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
