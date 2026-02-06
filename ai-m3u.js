const M3U_URL = "index.m3u";

let channels = [];

fetch(M3U_URL)
  .then(res => res.text())
  .then(text => {
    parseM3U(text);
    document.getElementById("status").innerText =
      `Loaded ${channels.length} channels`;
  })
  .catch(() => {
    document.getElementById("status").innerText =
      "Playlist load nahi hui";
  });

function parseM3U(text) {
  const lines = text.split(/\r?\n/);
  const groups = new Set();

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("#EXTINF")) {
      const info = lines[i];
      const url = lines[i + 1];
      if (!url) continue;

      const name = info.split(",").pop().trim();
      const groupMatch = info.match(/group-title="([^"]+)"/);
      const group = groupMatch ? groupMatch[1] : "Other";

      channels.push({ info, url, name, group });
      groups.add(group);
    }
  }

  const groupFilter = document.getElementById("groupFilter");
  groups.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    groupFilter.appendChild(opt);
  });

  renderChannels();
}

function renderChannels() {
  const list = document.getElementById("channelList");
  const search = document.getElementById("search").value.toLowerCase();
  const group = document.getElementById("groupFilter").value;

  list.innerHTML = "";

  channels.forEach((c, i) => {
    if (
      c.name.toLowerCase().includes(search) &&
      (group === "all" || c.group === group)
    ) {
      const div = document.createElement("div");
      div.className = "channel";
      div.innerHTML = `
        <label>
          <input type="checkbox" data-index="${i}">
          ${c.name}
        </label>
      `;
      list.appendChild(div);
    }
  });
}

document.getElementById("search")
  .addEventListener("input", renderChannels);

document.getElementById("groupFilter")
  .addEventListener("change", renderChannels);

function generateM3U() {
  let out = "#EXTM3U\n";

  document
    .querySelectorAll("input[type=checkbox]:checked")
    .forEach(cb => {
      const c = channels[cb.dataset.index];
      out += `${c.info}\n${c.url}\n`;
    });

  document.getElementById("output").value = out;
}

function copyM3U() {
  const out = document.getElementById("output");
  out.select();
  document.execCommand("copy");
  alert("Copied!");
}

function downloadM3U() {
  const text = document.getElementById("output").value;
  const blob = new Blob([text], { type: "audio/x-mpegurl" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "TechnologySR.m3u";
  a.click();
}

/* ===== NAVBAR FIX ===== */

nav {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 12px 0 20px;
}

nav a {
  text-decoration: none;
  color: #00ffd5;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(0,255,213,0.5);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 10px rgba(0,255,213,0.25);
  transition: all 0.25s ease;
}

/* Hover glow */
nav a:hover {
  background: #00ffd5;
  color: #000;
  box-shadow: 0 0 18px rgba(0,255,213,0.8);
}

/* Active page highlight */
nav a.active {
  background: #00ffd5;
  color: #000;
}
