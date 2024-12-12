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
  window.location.href = "/login";
});

// TODAY 버튼 클릭 시 today.html로 이동
document.getElementById("todayButton").addEventListener("click", function () {
  window.location.href = "/today";
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

const photoContainer = document.getElementById("photoContainer");
const selectedList = document.getElementById("selectedList"); // 선수 목록
const selectedPhotosContainer = document.getElementById(
  "selectedPhotosContainer"
); // 선택된 선수 사진 컨테이너
let currentPhotos = {}; // 현재 표시 중인 사진 추적
let selectedPlayers = []; // 선택된 선수 목록

const predefinedImages = [
  "/public/src/img/My_1.png", // 1번 이미지
  "/public/src/img/My_2.png", // 2번 이미지
  "/public/src/img/My_3.png", // 3번 이미지
];
let selectedOrder = []; // 선택된 선수 순서를 저장
let maxSelection = 3; // 최대 3명의 선수 선택 가능

// 선수 선택 함수
function selectPlayer(playerName) {
  if (selectedPlayers.length >= maxSelection) {
    alert("최대 3명의 선수만 선택할 수 있습니다.");
    return;
  }

  if (selectedPlayers.includes(playerName)) {
    alert("이미 선택된 선수입니다.");
    return;
  }

  selectedPlayers.push(playerName);
  selectedOrder.push(playerName);

  // UI 업데이트: 선택한 선수 목록
  const playerButton = document.createElement("button");
  playerButton.textContent = playerName;
  playerButton.classList.add("selected-player-button");
  playerButton.addEventListener("click", () => {
    removePlayer(playerName);
  });
  selectedList.appendChild(playerButton);

  // 선택한 순서에 맞는 My_ 이미지를 추가
  const imgIndex = selectedOrder.indexOf(playerName);
  const img = document.createElement("img");
  img.src = predefinedImages[imgIndex];
  img.alt = playerName;
  img.dataset.playerName = playerName;
  selectedPhotosContainer.appendChild(img);
}

// 선수 제거 처리
function removePlayer(playerName) {
  // 선수 목록에서 제거
  selectedPlayers = selectedPlayers.filter((name) => name !== playerName);
  selectedOrder = selectedOrder.filter((name) => name !== playerName);

  // UI 업데이트: 선택한 선수 목록
  const playerButton = Array.from(selectedList.children).find(
    (button) => button.textContent === playerName
  );
  if (playerButton) {
    playerButton.remove();
  }

  // 선택된 선수 사진 컨테이너에서 해당 선수의 이미지 제거
  const photos = Array.from(selectedPhotosContainer.children);
  photos.forEach((photo) => {
    if (photo.dataset.playerName === playerName) {
      photo.remove();
    }
  });
}

// 사진 클릭 이벤트 연결 (togglePhotos 함수에서 사용)
function togglePhotos(buttonId, photos) {
  if (currentPhotos[buttonId]) {
    // 기존 사진 제거
    photoContainer.innerHTML = "";
    currentPhotos[buttonId] = false;
  } else {
    // 새로운 사진 표시
    photoContainer.innerHTML = "";
    photos.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.path; // 사진 경로
      img.alt = photo.name; // 선수 이름
      img.classList.add("player-photo");

      // 클릭 이벤트 추가
      img.addEventListener("click", () => selectPlayer(photo.name)); // playerName 전달

      const name = document.createElement("p");
      name.textContent = photo.name;
      name.style.marginTop = "5px";
      name.style.fontSize = "14px";

      const photoDiv = document.createElement("div");
      photoDiv.style.textAlign = "center";
      photoDiv.style.marginBottom = "10px";
      photoDiv.appendChild(img);
      photoDiv.appendChild(name);

      photoContainer.appendChild(photoDiv);
    });
    currentPhotos[buttonId] = true;
  }
}

// 버튼 이벤트 연결
document.getElementById("pitcherButton").addEventListener("click", () => {
  togglePhotos("pitcherButton", [
    { path: "/public/src/img/1.jpg", name: "문동주" },
    { path: "/public/src/img/10.jpg", name: "김기중" },
    { path: "/public/src/img/18.jpg", name: "이상규" },
    { path: "/public/src/img/26.jpg", name: "한승혁" },
    { path: "/public/src/img/27.jpg", name: "이민우" },
    { path: "/public/src/img/29.jpg", name: "황준서" },
    { path: "/public/src/img/36.jpg", name: "장민재" },
    { path: "/public/src/img/46.jpg", name: "이태양" },
    { path: "/public/src/img/47.jpg", name: "김범수" },
    { path: "/public/src/img/54.jpg", name: "김서현" },
    { path: "/public/src/img/58.jpg", name: "박상원" },
    { path: "/public/src/img/55.jpg", name: "와이스" },
    { path: "/public/src/img/66.jpg", name: "주현상" },
    { path: "/public/src/img/68.jpg", name: "조동욱" },
    { path: "/public/src/img/99.jpg", name: "류현진" },
  ]);
});

document.getElementById("catcherButton").addEventListener("click", () => {
  togglePhotos("catcherButton", [
    { path: "/public/src/img/13.jpg", name: "최재훈" },
    { path: "/public/src/img/42.jpg", name: "박상언" },
    { path: "/public/src/img/94.jpg", name: "허인서" },
  ]);
});

document.getElementById("infielderButton").addEventListener("click", () => {
  togglePhotos("infielderButton", [
    { path: "/public/src/img/8.jpg", name: "노시환" },
    { path: "/public/src/img/3.jpg", name: "안치홍" },
    { path: "/public/src/img/25.jpg", name: "김태연" },
    { path: "/public/src/img/7.jpg", name: "이도윤" },
    { path: "/public/src/img/95.jpg", name: "황영묵" },
  ]);
});

document.getElementById("outfielderButton").addEventListener("click", () => {
  togglePhotos("outfielderButton", [
    { path: "/public/src/img/41.jpg", name: "최인호" },
    { path: "/public/src/img/25.jpg", name: "김태연" },
    { path: "/public/src/img/45.jpg", name: "이진영" },
    { path: "/public/src/img/64.jpg", name: "문현빈" },
  ]);
});

document.getElementById("selectedPlayers").addEventListener("click", () => {
  console.log("선수 선택 버튼 클릭됨");
  // 원하는 동작을 추가하세요
});
