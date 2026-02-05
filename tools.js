// Technology SR – Tools JS

function makeCopyable(el) {
  el.style.userSelect = "text";
  el.style.webkitUserSelect = "text";
  el.style.msUserSelect = "text";
}

// =======================
// M3U ➜ XTREAM (EXTRACT)
// =======================
function extract() {
  const input = document.getElementById("m3uInput").value;
  const output = document.getElementById("resultBox");

  if (!input || !input.includes("get.php")) {
    output.innerText = "❌ Invalid M3U URL";
    makeCopyable(output);
    return;
  }

  try {
    const url = new URL(input);

    const server = url.origin;
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    if (!username || !password) {
      output.innerText = "❌ Username or Password not found";
      makeCopyable(output);
      return;
    }

    output.innerText =
`Server: ${server}
Username: ${username}
Password: ${password}`;

    makeCopyable(output);

  } catch (err) {
    output.innerText = "❌ Error reading URL";
    makeCopyable(output);
  }
}

// =======================
// XTREAM ➜ M3U (GENERATE)
// =======================
function generate() {
  const server = document.getElementById("serverInput").value;
  const user = document.getElementById("userInput").value;
  const pass = document.getElementById("passInput").value;
  const output = document.getElementById("resultBox");

  if (!server || !user || !pass) {
    output.innerText = "❌ Fill all fields";
    makeCopyable(output);
    return;
  }

  const cleanServer = server.replace(/\/$/, "");

  output.innerText =
`${cleanServer}/get.php?username=${user}&password=${pass}&type=m3u_plus&output=ts`;

  makeCopyable(output);
}
