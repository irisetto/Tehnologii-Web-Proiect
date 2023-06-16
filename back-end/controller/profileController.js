const bcrypt = require("bcrypt");
const {
  changePassword,
  getUserWithEmail,
  changeFirstName,
  changeLastName,
  changeEmail,
  changePhoneNumber,
  changeOccupiedPosition,
  changeProfilePicture,
} = require("../models/userModel");
const {
  insertTicket
} = require("../models/ticketModel");
const jwt = require("jsonwebtoken");

const handleChangePasswordProfile = (req, res) => {
  if (req.url === "/api/changePasswordProfile") {
    let body = "";
    let jsonBody = "";
    req.on("data", (chunk) => {
      body += chunk;
      jsonBody = JSON.parse(body);
    });

    req.on("end", async () => {
      // Dacă prima parolă nu corespunde celei din baza de date
      const errorPasswordMismatch = {
        error: "Prima parolă introdusă nu corespunde parolei dumneavoastra.",
      };

      // Dacă următoarele două parole nu coincid
      const errorPasswordMismatchConfirm = {
        error: "Cele două parole nu coincid.",
      };

      const currentPass = jsonBody.currentPass;
      const newPass = jsonBody.newPass;
      const confirmPass = jsonBody.confirmPass;

      const userPass = jsonBody.userPass;
      const userEmail = jsonBody.userEmail;

      const verifyComp = await bcrypt.compare(currentPass, userPass);

      if (verifyComp) {
        if (newPass === confirmPass) {
          // parolele coincid
          const hashedPassword = await bcrypt.hash(newPass, 10);
          changePassword(hashedPassword, userEmail);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify("Cererea a fost realizată cu succes!"));
        } else {
          // parolele nu coincid
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify(errorPasswordMismatchConfirm));
        }
      } else {
        //prima parola nu e a ta
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(errorPasswordMismatch));
      }
    });
  }
};

const handleSaveInfo = (req, res) => {
  if (req.url === "/api/saveInfo") {
    let body = "";
    let jsonBody = "";
    req.on("data", (chunk) => {
      body += chunk;
      jsonBody = JSON.parse(body);
    });

    req.on("end", async () => {
      const first_name = jsonBody.first_name;
      const last_name = jsonBody.last_name;
      const email = jsonBody.email;
      const phone_number = jsonBody.phone;
      const occupied_position = jsonBody.position;
      
      //alta metoda de a prelua userul autentificat
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.decode(token);
      const userEmail = decodedToken.email;
      const user = await getUserWithEmail(userEmail);
      //
     // const formData = jsonBody.formData;
    //  await changeProfilePicture(imageBuffer,user.id);
  
      if (first_name.length>0) {
        changeFirstName(user.id, first_name);
      }

      if (last_name.length>0) {
        changeLastName(user.id, last_name);
      }

      if (email.length>0) {
        changeEmail(user.id, email);
      }

      if (phone_number.length>9) {
        changePhoneNumber(user.id, phone_number);
      }

      if (occupied_position.length>0) {
        changeOccupiedPosition(user.id, occupied_position);
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify("Informațiile au fost actualizate cu succes"));
    });
  }
};

const handleUpdateProfilePicture = (req, res) => {
  const chunks = [];

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", async () => {
    const byteArray = Buffer.concat(chunks);
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const userEmail = decodedToken.email;
    const user = await getUserWithEmail(userEmail);
    await changeProfilePicture(byteArray,user.id);

    res.statusCode = 200;
    res.end("Image received and processed successfully");
  });
}

const handleSubmitTicket= (req, res) => {
  if (req.url === "/api/submitTicket") {
    let body = "";
    let jsonBody = "";
    req.on("data", (chunk) => {
      body += chunk;
      jsonBody = JSON.parse(body);
    });

    req.on("end", async () => {
      const section = jsonBody.section;
      const manager = jsonBody.manager;
      const desc = jsonBody.desc;
      //alta metoda de a prelua userul autentificat
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.decode(token);
      const userEmail = decodedToken.email;
      const user = await getUserWithEmail(userEmail);
      //
     // const formData = jsonBody.formData;
    //  await changeProfilePicture(imageBuffer,user.id);
  
      
    insertTicket({
      section: section,
      manager: manager,
      desc: desc,
      userId: user.id
  });
      
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify("Informațiile au fost actualizate cu succes"));
    });
  }
};

exports.handleChangePasswordProfile = handleChangePasswordProfile;
exports.handleSaveInfo = handleSaveInfo;
exports.handleUpdateProfilePicture = handleUpdateProfilePicture;
exports.handleSubmitTicket = handleSubmitTicket;

