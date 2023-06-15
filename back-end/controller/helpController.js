const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const handleHelp = (req, res) => {
  if (req.url === "/api/help") {
    let body = "";
    let jsonBody = "";
    req.on("data", (chunk) => {
      body += chunk;
      jsonBody = JSON.parse(body);
    });
  
    req.on("end", async () => {
      const email = jsonBody.email;
      const problem = jsonBody.problema;
      console.log(email, problem, "EMAIL+PROBLEMA");
  
      fs.appendFile(
        path.join(__dirname, "submissions.txt"),
        `Email: ${email}, Problem: ${problem}\n`,
        (err) => {
          if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
          } else {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "dmnzom@gmail.com",
                pass: "dbqyaqrxnpeufaiy",
              },
            });

            const mailOptions = {
              from: email,
              to: "dmnzom@gmail.com",
              subject: "New Problem Submission",
              text: `Email: ${email}\nProblem: ${problem}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });

            res.writeHead(200, { Location: "/help" });
            res.end();
          }
        }
      );
    });
  }
};

exports.handleHelp = handleHelp;
