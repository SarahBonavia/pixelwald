document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll("[data-accordion-toggle='more-exhibitions']");
  const accordionPanel = document.getElementById("more-exhibitions");
  const installationSection = document.getElementById("installation");
  const openText = "Weitere Austellungen";
  const closeText = "Schliessen";

  if (!accordionPanel || toggleButtons.length === 0) {
    return;
  }

  const updateButtonLabels = (isExpanded) => {
    toggleButtons.forEach((button) => {
      const label = button.querySelector(".austellungen_toggle_label");
      if (label) {
        label.textContent = isExpanded ? closeText : openText;
      }
    });
  };

  const scrollToInstallationStart = () => {
    if (!installationSection) {
      return;
    }

    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;
    const installationTop = installationSection.getBoundingClientRect().top + window.scrollY;
    const scrollTarget = Math.max(installationTop - headerHeight, 0);

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth"
    });
  };

  const setExpandedState = (isExpanded, shouldScrollOnClose = false) => {
    toggleButtons.forEach((button) => {
      button.setAttribute("aria-expanded", String(isExpanded));
    });
    updateButtonLabels(isExpanded);

    if (isExpanded) {
      accordionPanel.hidden = false;
      requestAnimationFrame(() => {
        accordionPanel.classList.add("is-open");
      });
      return;
    }

    accordionPanel.classList.remove("is-open");
    const onTransitionEnd = (event) => {
      if (event.target === accordionPanel && event.propertyName === "max-height") {
        accordionPanel.hidden = true;
        accordionPanel.removeEventListener("transitionend", onTransitionEnd);
        if (shouldScrollOnClose) {
          scrollToInstallationStart();
        }
      }
    };

    accordionPanel.addEventListener("transitionend", onTransitionEnd);
  };

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const nextExpandedState = !isExpanded;
      setExpandedState(nextExpandedState, isExpanded);
    });
  });

  setExpandedState(false);
});
