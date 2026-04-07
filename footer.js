const scrollBtn = document.getElementById("scrollTop");
window.onscroll = () => {
  if (window.pageYOffset > 300) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

//   document.getElementById("stk-form").onsubmit = (e) => {
//     e.preventDefault();
//     const btn = e.target.querySelector("button");
//     const originalText = btn.innerText;
//     btn.innerText = "Sent!";
//     setTimeout(() => {
//       btn.innerText = originalText;
//     }, 3000);
//     e.target.reset();
//   };
