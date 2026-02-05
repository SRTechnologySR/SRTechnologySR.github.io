// =======================================
// Technology SR – Ultra Safe Tools Script
// =======================================

// Core logic (single source of truth)
function _extractCore() {
  const inputEl = document.getElementById("m3uInput");
  const outputEl = document.getElementById("resultBox");

  if (!inputEl || !outputEl) {
    alert("❌ Required elements not found");
    return;
  }

  const input = inputEl.value.trim();

  if (!input || !input.includes("get.php")) {
    outputEl.innerText = "❌ Invalid M3U URL";
    enableCopy(outputEl);
    return;
  }

  try {
    const url = new URL(input);
    const server = url.origin;
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    if (!username || !password) {
      outputEl.innerText = "❌ Username / Password missing";
      enableCopy(outputEl);
      return;
    }

    outputEl.innerText =
`Server: ${server}
Username: ${username}
Password: ${password}`;

    enableCopy(outputEl);

  } catch (e) {
    outputEl.innerText = "❌ Failed to parse URL";
    enableCopy(outputEl);
  }
}

// Make text selectable (desktop + mobile)
function enableCopy(el) {
  el.style.userSelect = "text";
  el.style.webkitUserSelect = "text";
  el.style.msUserSelect = "text";
  el.style.cursor = "text";
}

// ================================
// EXPOSE ALL POSSIBLE FUNCTION NAMES
// ================================
window.extract = _extractCore;
window.extractXtream = _extractCore;
window.m3uToXtream = _extractCore;
window.convert = _extractCore;

// ================================
// XTREAM ➜ M3U (Generator)
// ================================
function _generateCore() {
  const server = document.getElementById("serverInput")?.value.trim();
  const user = document.getElementById("userInput")?.value.trim();
  const pass = document.getElementById("passInput")?.value.trim();
  const output = document.getElementById("resultBox");

  if (!server || !user || !pass) {
    output.innerText = "❌ Fill all fields";
    enableCopy(output);
    return;
  }

  const cleanServer = server.replace(/\/$/, "");

  output.innerText =
`${cleanServer}/get.php?username=${user}&password=${pass}&type=m3u_plus&output=ts`;

  enableCopy(output);
}

// Expose generator safely
window.generate = _generateCore;
window.xtreamToM3U = _generateCore;
