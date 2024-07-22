let apiKey;
let header;
let text;
let icon;
let delay;
let duration;
let font;
let width;
let height;

const getData = () => {
  var scripts = document.getElementsByTagName("script");
  var lastScript = scripts[scripts.length - 1];
  var scriptName = lastScript;
  apiKey = scriptName.getAttribute("apiKey");
  //apiKey = document.currentScript.getAttribute("apiKey");
};

const fetchData = async () => {
  const url = `http://127.0.0.1:8000/api/popup/${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const insertValues = (json) => {
  header = json.header;
  text = json.text;
  icon = json.icon;
  delay = json.delay;
  duration = json.duration;
  font = json.font;
  width = json.width;
  height = json.height;
};

const insertPopUp = () => {
  const cascade = `
.popup {
    display: none; /* Initially hidden */
    position: absolute;
    top: 20px;
    right: 20px;
    width: ${width}px;
    height: ${height}px;
    background-color: black;
    color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    padding: 10px;
    opacity: 0;
    transition: opacity 0.5s;
    font-family: ${font};
}
.popup-icon {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    font-family: ${font};
}
.popup-text {
    flex-grow: 1;
    font-family: ${font};
}`;

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cascade);
  document.adoptedStyleSheets = [sheet];
  const html = `<div id="popup" class="popup">
    <img src="${icon}" alt="Icon" class="popup-icon">
    <span class="popup-text">${text}</span>
</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", html);
};

document.addEventListener("DOMContentLoaded", function () {
  getData();
  fetchData().then((d) => {
    insertValues(d);
    insertPopUp();
    const popup = document.getElementById("popup");

    // Delay before the popup appears (in milliseconds)
    const delayBeforeAppear = delay; // 2 seconds
    // Duration for the popup to stay visible (in milliseconds)
    const durationVisible = duration; // 5 seconds

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
});
