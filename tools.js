// ===============================
// Technology SR – Tools Script
// ID-FREE | Mobile Safe | Copyable
// ===============================

// Find first textarea/input (user input)
function getInputField() {
  return document.querySelector("textarea, input[type='text'], input[type='url']");
}

// Find result box by placeholder text
function getResultBox() {
  return [...document.querySelectorAll("textarea, div")].find(el =>
    el.placeholder?.toLowerCase().includes("appear") ||
    el.innerText?.toLowerCase().includes("appear")
  );
}

// Replace result box with textarea for copy
function showResult(text) {
  let box = getResultBox();
  if (!box) {
    alert("❌ Result box not found");
    return;
  }

  if (box.tagName.toLowerCase() === "textarea") {
    box.value = text;
    return;
  }

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.readOnly = true;

  // Neon styling (same look)
  ta.style.width = "100%";
  ta.style.minHeight = "90px";
  ta.style.background = "transparent";
  ta.style.border = "1px solid #00ffd5";
  ta.style.borderRadius = "12px";
  ta.style.color = "#00ffd5";
  ta.style.padding = "12px";
  ta.style.fontSize = "14px";
  ta.style.outline = "none";
  ta.style.resize = "none";
  ta.style.boxShadow = "0 0 15px #00ffd5";

  box.replaceWith(ta);
}

// ===============================
// M3U ➜ XTREAM EXTRACT
// ===============================
function extractXtream() {
  const inputField = getInputField();
  if (!inputField || !inputField.value.trim()) {
    alert("❌ Paste M3U URL first");
    return;
  }

  const urlText = inputField.value.trim();

  if (!urlText.includes("get.php")) {
    showResult("❌ Invalid M3U URL");
    return;
  }

  try {
    const url = new URL(urlText);
    const server = url.origin;
    const username = url.searchParams.get("username") || "N/A";
    const password = url.searchParams.get("password") || "N/A";

    showResult(
`Server: ${server}
Username: ${username}
Password: ${password}`
    );

  } catch {
    showResult("❌ Error parsing URL");
  }
}

// ===============================
// XTREAM ➜ M3U GENERATE
// ===============================
function generateM3U() {
  const inputs = document.querySelectorAll("input");
  if (inputs.length < 3) {
    alert("❌ Missing fields");
    return;
  }

  const server = inputs[0].value.trim();
  const username = inputs[1].value.trim();
  const password = inputs[2].value.trim();

  if (!server || !username || !password) {
    alert("❌ Fill all fields");
    return;
  }

  const m3u =
`${server}/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`;

  showResult(m3u);
}
