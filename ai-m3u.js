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

      label.innerHTML = `
        <span class="channel-name">${ch.name}</span>
        <input type="checkbox"
          data-index="${i}"
          data-name="${ch.name}">
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

/* ===== TOKEN ===== */
function generateToken() {
  return "TSR-" + Math.random().toString(36)
    .substring(2, 10)
    .toUpperCase();
}

/* ===== GENERATE BILL + GOOGLE FORM SUBMIT ===== */
function generateBill() {

  const selectedChannels = document.querySelectorAll(
    '#channelList input[type="checkbox"]:checked'
  );

  if (selectedChannels.length === 0) {
    alert("Please select at least 1 channel");
    return;
  }

  const token = generateToken();
  const total = selectedChannels.length;

  let channelNames = "";
  selectedChannels.forEach(cb => {
    channelNames += cb.dataset.name + "\n";
  });

  /* 🔥 GOOGLE FORM AUTO SUBMIT */
  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfz6OqFZ3ruclRcO7dnqPDK6rRaxlRrUDTF-BAjWeYRx1BcKQ/formResponse";

  const data = new FormData();
  data.append("entry.509343295", token);          // Token
  data.append("entry.1938508613", total);         // Total Channels
  data.append("entry.1647623468", channelNames);  // Channel List

  fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: data
  });

  /* 👤 USER BILL */
  const billText = `
=========== TECHNOLOGY SR ===========

Invoice Type : IPTV Playlist
Status       : PAID

------------------------------------

Channels Selected : ${total}

------------------------------------

TOKEN : ${token}

------------------------------------
Send this token screenshot to
Telegram Bot:
t.me/TechnologySR_Bot

====================================
`;

  alert(billText);
  }
