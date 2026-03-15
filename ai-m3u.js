/* ===============================
   CONFIG
================================ */
const M3U_URL = "index.m3u";

/* GOOGLE FORM */
const GOOGLE_FORM_URL =
"https://docs.google.com/forms/d/e/1FAIpQLSfz6OqFZ3ruclRcO7dnqPDK6rRaxlRrUDTF-BAjWeYRx1BcKQ/formResponse";

const ENTRY_TOKEN    = "entry.2028510034";
const ENTRY_COUNT    = "entry.1710769037";
const ENTRY_CHANNELS = "entry.1416189612";

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
      "Loaded " + channels.length + " channels";
  })
  .catch(err => {
    console.error(err);
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

    const line = lines[i].trim();

    if (line.startsWith("#EXTINF")) {

      const url = lines[i + 1] ? lines[i + 1].trim() : "";
      if (!url || url.startsWith("#")) continue;

      const name = line.split(",").pop().trim();

      const groupMatch = line.match(/group-title="([^"]*)"/);
      const group = groupMatch ? groupMatch[1] : "Other";

      channels.push({
        name: name,
        group: group,
        url: url
      });

      categories.add(group);
    }
  }

  /* CATEGORY LIST */
  const catSel = document.getElementById("category");

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    catSel.appendChild(option);
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
   TOKEN GENERATOR
================================ */
function generateToken() {

  return "TSR-" +
    Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
}

/* ===============================
   GENERATE BILL
================================ */
function generateBill() {

  const checked = document.querySelectorAll(
    "#channelList input[type='checkbox']:checked"
  );

  if (checked.length === 0) {
    alert("Please select at least 1 channel");
    return;
  }

  const token = generateToken();
  const count = checked.length;

  const channelNames = [];

  checked.forEach(c => {
    channelNames.push(c.dataset.name);
  });

  const formData = new FormData();

  formData.append(ENTRY_TOKEN, token);
  formData.append(ENTRY_COUNT, count);
  formData.append(ENTRY_CHANNELS, channelNames.join(", "));

  /* SEND TO GOOGLE FORM */
  fetch(GOOGLE_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  alert(
`=========== TECHNOLOGY SR ===========

Channels Selected : ${count}

TOKEN : ${token}

------------------------------------

📸 Take a screenshot and send it to

@Technology_SR_Bot

====================================`
  );
}
