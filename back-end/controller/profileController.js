const bcrypt = require('bcrypt');
const { changePassword } = require("../models/userModel");


const handleChangePasswordProfile = (req,res) => {
    if (req.url === "/api/changePasswordProfile") {
      let body = "";
      let jsonBody = "";
      req.on("data", (chunk) => {
        body += chunk;
        jsonBody = JSON.parse(body);
      });
    
      req.on("end", async () => {
        // Dacă prima parolă nu corespunde celei din baza de date
const errorPasswordMismatch = { error: 'Prima parolă introdusă nu corespunde parolei dumneavoastra.' };

// Dacă următoarele două parole nu coincid
const errorPasswordMismatchConfirm = { error: 'Cele două parole nu coincid.' };

        const currentPass = jsonBody.currentPass;
        const newPass = jsonBody.newPass;
        const confirmPass = jsonBody.confirmPass;

        const userPass = jsonBody.userPass;
        const userEmail = jsonBody.userEmail;

          const verifyComp = await bcrypt.compare(currentPass,userPass);
           
       if(verifyComp)
       {
        if (newPass === confirmPass) {
            // parolele coincid
           const hashedPassword = await bcrypt.hash(newPass, 10);
           changePassword(hashedPassword, userEmail);
           res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify( 'Cererea a fost realizată cu succes!'));
          } else {
            // parolele nu coincid
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(errorPasswordMismatchConfirm));
          }
        
  } else {
    //prima parola nu e a ta
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(errorPasswordMismatch));
  }
        }
    
        );
      }
}

exports.handleChangePasswordProfile = handleChangePasswordProfile;
