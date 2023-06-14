const jwt = require("jsonwebtoken");

const handleVerifyRequest = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    if (token === "null") {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result: false }));
    } else if (!token || token === "") {
      console.error("Empty token");
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result: false }));
    } else {
      jwt.verify(token, "SuperSecretKey124", (err) => {
        if (!err) {
          console.log("JWT verified successfully:");
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ result: true }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ result: false }));
        }
      });
    }
  } else {
    console.error("No JWT token found in the request headers");
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ result: false }));
  }
};

module.exports = handleVerifyRequest;
