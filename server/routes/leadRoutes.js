
const express = require("express");
const router = express.Router();

const {
  getLeads,
  createLead,
  deleteLead,
} = require("../controllers/leadController");

router.get("/", getLeads);
router.post("/", createLead);
router.delete("/:id", deleteLead);

module.exports = router;
