// ===============================
// COMMON HELPERS
// ===============================
function $(id) {
  return document.getElementById(id);
}

function getAnyId(ids) {
  for (let id of ids) {
    let el = $(id);
    if (el) return el;
  }
  return null;
}

function showAlert(msg) {
  alert(msg);
}

// ===============================
// M3U → XTREAM
// ===============================
function convertM3UtoXtream() {
  const m3uInput = getAnyId(["m3uInput", "m3u", "m3uLink"]);
  const resultBox = getAnyId(["resultBox", "output", "xtreamResult"]);

  if (!m3uInput || !resultBox) {
    showAlert("IDs missing: m3uInput or resultBox");
    return;
  }

  const m3u = m3uInput.value.trim();
  if (!m3u) {
    showAlert("Please paste M3U link");
    return;
  }

  try {
    const url = new URL(m3u);
    const host = url.origin;
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    if (!username || !password) {
      showAlert("Invalid M3U link");
      return;
    }

    const text =
`🔹 Technology SR 🔹

Host: ${host}
Username: ${username}
Password: ${password}`;

    resultBox.value = text;
    resultBox.select();
    document.execCommand("copy");
  } catch {
    showAlert("Invalid URL format");
  }
}

// ===============================
// XTREAM → M3U
// ===============================
function convertXtreamToM3U() {
  const host = getAnyId(["host", "server", "xtreamHost"]);
  const user = getAnyId(["username", "user", "xtreamUser"]);
  const pass = getAnyId(["password", "pass", "xtreamPass"]);
  const resultBox = getAnyId(["resultBox", "output", "m3uResult"]);

  if (!host || !user || !pass || !resultBox) {
    showAlert("One or more fields missing");
    return;
  }

  if (!host.value || !user.value || !pass.value) {
    showAlert("Fill all fields");
    return;
  }

  const m3u =
`${host.value}/get.php?username=${user.value}&password=${pass.value}&type=m3u_plus&output=ts`;

  resultBox.value = m3u;
  resultBox.select();
  document.execCommand("copy");
  }
