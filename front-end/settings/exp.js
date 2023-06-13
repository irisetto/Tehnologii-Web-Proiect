document.addEventListener("DOMContentLoaded", () => {

  const exportToggle = document.getElementById("export-toggle");
  const exportPanel = document.getElementById("export-panel");

  exportToggle.addEventListener("click", () => {
    exportPanel.classList.toggle("hidden");
  });
});