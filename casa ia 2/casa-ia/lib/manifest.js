/* ============================================================================
   Manifest — global namespace, GSAP setup, utility functions
   ============================================================================ */

(function () {
  "use strict";

  // Global namespace
  window.__CASA = {
    version: "1.0.0",
    breakpoints: {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
    },
    theme: {
      accent: "#d4a574",
      accentDark: "#8b5a3c",
      ink: "#1f2937",
    },
  };

  // Safe function wrapper for error handling
  window.__safe = function (fn, name) {
    if (typeof fn !== "function") return;
    try {
      fn();
    } catch (err) {
      console.error(`[${name}] Error:`, err);
    }
  };

  // Utility: check if element is in viewport
  window.__inViewport = function (el, threshold = 0.05) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight - rect.height * threshold &&
      rect.bottom > rect.height * threshold
    );
  };

  // Utility: throttle function calls
  window.__throttle = function (fn, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  };

  // GSAP registration if available
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  // Detect reduced motion preference
  window.__prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.__canHover = matchMedia("(hover: hover)").matches;

  // Log initialization
  console.log("Casa IA • Manifest loaded", window.__CASA.version);
})();
