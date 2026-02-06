const USERS = {
  "Technology101": { pass: "Tech451", role: "user" },
  "Technology112": { pass: "Tech782", role: "user" },
  "Technology123": { pass: "Tech639", role: "user" },
  "Technology134": { pass: "Tech908", role: "user" },
  "Technology145": { pass: "Tech276", role: "user" },

  "Technology156": { pass: "Tech514", role: "user" },
  "Technology167": { pass: "Tech863", role: "user" },
  "Technology178": { pass: "Tech390", role: "user" },
  "Technology189": { pass: "Tech741", role: "user" },
  "Technology190": { pass: "Tech652", role: "user" },

  "Technology201": { pass: "Tech884", role: "user" },
  "Technology212": { pass: "Tech173", role: "user" },
  "Technology223": { pass: "Tech469", role: "user" },
  "Technology234": { pass: "Tech920", role: "user" },
  "Technology245": { pass: "Tech308", role: "user" },

  "Technology256": { pass: "Tech697", role: "user" },
  "Technology267": { pass: "Tech541", role: "user" },
  "Technology278": { pass: "Tech864", role: "user" },
  "Technology289": { pass: "Tech152", role: "user" },
  "Technology290": { pass: "Tech739", role: "user" },

  "Technology301": { pass: "Tech486", role: "user" },
  "Technology312": { pass: "Tech905", role: "user" },
  "Technology323": { pass: "Tech617", role: "user" },
  "Technology334": { pass: "Tech284", role: "user" },
  "Technology345": { pass: "Tech793", role: "user" },

  "Technology356": { pass: "Tech468", role: "user" },
  "Technology367": { pass: "Tech951", role: "user" },
  "Technology378": { pass: "Tech620", role: "user" },
  "Technology389": { pass: "Tech174", role: "user" },
  "Technology390": { pass: "Tech836", role: "user" },

  // 👑 ADMIN
  "TechnologySR-Admin": { pass: "TechnologyAdmin", role: "admin" }
};

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (USERS[u] && USERS[u].pass === p) {
    localStorage.setItem("auth", "yes");
    localStorage.setItem("user", u);
    localStorage.setItem("role", USERS[u].role);
    window.location.href = "index.html";
  } else {
    msg.innerText = "Invalid login ❌";
  }
}
