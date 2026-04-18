gsap.registerPlugin(ScrollTrigger);

const split = new SplitType('.split', { types: 'chars words lines' });

window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView();
      }
    }, 100); 
  }
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navItems = document.querySelectorAll(".nav-menu li");

const isMobile = window.matchMedia("(max-width: 768px)");

gsap.to ("header", {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  scrollTrigger: {
    trigger: "header",
    start: "top 100%",
    scrub: true,
  },
})

if (isMobile.matches) {

  gsap.set(navMenu, { yPercent: 100, opacity: 1 });

  const tl = gsap.timeline({ paused: true, reversed: true });

  tl.to(navMenu, {
    color: "var(--color-bg)",
    backgroundColor: "var(--color-text)",
    yPercent: 0,
    duration: 0.4,
    ease: "power3.inOut",
  }, 0); 

  tl.to("header", {
    color: "var(--color-bg)",
    duration: 0.6,
  }, 0);

  tl.from(navItems, {
    y: 50,
    duration: 0.4,
    stagger: 0.02,
    ease: "power3.out",
  }, 0); 

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    tl.reversed() ? tl.play() : tl.reverse();
  });
}

/* -- button hover -- */

const buttons = document.querySelectorAll(".btn-var1");

buttons.forEach(button => {

  const tl = gsap.timeline({ paused: true });

  tl.to(button.querySelectorAll(".char"), {
    yPercent: -200,
    duration: 0.3,
    stagger: 0.03,
  })
  .set(button.querySelectorAll(".char"), {
    yPercent: 200,
  })
  .to(button.querySelectorAll(".char"), {
    yPercent: 0,
    duration: 0.3,
    stagger: 0.03,
  });

  button.addEventListener("mouseenter", () => {
    tl.play();
  });

  button.addEventListener("mouseleave", () => {
    tl.reverse();
  });

});

/* -- about section -- */

gsap.timeline({
  repeat: -1,
  yoyo: true,
})
.to("#about p .word", {
  color: "var(--color-text)",
  duration: 2,
  stagger: 0.02,
  opacity: 1,
  ease: "power2.inOut"
});