document.addEventListener("DOMContentLoaded", () => {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector("i");
    const updateIcon = (theme) => {
        if (!themeIcon) return;
        themeIcon.classList.toggle("fa-sun", theme === "dark");
        themeIcon.classList.toggle("fa-moon", theme !== "dark");
    };

    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    htmlElement.setAttribute("data-theme", initialTheme);
    updateIcon(initialTheme);

    themeToggle?.addEventListener("click", () => {
        const nextTheme = htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
        updateIcon(nextTheme);
    });

    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");
    const menuIcon = menuButton?.querySelector("i");
    const closeMenu = () => {
        navLinks?.classList.remove("active");
        menuButton?.setAttribute("aria-expanded", "false");
        menuIcon?.classList.replace("fa-times", "fa-bars");
    };

    menuButton?.addEventListener("click", () => {
        const isOpen = navLinks?.classList.toggle("active");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        if (menuIcon) {
            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-times", isOpen);
        }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", closeMenu));
    menuButton?.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuButton.focus();
        }
    });

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navigationLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
            });
        }, { threshold: 0.25, rootMargin: "-10% 0px -50% 0px" });
        sections.forEach((section) => observer.observe(section));
    }

    const copyrightYear = document.getElementById("copyright-year");
    if (copyrightYear) copyrightYear.innerHTML = `&copy; ${new Date().getFullYear()} Mike Soita. All Rights Reserved.`;
});
