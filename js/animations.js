// ===========================================================
// SCROLL REVEAL
// Inclua este script no fim do <body>, depois do script que
// carrega header/footer:
// <script src="/js/animations.js"></script>
//
// Funciona em conjunto com as classes .reveal / .reveal-group
// definidas em animations.css
// ===========================================================

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function setStaggerDelays() {
    document.querySelectorAll(".reveal-group").forEach((group) => {
      const items = group.querySelectorAll(".reveal");
      items.forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${index * 0.08}s`);
      });
    });
  }

  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      // Sem suporte ou usuário prefere menos movimento: mostra tudo direto
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // Header com sombra/estado "scrolled" (opcional — só ativa se o header
  // injetado tiver a classe .site-header; ajuste o seletor se necessário)
  function initHeaderScrollState() {
    const header = document.querySelector(".site-header, header");
    if (!header) return;

    const toggleScrolledClass = () => {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };

    toggleScrolledClass();
    window.addEventListener("scroll", toggleScrolledClass, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setStaggerDelays();
    initScrollReveal();

    // O header é injetado via fetch em index.html, então esperamos
    // um pouco para garantir que já esteja no DOM antes de observar.
    setTimeout(initHeaderScrollState, 300);
  });
})();