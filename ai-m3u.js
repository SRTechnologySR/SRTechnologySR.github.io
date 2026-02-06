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
      const group =
        (info.match(/group-title="([^"]+)"/) || [,"Other"])[1];

      channels.push({ info, url, name, group });
      groups.add(group);
    }
  }

  const groupSelect = document.getElementById("groupFilter");
  groups.forEach(g => {
    const o = document.createElement("option");
    o.value = g;
    o.textContent = g;
    groupSelect.appendChild(o);
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
        <input type="checkbox" data-index="${i}">
        <span>${c.name}</span>
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
      out += c.info + "\n" + c.url + "\n";
    });

  document.getElementById("output").value = out;
}

function copyM3U() {
  const t = document.getElementById("output");
  t.select();
  document.execCommand("copy");
  alert("Copied");
}

function downloadM3U() {
  const text = document.getElementById("output").value;
  const blob = new Blob([text], { type: "audio/x-mpegurl" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "technology-sr.m3u";
  a.click();
}
