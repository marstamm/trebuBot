"use strict";

// include the node.js native http package
let http = require('http');
let https = require('https');

// Include TelegramBot package
let TelegramBot = require('node-telegram-bot-api');

// Telegram bot token (given when you create a new bot using the BotFather);
const BotToken = require('./token');
let chatId = 119468145;
// Telegram bot setup
let telegramBot = new TelegramBot(BotToken, {polling: false});

function replyToChat(message){
    //chatID has to be initialized, otherwise send to me
    telegramBot.sendMessage(chatId, message);
}

let commands = { 'xd': function(event, message, chatId)
                        {   let xd = ['x', 'd', 'X', 'D'];
                            if(
                                 !message.includes("xD") //Topkek bot already handles these
                              && !event.body.message.from.is_bot //we don't want the bots to battle
                              && event.body.message.from.username.localeCompare("Granor") != 0  //exclude Granor, he's nice
                            )
                            {
                              let reply = "x";
                              for(let i = 0; i < Math.random()*8; i++)
                              {
                                reply += xd[Math.round(Math.random()*3)];
                              }
                              reply += "D";
                              replyToChat(reply);
                            }
                        },
                'shut up': (event, message, chatId) => {
                        //thank yaber for this gem
                        replyToChat("hoalt dei fotzn du saupreiß");
                    },
                'catapult': (event, message, chatId) => {
                        replyToChat("Shut up, pleb. The trebuchet is the superior siege engine!");
                    },
                'katapult': (event, message, chatId) => {
                        replyToChat("Shut up, pleb. The trebuchet is the superior siege engine!");
                    },
                '/trebuchet': (event, message, chatId) => {
                        let memes = ["https://pics.me.me/does-he-still-love-me-he-used-to-bring-me-9875968.png", "http://pixel.nymag.com/imgs/daily/selectall/2016/11/17/trebuchet_01.nocrop.w710.h2147483647.2x.jpg","https://media0ch-a.akamaihd.net/62/83/69146c2381d9479072378c37c6eec1ba.jpg","http://www.comedycentral.co.uk/sites/default/files/styles/image-w-520-h-292-scale-crop/public/cc_uk/articles/2016/11/22/trebuchet-memes.png.jpg?itok=Vl99CSOK" ,"https://www.conanexiles.com/wp-content/uploads/sites/5/2017/03/Trebuchet-Demon-fire-Barrage1.jpg", "https://www.sciencebuddies.org/Files/6400/7/trebuchet-diagram.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Stirling_Warwolf_Trebuchet.jpg/220px-Stirling_Warwolf_Trebuchet.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Trebuchet_Castelnaud.jpg/1200px-Trebuchet_Castelnaud.jpg", "https://i.redd.it/brbxtnxhf81z.jpg", "https://i.redd.it/cvnnq858rquy.png", "https://i.redd.it/mucoiw11onkz.jpg", "https://i.imgur.com/S0prvkw.jpg", "https://i.redd.it/yrm4jflir1oz.jpg", "https://i.redd.it/dp3bdzsnt4oz.jpg", "https://i.imgur.com/5n0GRwW.jpg", "https://i.redd.it/ctd1nxq1vvpy.jpg"];
                        let reply = memes[Math.floor(Math.random()*memes.length)];
                        telegramBot.sendPhoto(chatId, reply);
                        return;
                    },
                '/beemovie': (event, message, chatId) => {
                    replyToChat("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Ooming! Hang on a second. Hello? - Barry? - Adam? - Oan you believe this is happening? - I can't. I'll pick you up. Looking sharp. Use the stairs. Your father paid good money for those.");
                }
            };

exports.handler = function(event, context, lambdaCallback) {

    // parse the chat ID so we can respond
    if (event.body.message && event.body.message.chat && event.body.message.chat.id) {
      chatId = event.body.message.chat.id;
    } else if (event.body.channel_post && event.body.channel_post.chat && event.body.channel_post.chat.id) {
      chatId = event.body.channel_post.chat.id;
    }
    else {
      return;
    }
    
    let message;
    if(event.body.channel_post && event.body.channel_post.text) {
        message = event.body.channel_post.text;
    } else if (event.body.message && event.body.message.text) {
      message = event.body.message.text;
    }
    else {
        return;
    }

    //parse message
    if (Math.random() < 0.001)
    {
      replyToChat("Bundesgrenzschutz, alles auf den Boden!");
      return;
    }

    for(let command in commands)
    {
        if(message.toLowerCase().includes(command))
        {
            commands[command](event, message, chatId);
        }
    }
    return;
}
