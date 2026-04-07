document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const slides = document.querySelectorAll(".abcslide");
  const dots = document.querySelectorAll(".abcdot");
  let currentIndex = 0;
  let isAnimating = false;
  const intervalTime = 1500;

  function animateContent(index, show = true) {
    const slide = slides[index];
    const title = slide.querySelector(".abctitle");
    const text = slide.querySelector(".abctext");
    const btn = slide.querySelector(".abcbtn");
    const label = slide.querySelector(".abclabel");

    if (show) {
      gsap.fromTo(
        title,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
      gsap.fromTo(
        text,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 0.9,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        btn,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        label,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    }
  }

  function goToSlide(nextIndex) {
    if (nextIndex === currentIndex || isAnimating) return;
    isAnimating = true;

    // Deactivate current
    slides[currentIndex].classList.remove("abcactive");
    dots[currentIndex].classList.remove("abcactiveDot");

    // Activate next
    currentIndex = nextIndex;
    slides[currentIndex].classList.add("abcactive");
    dots[currentIndex].classList.add("abcactiveDot");

    // Animate next content
    animateContent(currentIndex);

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  // Click events
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-go"));
      goToSlide(index);
      resetAutoplay();
    });
  });

  // Autoplay
  let sliderInterval = setInterval(() => {
    let next = (currentIndex + 1) % slides.length;
    goToSlide(next);
  }, intervalTime);

  function resetAutoplay() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(() => {
      let next = (currentIndex + 1) % slides.length;
      goToSlide(next);
    }, intervalTime);
  }

  // Initial animation for first slide
  animateContent(0);
});

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Icons
  lucide.createIcons();

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Left Side Animations
  const leftTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".defimagewrap",
      start: "top 80%",
    },
  });

  leftTl
    .from(".deftallimg", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
    .from(
      ".defsmallimg",
      {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6",
    )
    .from(
      ".defexpbox",
      {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          // Start the counter animation when the box is visible
          gsap.to("#expCounter", {
            innerText: 25,
            duration: 2,
            snap: { innerText: 1 }, // Ensures integers only
            ease: "power1.inOut",
          });
        },
      },
      "-=0.7",
    );

  // Right Side Animations
  const rightTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".defcontent",
      start: "top 80%",
    },
  });

  rightTl
    .from(".deflabel", { opacity: 0, x: -20, duration: 0.6 })
    .from(".deftitle", { opacity: 0, y: 40, duration: 0.8 }, "-=0.4")
    .from(".deftext", { opacity: 0, y: 30, duration: 0.8 }, "-=0.6")
    .from(
      ".deflistitem",
      {
        opacity: 0,
        x: 20,
        stagger: 0.1,
        duration: 0.5,
      },
      "-=0.4",
    )
    .from(
      ".defcta",
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.1,
      },
      "-=0.2",
    );
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll(".ghicard");
  const circumference = 2 * Math.PI * 105; // 2 * PI * r

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ghigrid",
      start: "top 75%",
      once: true,
    },
  });

  // 1. Staggered card entrance
  tl.to(cards, {
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 1.2,
    stagger: 0.15,
    ease: "expo.out",
    startAt: { y: 60, scale: 0.8, opacity: 0 },
  });

  // 2. Animate Numbers & SVG Progress Rings
  const counterItems = document.querySelectorAll(".ghinumber");
  counterItems.forEach((counter) => {
    const targetValue = parseInt(counter.getAttribute("data-target"));
    const ring = counter
      .closest(".ghicircle-wrap")
      .querySelector(".ghiring-progress");
    const percent = parseInt(ring.getAttribute("data-percent"));

    // Animate Numbers
    tl.to(
      counter,
      {
        innerText: targetValue,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: "power2.out",
      },
      "-=1",
    );

    // Animate SVG Ring offset
    const offset = circumference - (percent / 100) * circumference;
    tl.to(
      ring,
      {
        strokeDashoffset: offset,
        duration: 2.5,
        ease: "power2.out",
      },
      "-=2.5",
    );
  });

  // 3. Initial rotate for dashed border
  tl.from(
    ".ghidashed",
    {
      rotate: -180,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      stagger: 0.1,
    },
    0,
  );
});

