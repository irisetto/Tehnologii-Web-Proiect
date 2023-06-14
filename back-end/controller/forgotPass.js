
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { changePassword } = require("../models/userModel");
let globalCode;
let userEmail;
const handleSendCode = (req, res) => {
  if (req.url === "/api/code") {

    let body = "";

    req.on("data", (data) => {
      body += data;
    });

    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const email = formData.get("email");
      const code = generateRandomCode();
      console.log(code);
      console.log(email);
      globalCode = code;
      userEmail = email;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dmnzom@gmail.com",
          pass: "dbqyaqrxnpeufaiy",
        },
      });

      const mailOptions = {
        from: "dmnzom@gmail.com",
        to: email,
        subject: "Change Password Code",
        text: `Here is your code: ${code}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.writeHead(302, { Location: "/insertCode" });
      res.end();
    }

    );


  }
}
const handleInsertCode = (req, res) => {
  if (req.url === "/api/insertCode") {

    let body = "";

    req.on("data", (data) => {
      body += data;
    });

    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const insertedCode = formData.get("code");
      console.log(insertedCode);
      console.log(globalCode);


      if (insertedCode === globalCode) {
        // Codul introdus este corect
        res.writeHead(302, { 'Location': '/changePassword' });
        res.end();
      } else {
        // Codul introdus este greșit
        res.setHeader('Content-Type', 'text/html');
        res.write('<script>alert("Codul introdus este gresit."); window.location.href = "/insertCode";</script>');
        res.end();
      }
    }

    );
  }
}

const handleChangePass = (req, res) => {
  if (req.url === "/api/changePass") {
    let body = "";

    req.on("data", (data) => {
      body += data;
    });

    req.on("end", async () => {
      const formData = new URLSearchParams(body);
      const newPass = formData.get("new_password");
      const confirmPass = formData.get("confirm_password");


      if (newPass === confirmPass) {
        // parolele coincid
        const hashedPassword = await bcrypt.hash(newPass, 10);
        changePassword(hashedPassword, userEmail);
        res.writeHead(302, { 'Location': '/login' });
        res.end();
      } else {
        // parolele nu coincid
        res.setHeader('Content-Type', 'text/html');
        res.write('<script>alert("Parolele nu coincid."); window.location.href = "/changePassword";</script>');
        res.end();
      }
    }

    );
  }
}


function generateRandomCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

exports.handleSendCode = handleSendCode;
exports.handleInsertCode = handleInsertCode;
exports.handleChangePass = handleChangePass;