console.log("script");

function toggleScrollContainer() {
  var scrollContainer = document.getElementById("scrollContainer");
  if (scrollContainer) {
    // 현재 display 상태를 가져오기 위해 getComputedStyle 사용
    var computedStyle = window.getComputedStyle(scrollContainer);
    if (computedStyle.display === "none") {
      scrollContainer.style.display = "block";
    } else {
      scrollContainer.style.display = "none";
    }
    console.log("Display status:", scrollContainer.style.display); // 상태 확인
  }
}

document
  .getElementById("teamButton")
  .addEventListener("click", toggleScrollContainer);

// 'MY' 버튼 클릭 시 'login.html'로 이동
document.getElementById("myButton").addEventListener("click", function () {
  window.location.href = "login.html";
});

// TODAY 버튼 클릭 시 today.html로 이동
document.getElementById("todayButton").addEventListener("click", function () {
  window.location.href = "today.html";
});

// KBO 버튼 클릭 시 kbo.html로 이동
document.getElementById("kboButton").addEventListener("click", function () {
  window.location.href = "/kbo";
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const query = event.target.value.trim();
        if (query === "") {
          console.error("Search query is empty!");
          return;
        }
        console.log("Searching for:", query);
        window.location.href = `/search?query=${encodeURIComponent(query)}`;
      }
    });
  } else {
    console.error("Search input not found!");
  }
});

// 'MY' 버튼 클릭 시 'login.html'로 이동
document.getElementById("myButton").addEventListener("click", function () {
  window.location.href = "/public/login/index.html";
});

// TODAY 버튼 클릭 시 today.html로 이동
document.getElementById("todayButton").addEventListener("click", function () {
  window.location.href = "/public/today/index.html";
});

// KBO 버튼 클릭 시 kbo.html로 이동
document.getElementById("kboButton").addEventListener("click", function () {
  window.location.href = "/public/kbo/index.html";
});

console.log("script");

function toggleScrollContainer() {
  var scrollContainer = document.getElementById("scrollContainer");
  if (scrollContainer) {
    // 현재 display 상태를 가져오기 위해 getComputedStyle 사용
    var computedStyle = window.getComputedStyle(scrollContainer);
    if (computedStyle.display === "none") {
      scrollContainer.style.display = "block";
    } else {
      scrollContainer.style.display = "none";
    }
    console.log("Display status:", scrollContainer.style.display); // 상태 확인
  }
}

document
  .getElementById("teamButton")
  .addEventListener("click", toggleScrollContainer);

// 'MY' 버튼 클릭 시 'login.html'로 이동
document.getElementById("myButton").addEventListener("click", function () {
  window.location.href = "login.html";
});

// TODAY 버튼 클릭 시 today.html로 이동
document.getElementById("todayButton").addEventListener("click", function () {
  window.location.href = "today.html";
});

// KBO 버튼 클릭 시 kbo.html로 이동
document.getElementById("kboButton").addEventListener("click", function () {
  window.location.href = "/kbo";
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const query = event.target.value.trim();
        if (query === "") {
          console.error("Search query is empty!");
          return;
        }
        console.log("Searching for:", query);
        window.location.href = `/search?query=${encodeURIComponent(query)}`;
      }
    });
  } else {
    console.error("Search input not found!");
  }
});

// 'MY' 버튼 클릭 시 'login.html'로 이동
document.getElementById("myButton").addEventListener("click", function () {
  window.location.href = "/public/login/index.html";
});

// TODAY 버튼 클릭 시 today.html로 이동
document.getElementById("todayButton").addEventListener("click", function () {
  window.location.href = "/public/today/index.html";
});

// KBO 버튼 클릭 시 kbo.html로 이동
document.getElementById("kboButton").addEventListener("click", function () {
  window.location.href = "/public/kbo/index.html";
});

async function fetchKboSchedule(year, month) {
  try {
    const response = await fetch(`/kbo?year=${year}&month=${month}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching KBO schedule:", error);
    return null;
  }
}

function scheduleToDataframe(data) {
  const rows = [];
  for (const month in data) {
    for (const date in data[month]) {
      for (const game of data[month][date]) {
        rows.push({
          Date: `${month}-${date}`,
          Time: game.time,
          "Home Team": game.home_team,
          "Away Team": game.away_team,
          "Home Score": game.home_score,
          "Away Score": game.away_score,
          Venue: game.venue,
          Remark: game.remark,
        });
      }
    }
  }
  return rows;
}

function createTable(data) {
  if (!data || data.length === 0) {
    return "<p>No schedule data available.</p>";
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // 테이블 헤더 생성
  const headerRow = document.createElement("tr");
  Object.keys(data[0]).forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 테이블 바디 생성
  data.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table.outerHTML;
}

document.addEventListener("DOMContentLoaded", async () => {
  const kboScheduleContainer = document.getElementById("kboSchedule");
  const year = new Date().getFullYear(); // 현재 연도 가져오기
  const month = new Date().getMonth() + 1; // 현재 월 가져오기 (0부터 시작하므로 +1)

  const scheduleData = await fetchKboSchedule(year, month);
  if (scheduleData) {
    const dataframe = scheduleToDataframe(scheduleData);
    const tableHtml = createTable(dataframe);
    kboScheduleContainer.innerHTML = tableHtml;
  } else {
    kboScheduleContainer.innerHTML = "<p>Failed to load KBO schedule.</p>";
  }
});
