document.addEventListener("DOMContentLoaded", () => {
    /* THEME TOGGLE */
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector("i");

    // Check for saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
        updateIcon(savedTheme);
    } else {
        // Default to light or system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
            htmlElement.setAttribute("data-theme", "dark");
            updateIcon("dark");
        }
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === "dark") {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    }

    /* MOBILE NAVIGATION */
    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");
    const menuIconNav = menuButton.querySelector("i");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            if(navLinks.classList.contains("active")) {
                menuIconNav.classList.remove("fa-bars");
                menuIconNav.classList.add("fa-times");
            } else {
                menuIconNav.classList.remove("fa-times");
                menuIconNav.classList.add("fa-bars");
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuIconNav.classList.remove("fa-times");
                menuIconNav.classList.add("fa-bars");
            });
        });
    }

    /* SET YEAR */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});