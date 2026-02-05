// ================================
// Technology SR – Tools Script
// ================================

// Make result box selectable & copyable
function makeCopyable(element) {
  element.style.userSelect = "text";
  element.style.webkitUserSelect = "text";
  element.style.msUserSelect = "text";
  element.style.cursor = "text";
}

// -------------------------------
// M3U ➜ XTREAM (Extract)
// -------------------------------
function extractXtream() {
  const input = document.getElementById("m3uInput").value.trim();
  const outputBox = document.getElementById("resultBox");

  if (!input.includes("get.php")) {
    outputBox.innerText = "❌ Invalid M3U URL";
    makeCopyable(outputBox);
    return;
  }

  try {
    const url = new URL(input);
    const server = url.origin;
    const username = url.searchParams.get("username") || "N/A";
    const password = url.searchParams.get("password") || "N/A";

    const result =
`Server: ${server}
Username: ${username}
Password: ${password}`;

    outputBox.innerText = result;
    makeCopyable(outputBox);

  } catch (e) {
    outputBox.innerText = "❌ Error parsing URL";
    makeCopyable(outputBox);
  }
}

// -------------------------------
// XTREAM ➜ M3U (Generate)
// -------------------------------
function generateM3U() {
  const server = document.getElementById("serverInput").value.trim();
  const username = document.getElementById("userInput").value.trim();
  const password = document.getElementById("passInput").value.trim();
  const outputBox = document.getElementById("resultBox");

  if (!server || !username || !password) {
    outputBox.innerText = "❌ Fill all fields";
    makeCopyable(outputBox);
    return;
  }

  const cleanServer = server.replace(/\/$/, "");

  const m3u =
`${cleanServer}/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`;

  outputBox.innerText = m3u;
  makeCopyable(outputBox);
    }
