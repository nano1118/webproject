const express = require("express");
const session = require("express-session");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = 8080; // 포트를 8080으로 설정

// Body Parser 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// 세션 설정
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// MongoDB 연결 URI 설정
const uri = "mongodb://localhost:27017/mydatabase";

// MongoDB 클라이언트 생성
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// MongoDB 연결 함수
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// MongoDB 연결
connectToMongo();

// 로그인 처리
app.post("/logincheck", async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = client.db("mydatabase");
    const users = db.collection("users");

    const user = await users.findOne({ username });
    if (user && user.password === password) {
      req.session.user = { username };
      return res.redirect("/mypage");
    } else {
      return res.redirect("/signup");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  }
});

// 회원가입 처리
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const db = client.db("mydatabase");
  const users = db.collection("users");

  try {
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists.");
    }

    const result = await users.insertOne({
      username,
      password,
    });

    if (result.insertedId) {
      return res.redirect("/mypage");
    } else {
      return res.status(500).send("Failed to register user.");
    }
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).send("Error during registration");
  }
});

// MY 페이지
app.get("/mypage", (req, res) => {
  if (req.session.user) {
    return res.sendFile(path.join(__dirname, "public/my/index.html"));
  } else {
    return res.redirect("/login");
  }
});

// 로그아웃 처리
app.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/login");
});

// 정적 파일 및 기타 라우트
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/home/index.html"));
});

app.get("/login", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/login/index.html"));
});

app.get("/signup", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/signup/index.html"));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
