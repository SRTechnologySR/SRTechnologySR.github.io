// =======================================
// Technology SR – FINAL FIX Tools Script
// =======================================

function writeOutput(el, text) {
  if (!el) return;

  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    el.value = text;
  } else {
    el.innerText = text;
  }

  el.style.userSelect = "text";
  el.style.webkitUserSelect = "text";
  el.style.msUserSelect = "text";
  el.style.cursor = "text";
}

// =======================
// M3U ➜ XTREAM
// =======================
function extract() {
  const input = document.getElementById("m3uInput");
  const output = document.getElementById("resultBox");

  if (!input || !output) {
    alert("IDs missing: m3uInput or resultBox");
    return;
  }

  const urlText = input.value.trim();

  if (!urlText || !urlText.includes("get.php")) {
    writeOutput(output, "❌ Invalid M3U URL");
    return;
  }

  try {
    const url = new URL(urlText);
    const server = url.origin;
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    if (!username || !password) {
      writeOutput(output, "❌ Username or Password not found");
      return;
    }

    writeOutput(
      output,
`Server: ${server}
Username: ${username}
Password: ${password}`
    );

  } catch (e) {
    writeOutput(output, "❌ URL parsing failed");
  }
}

// =======================
// XTREAM ➜ M3U
// =======================
function generate() {
  const server = document.getElementById("serverInput");
  const user = document.getElementById("userInput");
  const pass = document.getElementById("passInput");
  const output = document.getElementById("resultBox");

  if (!server || !user || !pass || !output) {
    alert("One or more fields missing");
    return;
  }

  if (!server.value || !user.value || !pass.value) {
    writeOutput(output, "❌ Fill all fields");
    return;
  }

  const cleanServer = server.value.replace(/\/$/, "");

  writeOutput(
    output,
`${cleanServer}/get.php?username=${user.value}&password=${pass.value}&type=m3u_plus&output=ts`
  );
}

// Safety aliases (in case HTML uses other names)
window.extractXtream = extract;
window.m3uToXtream = extract;
window.convert = extract;
window.xtreamToM3U = generate;
