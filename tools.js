function xtreamToM3U() {
  let s = server.value.trim();
  let u = username.value.trim();
  let p = password.value.trim();

  if (!s || !u || !p) {
    alert("Please fill all fields");
    return;
  }

  s = s.replace(/\/$/, "");
  m3uResult.value =
    `${s}/get.php?username=${u}&password=${p}&type=m3u_plus&output=ts`;

  // 👉 AUTO COPY
  m3uResult.select();
  m3uResult.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(m3uResult.value);
}

function m3uToXtream() {
  try {
    const url = new URL(m3uInput.value.trim());

    if (!url.searchParams.get("username")) {
      xtreamInfo.value = "Not a valid Xtream-based M3U link";
      return;
    }

    xtreamInfo.value =
      `Server: ${url.origin}\n` +
      `Username: ${url.searchParams.get("username")}\n` +
      `Password: ${url.searchParams.get("password")}`;

    // 👉 AUTO COPY
    xtreamInfo.select();
    xtreamInfo.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(xtreamInfo.value);

  } catch {
    xtreamInfo.value = "Invalid M3U URL";
  }
}
