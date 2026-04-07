const hamburgerBtn = document.getElementById("xyzHamburger");
const sidebarCloseBtn = document.getElementById("xyzSidebarClose");
const overlay = document.getElementById("xyzOverlay");
const body = document.body;

function openSidebar() {
  body.classList.add("xyz-sidebar-open");
}

function closeSidebar() {
  body.classList.remove("xyz-sidebar-open");
}

hamburgerBtn.addEventListener("click", openSidebar);
sidebarCloseBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});
