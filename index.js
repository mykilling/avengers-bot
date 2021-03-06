const { Telegraf } = require("telegraf");

const Datastore = require("nedb");
var db = new Datastore({ filename: "database", autoload: true });

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
  console.log(ctx.message.chat.type);
  if (ctx.message.chat.type != 'private'){
    ctx.reply("Salamat sa pag click sa command @" + user);
    await db.remove({ user }, { multi: true });
    await db.insert({ user });
  }
});

bot.command("labas@avengers_telegram_bot", async ctx => {
  var user = ctx.from.username;
  if (ctx.message.chat.type != 'private'){
    ctx.reply("Salamat sa lahat! Mamimiss ka namin @" + user);
    await db.remove({ user }, { multi: true });
  }
});

bot.command("assemble@avengers_telegram_bot", async ctx => {
  var user = ctx.from.username;
  if (ctx.message.chat.type != 'private'){  
    ctx.reply("ASSEMBLE!");
    db.find({})
      .sort({ user: 1 })
      .exec(function(err, docs) {
        docs.forEach(function(d) {
          userChat.push("@" + d.user);
        });
        ctx.reply(userChat);
        console.log(userChat);
      });
  }
});
bot.startPolling();
