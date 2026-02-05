// =======================================
// Technology SR – ID-FREE Tools Script
// =======================================

// Find inputs automatically
function getFields() {
  const fields = document.querySelectorAll("input, textarea");

  if (fields.length < 2) {
    return null;
  }

  return {
    input: fields[0],   // M3U input
    output: fields[fields.length - 1] // Result box
  };
}

// Write output safely (copyable)
function writeOutput(el, text) {
  el.value = text;
  el.readOnly = true;
  el.style.userSelect = "text";
  el.style.webkitUserSelect = "text";
  el.style.cursor = "text";
}

// =======================
// M3U ➜ XTREAM
// =======================
function extract() {
  const fields = getFields();
  if (!fields) return;

  const urlText = fields.input.value.trim();

  if (!urlText.includes("get.php")) {
    writeOutput(fields.output, "❌ Invalid M3U URL");
    return;
  }

  try {
    const url = new URL(urlText);

    const server = url.origin;
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    if (!username || !password) {
      writeOutput(fields.output, "❌ Username or Password not found");
      return;
    }

    writeOutput(
      fields.output,
`Server: ${server}
Username: ${username}
Password: ${password}`
    );

  } catch (e) {
    writeOutput(fields.output, "❌ URL parsing failed");
  }
}

// =======================
// XTREAM ➜ M3U
// =======================
function generate() {
  const fields = document.querySelectorAll("input, textarea");

  if (fields.length < 4) return;

  const server = fields[0].value.trim();
  const user = fields[1].value.trim();
  const pass = fields[2].value.trim();
  const output = fields[fields.length - 1];

  if (!server || !user || !pass) {
    writeOutput(output, "❌ Fill all fields");
    return;
  }

  const cleanServer = server.replace(/\/$/, "");

  writeOutput(
    output,
`${cleanServer}/get.php?username=${user}&password=${pass}&type=m3u_plus&output=ts`
  );
}

// Safety aliases (ANY button name works)
window.extractXtream = extract;
window.m3uToXtream = extract;
window.convert = extract;
window.generateM3U = generate;
window.xtreamToM3U = generate;
