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


/* --loader --*/
if (document.getElementById('loader')) {
  document.body.classList.add('loading')
}

window.addEventListener('load', () => {
  const hasLoaded = sessionStorage.getItem('hasLoaded')

  if (hasLoaded) {
    document.getElementById('loader').style.display = 'none'
    document.body.classList.remove('loading')
    return
  }

  sessionStorage.setItem('hasLoaded', 'true')

  const counter = document.getElementById('loader-count')
  const tl = gsap.timeline()

  const isMobile = window.innerWidth <= 600

  const increments = [0, 17, 34, 58, 72, 89, 100]
  const positions = isMobile 
    ? ['0vw', '5vw', '15vw', '25vw', '35vw', '45vw', '55vw']
    : ['0vw', '10vw', '25vw', '45vw', '55vw', '65vw', '70vw']

  increments.forEach((num, i) => {
    tl.to('#loader-count', {
      x: positions[i],
      duration: 0.6 + Math.random() * 0.6,
      ease: 'power2.inOut',
      onStart: () => {
        gsap.to(counter, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            counter.textContent = num
            gsap.to(counter, { opacity: 1, duration: 0.15 })
          }
        })
      }
    })
  })

  tl.to('#loader', {
    x: '-100%',
    duration: 0.8,
    ease: 'power3.inOut'
  })
  .set('#loader', { display: 'none' })
  .call(() => document.body.classList.remove('loading'))

  tl.from("#hero h1 .char", {
    yPercent: 100,
    duration: 0.8,
    ease: "power3.inOut",
    stagger: 0.06
  })

  tl.from("#hero h2 .char", {
    yPercent: 100,
    duration: 0.8,
    ease: "power3.inOut",
    stagger: 0.06
  }, "<")

  tl.to("#hero svg", {
    rotation: 360,
    duration: 1,
    ease: 'power2.inOut'
  })

  tl.from(".hero-text", {
    opacity: 0,
    duration: 0.8,
    ease: "power3.inOut"
  }, "<")
})

gsap.utils.toArray(".reveal-3d").forEach((el) => {
  gsap.fromTo(
    el,
    { y: 120, opacity: 0, rotateX: 55 },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      }
    }
  )
})

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