
var Botkit = require('./node_modules/botkit/lib/Botkit.js');
var request = require('request');

var app_name = 'iic3103bot'
var worfram_api = 'UV3P9L-A758J78AVY';

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: 'xoxb-208918658098-GDElqKpL3eDzFcMN4npXG1Aa'
}).startRTM();

var OPEN_WHETER = 'http://api.openweathermap.org/data/2.5/weather?APPID=338cddbec27596cee5bf2495bf40cad0&q=';



controller.hears(['hola', 'hacer', 'ayuda'], 'direct_message,direct_mention,mention', function(bot, message) {
    var helloText = "Olá, humano, perguntame por el clima en alguna ciudad y te lo digo!";

    bot.reply(message, helloText);
});

controller.hears(['tchau'], 'direct_message,direct_mention,mention', function(bot, message) {
    var helloText = "Já está indo?";

    bot.reply(message, helloText);
});


controller.hears(['clima', 'tiempo'], 'direct_message,direct_mention,mention', function(bot, message) {
    var responseText = "Olá, humano, como posso ajudar?";


    var words = message.text.split(" ");
    var last = words[words.length-1];
    var last2 = message.text.split(' ').splice(-1)[0];

    var responseText = "El clima en " + last + " es ";


    var result = null;

    request({url: 'http://api.openweathermap.org/data/2.5/weather?APPID=338cddbec27596cee5bf2495bf40cad0&q='+last, json: true}, function(err, res, json) {

        if (err) {
            throw err;
        }

        var clima = json.weather[0].description;

        responseText = responseText + clima;

        console.log(responseText);
        bot.reply(message, responseText);
    });


});
