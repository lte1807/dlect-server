const express = require("express");
const axios = require("axios");
const cors = require("cors");
const querystring = require("querystring");

const app = express();
const port = 3000;

//cors 설정
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

app.post("/api/refresh_token", async (req, res) => {
  try {
    const response = await axios.post(
      `https://therain0517.cafe24api.com/api/v2/oauth/token`,
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: "IQ19EXJJKhCl3TclkoPKvD",
        redirect_uri: "https://therain0517.cafe24.com/test.html",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic c2xuRjF5ZXVIcTJjdG9XMjdlbzF5Rjo5cEtzNTFCYktGbXF3bVhIc3BZWWVH",
        },
      }
    );

    // Cafe24 API의 응답을 클라이언트로 반환
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error refreshing token:", error);
    res
      .status(500)
      .json({ message: "Error refreshing token", error: error.message });
  }
});

// app.get("/api/products", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://therain0517.cafe24api.com/api/v2/admin/products",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer tB1JFrcJFRCknUsylUGJhD",
//         },
//       }
//     );

//     // Cafe24 API의 응답을 클라이언트로 반환
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching products", error: error.message });
//   }
// });

// Express 서버 실행
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
