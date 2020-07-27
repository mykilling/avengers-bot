const { Telegraf } = require("telegraf");
const db = require("./db");

const bot = new Telegraf(process.env.BOT_TOKEN);

const welcomeMessage = `Welcome! Ako lang to ang Avengers-Telegram-Bot mo
Enjoy ka lang at sumaya!`;

const helpMessage = `Kelangang mo ba ng tulong sa Bot?
Ito ang mga listahan ng command!
/pasok - para mag log in
/labas - para mag log out
/assemble - para i-mention yung lahat ng naka log in`;

var userChat = [];
var userName = [];

bot.start(ctx => ctx.reply(welcomeMessage));

bot.help(ctx => ctx.reply(helpMessage));

bot.command("pasok@avengers_telegram_bot", async ctx => {
  var user = ctx.from.username;
  ctx.reply("Salamat sa pag click sa command @" + user);
  await db.remove({ user }, { multi: true });
  await db.insert({ user });
});

bot.command("labas@avengers_telegram_bot", async ctx => {
  var user = ctx.from.username;
  ctx.reply("Salamat sa lahat! Mamimiss ka namin @" + user);
  await db.remove({ user }, { multi: true });
});

bot.command("assemble@avengers_telegram_bot", async ctx => {
  console.log("yepey!");
  var user = ctx.from.username;
  ctx.reply("ASSEMBLE!");
  db.find({}, function(err, docs) {
    console.log("1");
  });
});
bot.startPolling();