const teamData = [
  {
    name: "Dianne Russell",
    role: "Project Manager",
    img: "./assets/m1.webp",
    title: "Expert Strategy & Leadership",
    text: "Dianne brings over 10 years of experience in leading complex digital transformations for Fortune 500 companies.",
  },
  {
    name: "Guy Hawkins",
    role: "Lead Developer",
    img: "./assets/m2.webp",
    title: "Mastering Modern Codebases",
    text: "Guy is our technical architect who ensures every line of code is optimized for performance and security.",
  },
  {
    name: "Eleanor Pena",
    role: "UI/UX Designer",
    img: "./assets/m3.webp",
    title: "Creative Visual Solutions",
    text: "Eleanor focuses on user-centric layouts that drive engagement and conversion with elegant aesthetics.",
  },
  {
    name: "Jerome Bell",
    role: "Marketing Head",
    img: "./assets/m4.webp",
    title: "Driving Growth & Visibility",
    text: "Jerome crafts data-driven marketing strategies that put our clients ahead of the competition.",
  },
];

let currentIndex = 0;
let slideInterval;
const AUTO_SPEED = 1500; // 1.5 seconds

const mainImg = document.getElementById("mainImg");
const cardName = document.getElementById("cardName");
const cardRole = document.getElementById("cardRole");
const mainTitle = document.getElementById("mainTitle");
const mainText = document.getElementById("mainText");
const thumbContainer = document.getElementById("thumbContainer");
const memberCard = document.getElementById("memberCard");

function init() {
  lucide.createIcons();

  // Create Thumbs
  teamData.forEach((member, index) => {
    const thumb = document.createElement("div");
    thumb.className = `jklthumb ${index === 0 ? "active" : ""}`;
    thumb.innerHTML = `<img src="${member.img}" alt="${member.name}">`;
    thumb.onclick = () => {
      goToSlide(index);
      resetAutoSlide(); // Pause timer on interaction
    };
    thumbContainer.appendChild(thumb);
  });

  updateSlide(0, false);
  startAutoSlide();

  // Pause on hover
  memberCard.addEventListener("mouseenter", stopAutoSlide);
  memberCard.addEventListener("mouseleave", startAutoSlide);
}

function startAutoSlide() {
  stopAutoSlide(); // Clear existing
  slideInterval = setInterval(() => {
    let next = (currentIndex + 1) % teamData.length;
    updateSlide(next);
  }, AUTO_SPEED);
}

function stopAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  // Start again after 3 seconds of inactivity
  setTimeout(startAutoSlide, 3000);
}

function updateSlide(index, animate = true) {
  const member = teamData[index];
  currentIndex = index;

  // Update Thumbnails
  document.querySelectorAll(".jklthumb").forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });

  if (animate) {
    const tl = gsap.timeline();

    // Image Fade & Scale
    tl.to(mainImg, {
      opacity: 0,
      scale: 1.1,
      duration: 0.3,
      onComplete: () => {
        mainImg.src = member.img;
      },
    });
    tl.to(mainImg, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Content Transition
    gsap.to([cardName, cardRole, mainTitle, mainText], {
      opacity: 0,
      x: -20,
      duration: 0.2,
      stagger: 0.05,
      onComplete: () => {
        cardName.innerText = member.name;
        cardRole.innerText = member.role;
        mainTitle.innerText = member.title;
        mainText.innerText = member.text;

        gsap.to([cardName, cardRole, mainTitle, mainText], {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        });
      },
    });
  } else {
    mainImg.src = member.img;
    cardName.innerText = member.name;
    cardRole.innerText = member.role;
    mainTitle.innerText = member.title;
    mainText.innerText = member.text;
  }
}

function goToSlide(index) {
  if (index === currentIndex) return;
  updateSlide(index);
}

document.getElementById("nextBtn").onclick = () => {
  updateSlide((currentIndex + 1) % teamData.length);
  resetAutoSlide();
};

document.getElementById("prevBtn").onclick = () => {
  updateSlide((currentIndex - 1 + teamData.length) % teamData.length);
  resetAutoSlide();
};

// window.onload = init;

// Initialize Lucide Icons
lucide.createIcons();

// GSAP Reveal Animations
// window.onload = () => {
//   gsap.registerPlugin(ScrollTrigger);

//   // Reveal Left Card
//   gsap.to(".mnoleft", {
//     scrollTrigger: {
//       trigger: ".mnogrid",
//       start: "top 80%",
//     },
//     x: 0,
//     opacity: 1,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Set Initial Left Position for Reveal
//   gsap.set(".mnoleft", { x: -60, opacity: 0 });
//   gsap.set(".mnocard", { x: 60, opacity: 0 });

