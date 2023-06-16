const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllTickets = async (req, res) => {
  const tickets = await ticketModel.getAllTickets();
  if (!tickets) {
    res.end("Eroare la preluarea ticketelor!");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(tickets));
};

const getTicketById = async (req, res) => {
  const urlParts = req.url.split("/");
  const id = urlParts[3];
  const ticket = await ticketModel.getTicketById(id);
  if (!ticket) {
    res.end("NU exista ticket cu acest id!");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(ticket));
  if (req.method === "DELETE") {
    ticketModel
      .deleteTicketById(id)
      .then(() => {
        res.statusCode = 200;
        res.end("Ticket deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting ticket", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
};


const ticketsController = async (req, res) => {
  if (req.url === "/api/tickets") {
    getAllTickets(req, res);
  } else if (req.url.startsWith("/api/tickets/"))
   getTicketById(req, res);
   else {
    res.end("nu exista api pentru acest request");
  }
};

module.exports = ticketsController;
