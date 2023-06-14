const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken');


const handleLogin = (req, res) => {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
        const formData = new URLSearchParams(body);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            let userLog = await user.getUserWithEmail(email);

            if (!userLog) {
                console.log("User doesn't exist");
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "User doesn't exist" }));
                return;
            }

            const passwordMatch = await bcrypt.compare(password, userLog.password);

            if (!passwordMatch) {
                console.log("Password is wrong");
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Invalid password" }));
                return;
            } else {
                const token = jwt.sign({ email }, "SuperSecretKey124", { expiresIn: "1h" });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ token }));
            }

        } catch (err) {
            console.error("Error handling login", err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }

    });
}

exports.handleLogin = handleLogin;