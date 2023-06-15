const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const setPreferredTheme = async (req, res) => {
    try {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const requestBody = JSON.parse(body);
            const decodedToken = jwt.decode(token);

            //console.log(requestBody);
            //console.log(decodedToken);

            const email = decodedToken.email;
            const mode = requestBody.theme;

            if (!mode) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: false, message: "Missing mode" }));
                return;
            }

            await user.setPreferredMode(email, mode);

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
        });
    } catch (err) {
        console.error("Error setting preferred theme", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(
            JSON.stringify({ success: false, message: "Internal server error" })
        );
    }
};

const settingsController = async (req, res) => {
    if (req.url === "/api/theme") {
        setPreferredTheme(req, res);
    } else {
        res.end("No settings here");
    }
};

module.exports = settingsController;
