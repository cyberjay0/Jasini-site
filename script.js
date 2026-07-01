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
    github: "https://github.com/cyberjay0/Lewis-Garden-Suites"
  },
  crustncrumb: {
    title: "CrustNcrumb Pastry",
    category: "Restaurant Website",
    description: "CrustNcrumb Pastry is a premium e-commerce-style storefront for an artisanal bakery. It displays pastry menus, cake decoration portfolios, and takes custom orders. Built with smooth page transitions and a custom pricing calculator for custom pastry requests.",
    industry: "Gourmet Bakery and Catering",
    tech: "Vanilla HTML, CSS, JavaScript",
    scope: "Interactive Product Menus, Contact Order Forms, Pastry Catalog",
    img: "assets/images/project-crustncrumb.png",
    github: "https://github.com/cyberjay0/CrustNcrumb-Pastry"
  },
  jayautos: {
    title: "Jayautos",
    category: "Car Dealership",
    description: "Jayautos is a vehicle showroom website developed for a premier car dealership in Abuja. The platform features an interactive catalog search with advanced filters (make, model, price, year) and lead capturing forms. Built with React and TypeScript.",
    industry: "Automotive Retail",
    tech: "TypeScript, React, CSS Modules",
    scope: "Dynamic Catalog Search, Advanced Filtering, Finance Request Forms",
    img: "assets/images/project-jayautos.png",
    github: "https://github.com/cyberjay0/Jayautos"
  },
  mmmautos: {
    title: "mmmautos",
    category: "Aftersales Service",
    description: "mmmautos is the digital home of Nigeria's top aftersales car repair, parts procurement, and detailing dealership. The application includes detailing service bookings, parts catalog orders, and maintenance trackers.",
    industry: "Automotive Service and Detailing",
    tech: "Vanilla JavaScript, CSS Grid, LocalStorage Integration",
    scope: "Service Booking Schedule, Spare Parts Catalog, Customer Detailing Showcase",
    img: "assets/images/project-mmmautos.png",
    github: "https://github.com/cyberjay0/mmmautos"
  },
  fade: {
    title: "Fade District",
    category: "Barbershop Website",
    description: "Fade District is a premium barbershop website built for a UK business. The website provides a modern styling gallery, service options, and an integrated booking flow allowing clients to select barber, service, time, and pre-pay.",
    industry: "Grooming and Barbershop",
    tech: "Vanilla CSS, HTML5, JavaScript",
    scope: "Styling Portfolio, Real-time Appointment Scheduler, Team Profiles",
    img: "assets/images/project-fade.png",
    github: "https://github.com/cyberjay0/Fade-district"
  },
  blackoak: {
    title: "Black Oak Residence",
    category: "Luxury Property Website",
    description: "Black Oak Residence is a minimalist architectural design showcase for an ultra-luxury residential property. It focuses on large high-resolution images, virtual walkthrough integrations, and sleek glassmorphism panels to convey exclusivity.",
    industry: "Luxury Real Estate and Architecture",
    tech: "Vanilla JavaScript, CSS, Intersection Observer",
    scope: "Virtual Tour Embed, High-Res Image Sliders, Minimalist Showcase Layout",
    img: "assets/images/project-blackoak.png",
    github: "https://github.com/cyberjay0/Black-Oak-Residence"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Preloader sequence
  const preloader = document.getElementById("preloader");
  const bar = document.getElementById("preloader-bar");
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }, 300);
    }
    bar.style.width = `${progress}%`;
  }, 80);

  // 2. Mobile Nav Toggle
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

  // 3. Header Scrolled State
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 4. Scroll Active Navigation Link Highlight
  const sections = document.querySelectorAll("section");
  const navLinksList = document.querySelectorAll(".nav-link");
  
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
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

  // 5. Hero Card Stack Mouse Perspective (micro-interaction)
  const stack = document.querySelector(".mockup-stack");
  if (stack) {
    stack.addEventListener("mousemove", (e) => {
      const rect = stack.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const cards = document.querySelectorAll(".mockup-card");
      cards.forEach((card, index) => {
        const factor = (3 - index) * 0.05;
        card.style.transform = `rotateY(${-15 + x * factor}deg) rotateX(${10 - y * factor}deg) translateY(${-40 + index * 80}px) translateX(${index * 30}px) translateZ(${(2 - index) * 50}px)`;
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
  document.getElementById("project-modal-github").href = project.github;
  
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
