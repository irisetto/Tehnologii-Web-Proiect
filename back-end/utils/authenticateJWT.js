const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);

    if (!token || token === "") {
      console.error("Empty token");
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized" }));
    } else {
      jwt.verify(token, "SuperSecretKey124", (err) => {
        if (err) {
          console.error("JWT verification failed:", err);
          res.writeHead(403, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Forbidden" }));
        } else {
          console.log("JWT verified successfully-:");
          const decodedToken = jwt.decode(token);

          if (!decodedToken || !Object.prototype.hasOwnProperty.call(decodedToken, "email")) {
            console.error("User data not found in the JWT");
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Forbidden" }));
          } else {
            req.user = decodedToken;
            next();
          }
        }
      });
    }
  } else {
    console.error("No JWT token found in the request headers");
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Unauthorized" }));
  }
};

module.exports = authenticateJWT;
