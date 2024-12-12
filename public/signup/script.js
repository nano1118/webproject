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
