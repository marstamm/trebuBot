"use strict";

// include the node.js native http package
var http = require('http');
var https = require('https');

// Include TelegramBot package
var TelegramBot = require('node-telegram-bot-api');

// Telegram bot token (given when you create a new bot using the BotFather);
var BotToken = "465451620:AAFw87x9es0SPKM05rZ_KaRe9k6sL3MMDIk";

// Telegram bot setup
var telegramBot = new TelegramBot(BotToken, {polling: false});

exports.handler = function(event, context, lambdaCallback) {
    // parse the chat ID so we can respond

    var chatId = event.body.message.chat.id;

    // let them know we're working
    telegramBot.sendMessage(chatId, "I ain't doing shit");

}
