const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const yearElement = document.getElementById("year");
const loader = document.getElementById("loader");
const backToTop = document.getElementById("backToTop");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

const savedTheme = localStorage.getItem("player-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
}

function updateThemeButton() {
  if (!themeToggle) return;

  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
}

if (themeToggle) {
  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("player-theme", isLight ? "light" : "dark");
    updateThemeButton();
  });
}

function hideLoader() {
  if (loader) {
    loader.classList.add("hidden");
  }
}

window.addEventListener("load", hideLoader, { once: true });
setTimeout(hideLoader, 3000);

const revealElements = document.querySelectorAll("main section, .stat-card, .highlight-card, .social-card, .reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("reveal")) {
      element.classList.add("reveal");
    }
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("active"));
}

const skillBars = document.querySelector(".skill-bars");

if (skillBars) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.classList.add("active");
          skillObserver.unobserve(skillBars);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillObserver.observe(skillBars);
}

if (backToTop) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}/* LESSON 28 - SCROLL PROGRESS BAR */

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", function () {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = pageHeight > 0
        ? (scrollTop / pageHeight) * 100
        : 0;

    if (scrollProgress) {
        scrollProgress.style.width = progress + "%";
    }

});/* LESSON 29 - CUSTOM CURSOR */

const customCursor = document.querySelector(".custom-cursor");

if (customCursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

    document.addEventListener("mousemove", function (event) {
        customCursor.style.left = event.clientX + "px";
        customCursor.style.top = event.clientY + "px";
    });

    document.querySelectorAll("a, button").forEach(function (element) {
        element.addEventListener("mouseenter", function () {
            customCursor.classList.add("active");
        });

        element.addEventListener("mouseleave", function () {
            customCursor.classList.remove("active");
        });
    });
}/* LESSON 30 - IMAGE LIGHTBOX */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

const galleryImages = document.querySelectorAll(".gallery-item img");

let currentImageIndex = 0;

function showImage(index) {
    if (!galleryImages.length || !lightboxImage) return;

    currentImageIndex =
        (index + galleryImages.length) % galleryImages.length;

    const img = galleryImages[currentImageIndex];

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;

    const imageCounter = document.getElementById("imageCounter");

    if (imageCounter) {
        imageCounter.textContent =
            (currentImageIndex + 1) + " / " + galleryImages.length;
    }
}

galleryImages.forEach(function (img, index) {
    img.addEventListener("click", function () {
        showImage(index);
        lightbox.classList.add("active");
        document.body.classList.add("lightbox-open");
    });
});

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (prevImage) {
    prevImage.addEventListener("click", function () {
        showImage(currentImageIndex - 1);
    });
}

if (nextImage) {
    nextImage.addEventListener("click", function () {
        showImage(currentImageIndex + 1);
    });
}

if (lightbox) {
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) closeLightbox();
    });
}

document.addEventListener("keydown", function (event) {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showImage(currentImageIndex + 1);
    if (event.key === "ArrowLeft") showImage(currentImageIndex - 1);
});/* CLUB FILTER SYSTEM */

const filterButtons = document.querySelectorAll(".filter-btn");
const clubCards = document.querySelectorAll(".club-card");
// SAVED CLUB FAVORITES SYSTEM

let savedFavorites = [];

try {
    savedFavorites = JSON.parse(localStorage.getItem("favoriteClubs")) || [];
} catch (error) {
    savedFavorites = [];
}
// FAVORITES COUNTER

const favoritesCount = document.getElementById("favoritesCount");

function updateFavoritesCount() {
    if (favoritesCount) {
        favoritesCount.textContent = savedFavorites.length;
    }
}

updateFavoritesCount();

clubCards.forEach(function(card) {
    const heading = card.querySelector("h3");

    if (!heading) return;

    const clubName = heading.textContent.trim();
    const favoriteButton = document.createElement("button");

    favoriteButton.className = "favorite-btn";
    favoriteButton.type = "button";

    function updateFavoriteButton() {
        if (savedFavorites.includes(clubName)) {
            favoriteButton.textContent = "★ Added to Favorites";
            favoriteButton.classList.add("favorited");
        } else {
            favoriteButton.textContent = "☆ Add to Favorites";
            favoriteButton.classList.remove("favorited");
        }
    }

    updateFavoriteButton();

    favoriteButton.addEventListener("click", function() {
        if (savedFavorites.includes(clubName)) {
            savedFavorites = savedFavorites.filter(function(name) {
                return name !== clubName;
            });
        } else {
            savedFavorites.push(clubName);
        }

        localStorage.setItem("favoriteClubs", JSON.stringify(savedFavorites));
        updateFavoriteButton();
        updateFavoritesCount();
    });

    card.appendChild(favoriteButton);
});

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const filter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        clubCards.forEach(function(card) {

            const league = card.dataset.league;

            if (filter === "all" || league === filter) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }

        });

    });

});/* CLUB SEARCH SYSTEM */

const clubSearch = document.getElementById("clubSearch");
const clearSearch = document.getElementById("clearSearch");
const clubResults = document.getElementById("clubResults");
const noClubsMessage = document.getElementById("noClubsMessage");

function filterClubs() {
    const searchValue = clubSearch ? clubSearch.value.toLowerCase() : "";
    const activeButton = document.querySelector(".filter-btn.active");
    const activeFilter = activeButton ? activeButton.dataset.filter : "all";
    const showFavorites = activeFilter === "favorites";
    let visibleCount = 0;

    clubCards.forEach(function(card) {
        const heading = card.querySelector("h3");
        const clubName = (heading ? heading.textContent.trim() : card.textContent.trim()).toLowerCase();
        const league = card.dataset.league;
        const matchesSearch = clubName.includes(searchValue);
        const matchesFilter =
            activeFilter === "all" ||
            league === activeFilter ||
            (showFavorites && heading && savedFavorites.includes(heading.textContent.trim()));
        const isVisible = matchesSearch && matchesFilter;

        card.style.display = isVisible ? "flex" : "none";

        if (isVisible) {
            visibleCount++;
        }
    });

    if (clubResults) {
        clubResults.innerHTML =
            'Showing <span>' + visibleCount + '</span> of <span>' + clubCards.length + '</span> clubs';
    }

    if (noClubsMessage) {
        noClubsMessage.style.display = visibleCount === 0 ? "block" : "none";
    }
}

if (clubSearch) {
    clubSearch.addEventListener("input", filterClubs);
}

if (clearSearch) {
    clearSearch.addEventListener("click", function() {

        // Clear search
        clubSearch.value = "";

        // Reset league filter
        filterButtons.forEach(function(button) {
            button.classList.remove("active");

            if (button.dataset.filter === "all") {
                button.classList.add("active");
            }
        });

        // Show all clubs
        filterClubs();

    });
}

filterButtons.forEach(function(button) {
    button.addEventListener("click", filterClubs);
});