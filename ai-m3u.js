/* ===============================
   CONFIG
================================ */
const M3U_URL = "index.m3u";

/* 🔴 GOOGLE FORM DETAILS (CHANGE THIS) */
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/FORM_ID/formResponse";

const ENTRY_TOKEN = "entry.1234567890";
const ENTRY_COUNT = "entry.9876543210";
const ENTRY_CHANNELS = "entry.5555555555";

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

  channels.forEach(ch => {
    if (
      ch.name.toLowerCase().includes(search) &&
      (cat === "all" || ch.group === cat)
    ) {
      const label = document.createElement("label");
      label.innerHTML = `
        <span class="channel-name">${ch.name}</span>
        <input type="checkbox" data-name="${ch.name}">
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
   TOKEN
================================ */
function generateToken() {
  return "TSR-" + Math.random().toString(36)
    .substring(2, 10)
    .toUpperCase();
}

/* ===============================
   GENERATE + GOOGLE FORM SUBMIT
================================ */
function generateBill() {
  const checked = document.querySelectorAll(
    '#channelList input[type="checkbox"]:checked'
  );

  if (checked.length === 0) {
    alert("Please select at least 1 channel");
    return;
  }

  const token = generateToken();
  const count = checked.length;

  let channelNames = [];
  checked.forEach(ch => {
    channelNames.push(ch.dataset.name);
  });

  const channelList = channelNames.join(", ");

  /* GOOGLE FORM SUBMIT */
  const formData = new FormData();
  formData.append(ENTRY_TOKEN, token);
  formData.append(ENTRY_COUNT, count);
  formData.append(ENTRY_CHANNELS, channelList);

  fetch(GOOGLE_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  /* USER MESSAGE */
  alert(`
=========== TECHNOLOGY SR ===========

Channels Selected : ${count}

TOKEN : ${token}

✔ Token saved successfully
Send token screenshot to:
t.me/TechnologySR_Bot
`);
}
