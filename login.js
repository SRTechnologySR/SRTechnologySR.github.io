const USERS = {
  "Technology101": "Tech451",
  "Technology112": "Tech782",
  "Technology123": "Tech639",
  "Technology134": "Tech908",
  "Technology145": "Tech276",
  "Technology156": "Tech514",
  "Technology167": "Tech863",
  "Technology178": "Tech390",
  "Technology189": "Tech741",
  "Technology190": "Tech652",
  "Technology201": "Tech884",
  "Technology212": "Tech173",
  "Technology223": "Tech469",
  "Technology234": "Tech920",
  "Technology245": "Tech308",
  "Technology256": "Tech697",
  "Technology267": "Tech541",
  "Technology278": "Tech864",
  "Technology289": "Tech152",
  "Technology290": "Tech739",
  "Technology301": "Tech486",
  "Technology312": "Tech905",
  "Technology323": "Tech617",
  "Technology334": "Tech284",
  "Technology345": "Tech793",
  "Technology356": "Tech468",
  "Technology367": "Tech951",
  "Technology378": "Tech620",
  "Technology389": "Tech174",
  "Technology390": "Tech836"
};

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  if (USERS[u] && USERS[u] === p) {
    localStorage.setItem("auth", "yes");
    localStorage.setItem("user", u);
    window.location.href = "index.html";
  } else {
    document.getElementById("msg").innerText = "Invalid login ❌";
  }
}
