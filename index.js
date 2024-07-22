const html = `<div id="popup" class="popup">
    <img src="icon.png" alt="Icon" class="popup-icon">
    <span class="popup-text">This is a popup message</span>
</div>`;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("body").insertAdjacentHTML("afterbegin", html);
  const popup = document.getElementById("popup");

  // Delay before the popup appears (in milliseconds)
  const delayBeforeAppear = 2000; // 2 seconds
  // Duration for the popup to stay visible (in milliseconds)
  const durationVisible = 5000; // 5 seconds

  setTimeout(() => {
    popup.style.display = "flex";
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 100); // Slight delay for transition effect
    setTimeout(() => {
      popup.style.opacity = 0;
      setTimeout(() => {
        popup.style.display = "none";
      }, 500); // Match the transition duration
    }, durationVisible);
  }, delayBeforeAppear);
});
