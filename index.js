const http = require('http')
const Bot  = require('messenger-bot')
const Client = require("node-rest-client").Client;
const client = new Client();


let bot = new Bot({
  token: 'EAAMF2ODv0ikBAGkHvcdo08wYRhOuF7PWmbpt6esQ1IZBS7ZAJCD8iJNIPMPddRa1HIURsa3ZByOXxdZCYMVZBkrmzjF0PfknYF6nsSozTNZAJhh2dujbwCh885fIDANGmhOwZCKYyaPja6S6zm3NalqYTwmYkzf3HEdZBIUbg2gpOAZDZD',
  verify: 'bitven_bot',
  //app_secret: 'd115119fae13ca7140d83ce2faf0a258'
})

bot.on('error', (err) => {
  console.log(err)
})

bot.on('authentication', (payload, reply) => {
  reply({ text: 'hey!'}, (err, info) => {})
})

bot.on('message', (payload, reply) => {
  console.log(payload.message)
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err
    switch (text) {
      case "precio surbitcoin":
        client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
            data = JSON.parse(data);
            var rate_vef = parseFloat(data.high) + parseFloat(data.low);
                rate_vef = rate_vef / 2;
            if(profile.first_name == "Doriam"){
              bot.sendMessage(payload.sender.id, { "text": "Hola, Mamaguevo! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "Bs. \n Precio de venta " + data.sell + "Bs. \n Precio Promedio " + rate_vef + "Bs." }, function(err){
                if (err) throw err;
              });
            }else{
              bot.sendMessage(payload.sender.id, { "text": "Hola, " + profile.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "Bs. \n Precio de venta " + data.sell + "Bs. \n Precio Promedio " + rate_vef + "Bs." }, function(err){
                if (err) throw err;
              });
            }
        });
        break;
      case "precio foxbit":
        client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
            data = JSON.parse(data);
            var rate_brl = parseFloat(data.high) + parseFloat(data.low);
                rate_brl = rate_brl / 2;
            if(profile.first_name == "Doriam"){
              bot.sendMessage(payload.sender.id, { "text": "Hola, Mamaguevo! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "R$ \n Precio de venta " + data.sell + "R$ \n Precio Promedio " + rate_brl + "R$" }, function(err){
                if (err) throw err;
              });
            }else{
              bot.sendMessage(payload.sender.id, { "text": "Hola, " + profile.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "R$ \n Precio de venta " + data.sell + "R$ \n Precio Promedio " + rate_brl + "R$" }, function(err){
                if (err) throw err;
              });
            }
        });
        break;
      case "precio bitfinex":
        client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
            var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                rate_usd = rate_usd / 2;
            if(profile.first_name == "Doriam"){
              bot.sendMessage(payload.sender.id, { "text": "Hola, Mamaguevo! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.bid + "$ \n Precio de venta " + data.ask + "$ \n Precio Promedio " + rate_usd + "$" }, function(err){
                if (err) throw err;
              });
            }else{
              bot.sendMessage(payload.sender.id, { "text": "Hola, " + profile.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.bid + "$ \n Precio de venta " + data.ask + "$ \n Precio Promedio " + rate_usd + "$" }, function(err){
                if (err) throw err;
              });
            }
        });
        break;

      case "precio ether":
        client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
          console.log(data);
          bot.sendMessage(payload.sender.id, { "text": "Hola, un ether cuesta lo siguiente: \n BTC: " + data.BTC_ETH.last + " btc \n Gracias por usar el bot" }, function(err){
            if (err) throw err;
          });
        });
        break;

      case "precio dao":
        client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
          console.log(data);
          bot.sendMessage(payload.sender.id, { "text": "Hola, un DAO cuesta lo siguiente: \n BTC: " + data.BTC_DAO.last + " btc \n Gracias por usar el bot" }, function(err){
            if (err) throw err;
          });
        });
        break;

      case "precio lisk":
        client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
          console.log(data);
          bot.sendMessage(payload.sender.id, { "text": "Hola, un lisk cuesta lo siguiente: \n BTC: " + data.BTC_LSK.last + " btc \n Gracias por usar el bot" }, function(err){
            if (err) throw err;
          });
        });
        break;
      default:

    }
  })
})

/*bot.on('postback', (payload, reply) => {
  reply({ text: 'hey!'}, (err, info) => {})
})*/

http.createServer(bot.middleware()).listen(30000)
console.log('Echo bot server running at port 30000.')
