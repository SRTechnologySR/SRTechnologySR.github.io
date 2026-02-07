const M3U_URL = "index.m3u";

let channels = [];

/* ===== LOAD M3U ===== */
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

/* ===== PARSE M3U ===== */
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

  const categorySelect = document.getElementById("category");
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  renderChannels();
}

/* ===== RENDER CHANNELS ===== */
function renderChannels() {
  const list = document.getElementById("channelList");
  const search = document
    .getElementById("search")
    .value.toLowerCase();
  const category = document.getElementById("category").value;

  list.innerHTML = "";

  channels.forEach((ch, i) => {
    if (
      ch.name.toLowerCase().includes(search) &&
      (category === "all" || ch.group === category)
    ) {
      const label = document.createElement("label");
      label.className = "channel-item"; // ✅ FIXED LINE (IMPORTANT)

      label.innerHTML = `
        <span class="channel-name">${ch.name}</span>
        <input type="checkbox" data-index="${i}">
      `;

      list.appendChild(label);
    }
  });
}

/* ===== EVENTS ===== */
document
  .getElementById("search")
  .addEventListener("input", renderChannels);

document
  .getElementById("category")
  .addEventListener("change", renderChannels);

/* ===== GENERATE M3U ===== */
function generateM3U() {
  let out = "#EXTM3U\n";

  document
    .querySelectorAll('input[type="checkbox"]:checked')
    .forEach(cb => {
      const ch = channels[cb.dataset.index];
      out += ch.info + "\n" + ch.url + "\n";
    });

  document.getElementById("output").value = out;
}

/* ===== COPY ===== */
function copyM3U() {
  const out = document.getElementById("output");
  out.select();
  document.execCommand("copy");
  alert("M3U copied");
}

/* ===== DOWNLOAD ===== */
function downloadM3U() {
  const text = document.getElementById("output").value;
  const blob = new Blob([text], {
    type: "audio/x-mpegurl",
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "technology-sr.m3u";
  a.click();
}

function generateToken() {
  return "TSR-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

function generateBill() {

  const selectedChannels = document.querySelectorAll(
    '#channelList input[type="checkbox"]:checked'
  );

  if (selectedChannels.length === 0) {
    alert("Please select at least 1 channel");
    return;
  }

  const token = generateToken();

  let channelNames = "";
  selectedChannels.forEach(cb => {
    channelNames += "• " + cb.dataset.name + "\n";
  });

  const billText = `
=========== TECHNOLOGY SR ===========

Invoice Type : IPTV Playlist
Status       : PAID

------------------------------------

Channels Selected : ${selectedChannels.length}

Selected Channels:
${channelNames}

------------------------------------

TOKEN : ${token}

------------------------------------
Send this token screenshot to
Telegram Bot: t.me/TechnologySR_Bot
to receive your playlist.

====================================
`;

  alert(billText);
}
