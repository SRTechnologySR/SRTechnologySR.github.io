/* ===============================
   CONFIG
================================ */
const M3U_URL = "index.m3u";

/* ===============================
   GLOBALS
================================ */
let channels = [];

/* ===============================
   LOAD M3U
================================ */
fetch(M3U_URL)
  .then(res => res.text())
  .then(text => {
    parseM3U(text);
    document.getElementById("status").innerText =
      `Loaded ${channels.length} channels`;
  })
  .catch(() => {
    document.getElementById("status").innerText =
      "Failed to load playlist";
  });

/* ===============================
   PARSE M3U
================================ */
function parseM3U(text) {
  const lines = text.split(/\r?\n/);
  const categories = new Set();

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("#EXTINF")) {
      const info = lines[i];
      const url = lines[i + 1];
      if (!url) continue;

      const name = info.split(",").pop().trim();
      const group =
        (info.match(/group-title="([^"]*)"/) || ["", "Other"])[1];

      channels.push({ info, url, name, group });
      categories.add(group);
    }
  }

  /* CATEGORY DROPDOWN */
  const catSel = document.getElementById("category");
  categories.forEach(c => {
    const o = document.createElement("option");
    o.value = c;
    o.textContent = c;
    catSel.appendChild(o);
  });

  renderChannels();
}

/* ===============================
   RENDER CHANNELS
================================ */
function renderChannels() {
  const list = document.getElementById("channelList");
  const search = document.getElementById("search").value.toLowerCase();
  const cat = document.getElementById("category").value;

  list.innerHTML = "";

  channels.forEach((ch, i) => {
    if (
      ch.name.toLowerCase().includes(search) &&
      (cat === "all" || ch.group === cat)
    ) {
      const label = document.createElement("label");
      label.innerHTML = `
        <span class="channel-name">${ch.name}</span>
        <input type="checkbox" data-index="${i}">
      `;
      list.appendChild(label);
    }
  });
}

/* ===============================
   EVENTS
================================ */
document.getElementById("search")
  .addEventListener("input", renderChannels);

document.getElementById("category")
  .addEventListener("change", renderChannels);

/* ===============================
   GENERATE PLAYLIST (ADMIN)
================================ */
function generateM3U() {
  const checked = document.querySelectorAll(
    '#channelList input[type="checkbox"]:checked'
  );

  if (checked.length === 0) {
    alert("Please select at least 1 channel");
    return;
  }

  let output = "#EXTM3U\n";

  checked.forEach(cb => {
    const ch = channels[cb.dataset.index];
    output += ch.info + "\n" + ch.url + "\n";
  });

  document.getElementById("output").value = output;
}

/* ===============================
   COPY PLAYLIST
================================ */
function copyM3U() {
  const out = document.getElementById("output");
  out.select();
  document.execCommand("copy");
  alert("Playlist copied");
}

/* ===============================
   DOWNLOAD PLAYLIST
================================ */
function downloadM3U() {
  const text = document.getElementById("output").value;
  const blob = new Blob([text], {
    type: "audio/x-mpegurl"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "technology-sr-admin.m3u";
  a.click();
}