//   // Reveal Right Cards with Stagger
//   gsap.to(".mnocard", {
//     scrollTrigger: {
//       trigger: ".mnoright",
//       start: "top 85%",
//     },
//     x: 0,
//     opacity: 1,
//     duration: 1,
//     stagger: 0.15,
//     ease: "power3.out",
//   });
// };
window.addEventListener("load", () => {
  init();

  gsap.registerPlugin(ScrollTrigger);

  // pricing animation
  gsap.to(".mnoleft", {
    scrollTrigger: {
      trigger: ".mnogrid",
      start: "top 80%",
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
  });

  gsap.set(".mnoleft", { x: -60, opacity: 0 });
  gsap.set(".mnocard", { x: 60, opacity: 0 });

  gsap.to(".mnocard", {
    scrollTrigger: {
      trigger: ".mnoright",
      start: "top 85%",
    },
    x: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
  });
});
// Pricing Toggle Logic
function togglePricing(type) {
  const btns = document.querySelectorAll(".mnotogglebtn");
  const prices = document.querySelectorAll(".mnoprice");
  const labels = document.querySelectorAll(".mnomonth");

  btns.forEach((btn) => {
    if (btn.innerText.toLowerCase() === type) {
      btn.classList.add("mnotoggleactive");
    } else {
      btn.classList.remove("mnotoggleactive");
    }
  });

  prices.forEach((priceEl, index) => {
    const val =
      type === "monthly" ? priceEl.dataset.monthly : priceEl.dataset.yearly;
    const label = type === "monthly" ? "/Month" : "/Year";

    // Animate price change
    const priceSpan = priceEl.querySelector(".price-val");
    const labelSpan = priceEl.querySelector(".mnomonth");

    gsap.to(priceSpan, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        priceSpan.innerText = val;
        labelSpan.innerText = label;
        gsap.to(priceSpan, { opacity: 1, y: 0, duration: 0.3 });
      },
    });
  });
}

const track = document.getElementById("pqrTrack");
const container = document.getElementById("pqrMainContainer");
const prevBtn = document.getElementById("pqrPrev");
const nextBtn = document.getElementById("pqrNext");

let cards = Array.from(document.querySelectorAll(".pqrcard"));
const originalCount = cards.length;

// clone for infinite
cards.forEach((card) => {
  track.appendChild(card.cloneNode(true));
  track.insertBefore(card.cloneNode(true), track.firstChild);
});

let allCards = Array.from(document.querySelectorAll(".pqrcard"));
let index = originalCount;

function getVisible() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function updateSlider(instant = false) {
  const visible = getVisible();
  const gap = 24;

  const cardWidth = (container.offsetWidth - gap * (visible - 1)) / visible;

  allCards.forEach((card) => {
    card.style.width = cardWidth + "px";
  });

  const move = (cardWidth + gap) * index;

  track.style.transition = instant ? "none" : "transform .6s ease";
  track.style.transform = `translateX(-${move}px)`;

  // reset loop
  if (index >= allCards.length - originalCount) {
    setTimeout(() => {
      track.style.transition = "none";
      index = originalCount;
      updateSlider(true);
    }, 600);
  }

  if (index <= 0) {
    setTimeout(() => {
      track.style.transition = "none";
      index = allCards.length - originalCount * 2;
      updateSlider(true);
    }, 600);
  }
}

// buttons
nextBtn.onclick = () => {
  index++;
  updateSlider();
};

prevBtn.onclick = () => {
  index--;
  updateSlider();
};

// autoplay
let auto = setInterval(() => {
  index++;
  updateSlider();
}, 3000);

container.addEventListener("mouseenter", () => clearInterval(auto));
container.addEventListener("mouseleave", () => {
  auto = setInterval(() => {
    index++;
    updateSlider();
  }, 3000);
});

// resize
window.addEventListener("resize", () => updateSlider(true));

// init
updateSlider(true);

// Initialize Lucide Icons
lucide.createIcons();

// Accordion Logic
const accordionItems = document.querySelectorAll(".stuitem");

accordionItems.forEach((item) => {
  const question = item.querySelector(".stuquestion");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("stuactive");

    // Close all items
    accordionItems.forEach((otherItem) => {
      otherItem.classList.remove("stuactive");
      const otherIcon = otherItem.querySelector(".stuicon");
      otherIcon.innerHTML = `<i data-lucide="plus" size="18"></i>`;
    });

    // Toggle clicked item
    if (!isActive) {
      item.classList.add("stuactive");
      const icon = item.querySelector(".stuicon");
      icon.innerHTML = `<i data-lucide="minus" size="18"></i>`;
    }

    // Refresh icons for the newly injected HTML
    lucide.createIcons();
  });
});

// GSAP Reveal Animations
gsap.registerPlugin(ScrollTrigger);

const mainTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".stusection",
    start: "top 80%",
    ease: "power3.out",
  },
});

// Left content sequence
mainTl.from(".stulabel, .stutitle, .stutext", {
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
});

// Accordion sequence
mainTl.from(
  ".stuitem",
  {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  },
  "-=0.6",
);

// Right image sequence
mainTl.from(
  ".stuimagewrap",
  {
    x: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  },
  "-=1.2",
);
