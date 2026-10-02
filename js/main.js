const nav = document.getElementById("nav");
const header = document.querySelector(".site-header");
const progress = document.getElementById("scrollProgress");
const toast = document.getElementById("toast");

document.getElementById("menuToggle")?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.getElementById("searchToggle")?.addEventListener("click", () => {
  document.getElementById("searchPanel").classList.toggle("open");
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll("[data-open]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.open).classList.add("open");
  });
});
document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => btn.closest(".modal").classList.remove("open"));
});
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  const bookLink = e.target.closest('a[href="#book"]');
  if (!bookLink) return;
  e.preventDefault();
  document.getElementById("bookModal").classList.add("open");
  nav?.classList.remove("open");
});

document.getElementById("bookForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  document.getElementById("bookModal").classList.remove("open");
  showToast("Thank you. Our team will confirm your booking shortly.");
});

document.getElementById("subscribeForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  showToast("You are subscribed to health updates.");
});

function initInfiniteSlider({ viewportSel, trackSel, nextId, prevId, gap = 22, interval = 3500, visibleFn }) {
  const viewport = document.querySelector(viewportSel);
  const track = document.querySelector(trackSel);
  if (!viewport || !track) return;

  const originals = [...track.children];
  const count = originals.length;
  if (!count) return;
  originals.forEach((card) => track.appendChild(card.cloneNode(true)));

  let index = 0;
  let timer;
  let moving = false;

  const cardSize = () => {
    const n = visibleFn();
    return (viewport.clientWidth - gap * (n - 1)) / n;
  };

  const layout = () => {
    const width = cardSize();
    [...track.children].forEach((card) => {
      card.style.flex = `0 0 ${width}px`;
    });
    go(index, false);
  };

  const go = (i, animate) => {
    track.style.transition = animate ? "transform .55s ease" : "none";
    const width = cardSize();
    track.style.transform = `translateX(${-(width + gap) * i}px)`;
    index = i;
  };

  const next = () => {
    if (moving) return;
    moving = true;
    go(index + 1, true);
    setTimeout(() => {
      if (index >= count) go(0, false);
      moving = false;
    }, 580);
  };

  const prev = () => {
    if (moving) return;
    moving = true;
    if (index <= 0) {
      go(count, false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          go(count - 1, true);
          setTimeout(() => { moving = false; }, 580);
        });
      });
      return;
    }
    go(index - 1, true);
    setTimeout(() => { moving = false; }, 580);
  };

  const play = () => {
    stop();
    timer = setInterval(next, interval);
  };
  const stop = () => clearInterval(timer);

  document.getElementById(nextId)?.addEventListener("click", () => { next(); play(); });
  document.getElementById(prevId)?.addEventListener("click", () => { prev(); play(); });
  viewport.addEventListener("mouseenter", stop);
  viewport.addEventListener("mouseleave", play);
  window.addEventListener("resize", layout);

  layout();
  play();
}

(function initHeroSlider() {
  const slides = [...document.querySelectorAll("#heroSlider .hero-banner-img")];
  const dotsWrap = document.getElementById("heroDots");
  if (slides.length < 2) return;
  let index = 0;
  let timer;
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Show banner ${i + 1}`);
    if (i === 0) b.classList.add("is-active");
    b.addEventListener("click", () => go(i));
    dotsWrap?.appendChild(b);
  });
  const dots = [...(dotsWrap?.children || [])];
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((img, n) => img.classList.toggle("is-active", n === index));
    dots.forEach((d, n) => d.classList.toggle("is-active", n === index));
  };
  const play = () => {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 4500);
  };
  document.getElementById("heroNext")?.addEventListener("click", () => { go(index + 1); play(); });
  document.getElementById("heroPrev")?.addEventListener("click", () => { go(index - 1); play(); });
  document.querySelector(".hero")?.addEventListener("mouseenter", () => clearInterval(timer));
  document.querySelector(".hero")?.addEventListener("mouseleave", play);
  play();
})();

initInfiniteSlider({
  viewportSel: ".doctors-wrap",
  trackSel: "#doctorTrack",
  nextId: "docNext",
  prevId: "docPrev",
  visibleFn: () => {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }
});

initInfiniteSlider({
  viewportSel: ".testi-wrap",
  trackSel: "#testiTrack",
  nextId: "revNext",
  prevId: "revPrev",
  interval: 4000,
  visibleFn: () => (window.innerWidth <= 760 ? 1 : 2)
});

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progress) progress.style.width = `${value}%`;
  header?.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

const counted = new Set();
function animateCount(el) {
  if (counted.has(el)) return;
  counted.add(el);
  const raw = el.getAttribute("data-count");
  if (!raw) return;
  const suffix = el.textContent.replace(/[\d.]/g, "");
  const end = Number(raw);
  const start = performance.now();
  const duration = 1100;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = `${Math.round(end * eased)}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) animateCount(entry.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
}
