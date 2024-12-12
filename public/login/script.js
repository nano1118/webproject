console.log("script"); // 이 부분은 그대로 유지됩니다.

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // 기본 폼 제출 동작 방지

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/logincheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // 로그인 성공: 서버에서 /mypage로 리다이렉트 (res.redirect)
      // 여기서는 아무런 작업도 할 필요가 없습니다.
    } else {
      // 로그인 실패: 서버에서 /signup으로 리다이렉트 (res.redirect)
      // 만약, 오류 메시지를 표시하고 싶다면, 아래 주석 처리된 코드를 참고하세요.
      // const data = await response.json(); // JSON 응답 파싱 (서버에서 JSON 응답을 보내는 경우)
      // if (data.error) {
      //   alert(data.error); // 오류 메시지 표시
      // }
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});
