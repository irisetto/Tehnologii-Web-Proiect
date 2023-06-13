const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
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
            if (existingUser) {
                console.log("Email already exists");
                res.statusCode = 302;
                res.setHeader("Location", "/register");
                res.end();
                return;
            }

            existingUser = await user.getUserWithPhonenumber(phoneNumber);
            if (existingUser) {
                console.log("Phone Number already exists");
                res.statusCode = 302;
                res.setHeader("Location", "/register");
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

            res.statusCode = 302;
            res.setHeader("Location", "/login");
            res.end();
        } catch (err) {
            console.error("Error handling registration", err);
            res.statusCode = 500;
            res.end();
        }
    });
}

exports.handleRegister = handleRegister;
