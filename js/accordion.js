document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll("[data-accordion-toggle='more-exhibitions']");
  const accordionPanel = document.getElementById("more-exhibitions");

  if (!accordionPanel || toggleButtons.length === 0) {
    return;
  }

  const setExpandedState = (isExpanded) => {

    toggleButtons.forEach((button) => {
      button.setAttribute("aria-expanded", String(isExpanded));
      const label = button.querySelector("h4");
      if (label) {
        label.textContent = isExpanded ? "Schliessen" : "Weitere Austellungen";
      }
    });

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
      }
    };

    accordionPanel.addEventListener("transitionend", onTransitionEnd, { once: true });
  };

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      setExpandedState(!isExpanded);
    });
  });

  setExpandedState(false);
});
