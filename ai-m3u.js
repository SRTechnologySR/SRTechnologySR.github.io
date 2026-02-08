const M3U_URL = "index.m3u";
let channels = [];

/* LOAD M3U */
fetch(M3U_URL)
  .then(res => res.text())
  .then(text => {
    parseM3U(text);
    document.getElementById("status").innerText =
      `Loaded ${channels.length} channels`;
  });

/* PARSE */
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
        (info.match(/group-title="([^"]*)"/) || ["","Other"])[1];

      channels.push({ info, url, name, group });
      categories.add(group);
    }
  }

  const catSel = document.getElementById("category");
  categories.forEach(c => {
    const o = document.createElement("option");
    o.value = c;
    o.textContent = c;
    catSel.appendChild(o);
  });

  renderChannels();
}

/* RENDER */
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
        <input type="checkbox" data-name="${ch.name}">
      `;
      list.appendChild(label);
    }
  });
}

/* EVENTS */
document.getElementById("search").addEventListener("input", renderChannels);
document.getElementById("category").addEventListener("change", renderChannels);

/* TOKEN */
function generateToken() {
  return "TSR-" + Math.random().toString(36).substring(2,10).toUpperCase();
}

/* GENERATE */
function generateBill() {
  const checked = document.querySelectorAll(
    '#channelList input[type="checkbox"]:checked'
  );

  if (checked.length === 0) {
    alert("Please select at least 1 channel");
    return;
  }

  const token = generateToken();

  alert(`
=========== TECHNOLOGY SR ===========

Channels Selected : ${checked.length}

TOKEN : ${token}

Send token screenshot to:
t.me/TechnologySR_Bot
  `);

  // auto scroll bottom
  goToBottom();
}

/* GO TO BOTTOM */
function goToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}

/* HIDE FLOAT BUTTON WHEN BOTTOM */
window.addEventListener("scroll", () => {
  const btn = document.getElementById("goBottomBtn");
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
    btn.classList.add("hidden");
  } else {
    btn.classList.remove("hidden");
  }
});
