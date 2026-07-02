// Project Database ( cyberjay0 actual projects )
const projectsData = {
  lewis: {
    title: "Lewis Garden Suites",
    category: "Hotel Website",
    description: "Lewis Garden Suites is a premium boutique hotel website. The project showcases its rooms, amenities, and surroundings, featuring an interactive booking system. Built with Vanilla JS and CSS for ultra-fast loading speed to optimize mobile conversion rates.",
    industry: "Hospitality and Tourism",
    tech: "Vanilla HTML, CSS, JavaScript, Webpack",
    scope: "Responsive Design, Interactive Calendar Booking, Custom SVG Maps",
    img: "assets/images/project-lewis.png",
    website: "https://lewis-garden-suites.vercel.app/"
  },
  crustncrumb: {
    title: "CrustNcrumb Pastry",
    category: "Restaurant Website",
    description: "CrustNcrumb Pastry is a premium e-commerce-style storefront for an artisanal bakery. It displays pastry menus, cake decoration portfolios, and takes custom orders. Built with smooth page transitions and a custom pricing calculator for custom pastry requests.",
    industry: "Gourmet Bakery and Catering",
    tech: "Vanilla HTML, CSS, JavaScript",
    scope: "Interactive Product Menus, Contact Order Forms, Pastry Catalog",
    img: "assets/images/project-crustncrumb.png",
    website: "https://crust-ncrumb-pastry.vercel.app/"
  },
  mmmautos: {
    title: "mmmautos",
    category: "Aftersales Service",
    description: "mmmautos is the digital home of Nigeria's top aftersales car repair, parts procurement, and detailing dealership. The application includes detailing service bookings, parts catalog orders, and maintenance trackers.",
    industry: "Automotive Service and Detailing",
    tech: "Vanilla JavaScript, CSS Grid, LocalStorage Integration",
    scope: "Service Booking Schedule, Spare Parts Catalog, Customer Detailing Showcase",
    img: "assets/images/project-mmmautos.png",
    website: "https://mmmautos-gold.vercel.app/"
  },
  fade: {
    title: "Fade District",
    category: "Barbershop Website",
    description: "Fade District is a premium barbershop website built for a UK business. The website provides a modern styling gallery, service options, and an integrated booking flow allowing clients to select barber, service, time, and pre-pay.",
    industry: "Grooming and Barbershop",
    tech: "Vanilla CSS, HTML5, JavaScript",
    scope: "Styling Portfolio, Real-time Appointment Scheduler, Team Profiles",
    img: "assets/images/project-fade.png",
    website: "https://fade-district-seven.vercel.app/"
  },
  bluehaven: {
    title: "Blue Haven",
    category: "Hotel Website",
    description: "Blue Haven is a luxury boutique hotel website showcasing rooms, amenities, and experiences in a clean and elegant design. The site features a smooth booking experience, curated gallery sections, and a premium feel tailored to attract high-end guests.",
    industry: "Hospitality and Tourism",
    tech: "Vanilla HTML, CSS, JavaScript",
    scope: "Responsive Design, Room Gallery, Contact and Booking Flow",
    img: "assets/images/project-bluehaven.png",
    website: "https://blue-haven-suites.vercel.app/"
  },
  blackoak: {
    title: "Black Oak Residence",
    category: "Luxury Real Estate",
    description: "Black Oak Residence is a high-end real estate website designed to showcase a premium property. The site features an immersive visual experience with curated property photography, detailed amenity listings, and an elegant inquiry flow built for discerning buyers.",
    industry: "Luxury Real Estate",
    tech: "Vanilla HTML, CSS, JavaScript",
    scope: "Property Showcase, Image Gallery, Lead Inquiry Form",
    img: "assets/images/project-blackoak.png",
    website: "https://black-oak-residence.vercel.app/"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Premium Preloader Ticker (Circular Progress)
  const preloader = document.getElementById("preloader");
  const progressCircle = document.getElementById("preloader-progress");
  const percentText = document.getElementById("preloader-percent");
  
  const circumference = 339.29; // 2 * pi * 54
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }, 500);
    }
    
    // Update circle SVG path and text percentage
    const offset = circumference - (progress / 100) * circumference;
    if (progressCircle) progressCircle.style.strokeDashoffset = offset;
    if (percentText) percentText.innerText = `${progress}%`;
  }, 60);

  // 2. Scroll Progress Bar
  const scrollBar = document.getElementById("scroll-bar");
  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrolled = (window.scrollY / docHeight) * 100;
      if (scrollBar) scrollBar.style.width = `${scrolled}%`;
    }
  });

  // 3. Mobile Nav Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active");
    });
    
    // Close nav when clicking a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileToggle.classList.remove("active");
      });
    });
  }

  // 4. Header Scrolled State
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 5. Scroll Active Navigation Link Highlight
  const sections = document.querySelectorAll("section");
  const navLinksList = document.querySelectorAll(".nav-link");
  
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 240)) {
        current = section.getAttribute("id");
      }
    });
    
    navLinksList.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // 6. Hero Card Stack Mouse Perspective (Luxury Parallax)
  const stack = document.querySelector(".mockup-stack");
  if (stack) {
    stack.addEventListener("mousemove", (e) => {
      const rect = stack.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const cards = document.querySelectorAll(".mockup-card");
      cards.forEach((card, index) => {
        const factor = (3 - index) * 0.04;
        // Rotation and translate math aligned with style.css structure
        card.style.transform = `rotateY(${-20 + x * factor}deg) rotateX(${10 - y * factor}deg) translateY(${-30 + index * 80}px) translateX(${index * 40}px) translateZ(${80 - index * 60}px)`;
      });
    });
    
    stack.addEventListener("mouseleave", () => {
      const cards = document.querySelectorAll(".mockup-card");
      cards.forEach((card, index) => {
        card.style.transform = "";
      });
    });
  }
});

// --- Consultation Modal Functions ---
function openConsultationModal() {
  const modal = document.getElementById("consultation-modal");
  const formWrap = document.getElementById("booking-form-wrap");
  const successWrap = document.getElementById("booking-success-wrap");
  
  formWrap.style.display = "block";
  successWrap.style.display = "none";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeConsultationModal() {
  const modal = document.getElementById("consultation-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formWrap = document.getElementById("booking-form-wrap");
  const successWrap = document.getElementById("booking-success-wrap");
  
  // Simulate API post
  setTimeout(() => {
    formWrap.style.display = "none";
    successWrap.style.display = "block";
    document.getElementById("consultation-form").reset();
  }, 600);
}

// --- Project Modal Functions ---
function openProjectModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;
  
  document.getElementById("project-modal-img").src = project.img;
  document.getElementById("project-modal-img").alt = project.title;
  document.getElementById("project-modal-title").innerText = project.title;
  document.getElementById("project-modal-cat").innerText = project.category;
  document.getElementById("project-modal-desc").innerText = project.description;
  document.getElementById("project-modal-industry").innerText = project.industry;
  document.getElementById("project-modal-tech").innerText = project.tech;
  document.getElementById("project-modal-scope").innerText = project.scope;
  document.getElementById("project-modal-website").href = project.website;
  
  const modal = document.getElementById("project-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  const consultationModal = document.getElementById("consultation-modal");
  const projectModal = document.getElementById("project-modal");
  
  if (e.target === consultationModal) {
    closeConsultationModal();
  }
  if (e.target === projectModal) {
    closeProjectModal();
  }
});
