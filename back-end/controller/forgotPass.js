const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
let globalCode;
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
    globalCode=code;
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
            res.write('<script>alert("Codul introdus este greșit."); window.location.href = "/insertCode";</script>');
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