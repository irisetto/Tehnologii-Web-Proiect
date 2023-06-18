const bcrypt = require('bcrypt');
const user = require('../models/userModel');

const handleRegister = async (req, res) => {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
        const formData = new URLSearchParams(body);
        const firstName = formData.get('first_name');
        const lastName = formData.get('last_name');
        const email = formData.get('email');
        const phoneNumber = formData.get('phone_number');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm_password');
        const position = formData.get('position');

        try {
            let existingUser = await user.getUserWithEmail(email);

            if(password != confirmPassword) {
                console.log("Passwords don't match");

                // res.setHeader("Location", "/register");
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end();
                return;
            }

            if (existingUser) {
                console.log("Email already exists");

                // res.setHeader("Location", "/register");
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end();
                return;
            }

            existingUser = await user.getUserWithPhonenumber(phoneNumber);
            if (existingUser) {
                console.log("Phone Number already exists");

                res.writeHead(400, { "Content-Type": "application/json" });
                //res.setHeader("Location", "/register");
                res.end();
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await user.insertUser({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                password: hashedPassword,
                position: position,
            });
            console.log("User inserted successfully");

            res.writeHead(200, { "Content-Type": "application/json" });

            res.end();
        } catch (err) {
            console.error("Error handling registration", err);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end();
        }
    });
}

exports.handleRegister = handleRegister;
