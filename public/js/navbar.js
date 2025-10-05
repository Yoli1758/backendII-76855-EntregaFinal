document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("admin-toggle");
  const menu = document.getElementById("admin-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.toggle("show");
  });


  document.addEventListener("click", (e) => {
    if (toggle.contains(e.target) || menu.contains(e.target)) return;
    menu.classList.remove("show");
  });
});