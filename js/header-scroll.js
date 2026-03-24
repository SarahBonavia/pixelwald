document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (!header) return;

  // Sound toggle for hero video
  const video = document.getElementById("hero_video");
  const soundBtn = document.getElementById("sound_toggle");
  const svgMuted = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`;
  const svgUnmuted = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;

  if (video && soundBtn) {
    soundBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      soundBtn.innerHTML = video.muted ? svgMuted : svgUnmuted;
      soundBtn.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
      soundBtn.setAttribute("title", video.muted ? "Unmute" : "Mute");
    });
  }

  // Close burger menu when a nav link is clicked
  const navToggle = document.getElementById("nav-toggle");
  document.querySelectorAll(".headerlist a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle) navToggle.checked = false;
    });
  });

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      // Always show at the very top
      header.classList.remove("header--hidden");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down — hide
      header.classList.add("header--hidden");
    } else {
      // Scrolling up — show
      header.classList.remove("header--hidden");
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
});
