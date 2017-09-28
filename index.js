"use strict";

// include the node.js native http package
var http = require('http');
var https = require('https');

// Include TelegramBot package
var TelegramBot = require('node-telegram-bot-api');

// Telegram bot token (given when you create a new bot using the BotFather);
const BotToken = require('./token');

// Telegram bot setup
var telegramBot = new TelegramBot(BotToken, {polling: false});

exports.handler = function(event, context, lambdaCallback) {

    // parse the chat ID so we can respond
    let chatId;
    if (event.body.message && event.body.message.chat && event.body.message.chat.id) {
      chatId = event.body.message.chat.id;
    } else if (event.body.channel_post && event.body.channel_post.chat && event.body.channel_post.chat.id) {
      chatId = event.body.channel_post.chat.id;
    }
    else if () {
      return;
    }

    //parse message
    let message;
    let lowerCaseMessage;
    let reply;

    if (event.body.channel_post && event.body.channel_post.text) {
      message = event.body.channel_post.text;
      lowerCaseMessage = message.toLowerCase();
    } else if (event.body.message && event.body.message.text) {
      message = event.body.message.text;
      lowerCaseMessage = message.toLowerCase();
    }

    if((Math.random() < 0.001))
    {
      reply = "Bundesgrenzschutz, alles auf den Boden!";
    }

    if(lowerCaseMessage.includes("xd"))
    {
      var xd = ['x', 'd', 'X', 'D'];
      if(
           !message.includes("xD") //Topkek bot already handles these
        && !event.body.message.from.is_bot //we don't want the bots to battle
        && event.body.message.from.username.localeCompare("Granor") != 0  //exclude Granor, he's nice
      )
      {
        reply = "x";
        for(var i = 0; i < Math.random()*8; i++)
        {
          reply += xd[Math.round(Math.random()*3)];
        }
        reply += "D";
        telegramBot.sendMessage(chatId, reply);
        return;
      }
    }

    if(lowerCaseMessage.includes("shut up"))
    {
      //thank yaber for this gem
      reply = "hoalt dei fotzn du saupreiß";
    }

    if( lowerCaseMessage.includes("catapult") || lowerCaseMessage.includes("katapult"))
      reply = "Shut up, pleb. The trebuchet is the superior siege engine!";

    if(message.localeCompare("/trebuchet") == 0)
    {
      var memes = ["https://i.redd.it/brbxtnxhf81z.jpg", "https://i.redd.it/cvnnq858rquy.png", "https://i.redd.it/mucoiw11onkz.jpg", "https://i.imgur.com/S0prvkw.jpg", "https://i.redd.it/yrm4jflir1oz.jpg", "https://i.redd.it/dp3bdzsnt4oz.jpg", "https://i.imgur.com/5n0GRwW.jpg", "https://i.redd.it/ctd1nxq1vvpy.jpg", "http://i.imgur.com/OLJ3aaG.gifv"];
      reply = memes[Math.floor(Math.random()*memes.length)];
    }

    if(message.localeCompare("/beemovie") == 0)
    {
      reply = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Ooming! Hang on a second. Hello? - Barry? - Adam? - Oan you believe this is happening? - I can't. I'll pick you up. Looking sharp. Use the stairs. Your father paid good money for those.";
    }


    if(reply)
    {
      telegramBot.sendMessage(chatId, reply);
    }

}
