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

    //parse message
    let message;
    if (event.body.channel_post && event.body.channel_post.text) {
      message = event.body.channel_post.text;
    } else if (event.body.message && event.body.message.text) {
      message = event.body.message.text;
    }


    let reply;
    if(message.toLowerCase().includes("xd"))
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
      }
    }

    if(message.toLowerCase().includes("shut up"))
    {
      //thank yaber for this gem
      reply = "hoalt dei fotzn du saupreiß";
    }

    //Only send a message when one of the cases is fullfiled
    if(reply)
      telegramBot.sendMessage(chatId, reply);
}
