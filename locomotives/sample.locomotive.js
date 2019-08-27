const Request = require('request-promise');
const { SocketConnector, KafkaProducer } = require('@railroad/locomotive');
const { SlackMessenger } = require('@railroad/courier');

const configName = `./../config.${process.env.NODE_ENV}`;
const config = require(configName);
const LineName = process.env.LINE;
const LineData = require(`./../LineData.${LineName}`);

const stationName = process.env.STATION;

let wssTrade = null;
let wssTicker = null;
let wssBookOrder = null;
let wssCandle = null;

let producer = null;

const tradeTopic = `${LineName}-trade`;
const tickerTopic = `${LineName}-ticker`;
const bookorderTopic = `${LineName}-bookorder`;
const candleTopic = `${LineName}-candle`;

const execute = ({
  trade, ticker, bookorder, candle,
}) => {

  // wssTrade = SocketConnector.init({ wss: trade.url, payload: trade.body });
  // wssTicker = SocketConnector.init({ wss: ticker.url, payload: ticker.body });
  // wssBookOrder = SocketConnector.init({ wss: bookorder.url, payload: bookorder.body });
  // wssCandle = SocketConnector.init({ wss: candle.url, payload: candle.body });

  // producer = KafkaProducer.init({
  //   host: config.kafka.host,
  //   timeout: config.kafka.timeout,
  //   autoConnect: config.kafka.autoConnect,
  //   requireAcks: config.kafka.requireAcks,
  //   ackTimeoutMs: config.kafka.ackTimeoutMs,
  //   maxAsyncRequests: 100,
  //   partitionerType: config.kafka.partitionerType,
  // });

  // // Trade
  // wssTrade.connect();
  // wssTrade.on('message', (message) => {

  //   const payloads = [
  //     {
  //       topic: tradeTopic,
  //       messages: message,
  //       partition: 0,
  //       timestamp: Date.now(),
  //     },
  //   ];

  //   // console.log(message);
  //   producer.send(payloads);


  // });

  // wssTrade.on('error', (err) => {
  //   const payloads = [
  //     {
  //       topic: tradeTopic,
  //       messages: err,
  //       partition: 1,
  //       timestamp: Date.now(),
  //     },
  //   ];
  //   console.log('error: ', err);
  //   producer.send(payloads);
  // });
  // // end Trade

  // // Book Order
  // wssBookOrder.connect();
  // wssBookOrder.on('message', (message) => {

  //   const payloads = [
  //     {
  //       topic: bookorderTopic,
  //       messages: message,
  //       partition: 0,
  //       timestamp: Date.now(),
  //     },
  //   ];
  //   // console.log(message);
  //   producer.send(payloads);

  // });

  // wssBookOrder.on('error', (err) => {
  //   const payloads = [
  //     {
  //       topic: bookorderTopic,
  //       messages: err,
  //       partition: 1,
  //       timestamp: Date.now(),
  //     },
  //   ];
  //   console.log('error: ', err);
  //   producer.send(payloads);
  // });
  // // end Book Order

  // // Ticker 
  // wssTicker.connect();
  // wssTicker.on('message', (message) => {

  //   const payloads = [
  //     {
  //       topic: tickerTopic,
  //       messages: message,
  //       partition: 0,
  //       timestamp: Date.now(),
  //     },
  //   ];
  //   // console.log(message);
  //   producer.send(payloads);


  // });

  // wssTicker.on('error', (err) => {
  //   const payloads = [
  //     {
  //       topic: tickerTopic,
  //       messages: err,
  //       partition: 1,
  //       timestamp: Date.now(),
  //     },
  //   ];
  //   console.log('error: ', err);
  //   producer.send(payloads);
  // });
  // // end Ticker

  // // Candle
  // wssCandle.connect();
  // wssCandle.on('message', (message) => {

  //   const payloads = [
  //     {
  //       topic: candleTopic,
  //       messages: message,
  //       partition: 0,
  //       timestamp: Date.now(),
  //     },
  //   ];
  //   // console.log(message);
  //   producer.send(payloads);


  // });

  // wssCandle.on('error', (err) => {
  //   const payloads = [
  //     {
  //       topic: candleTopic,
  //       messages: err,
  //       partition: 1,
  //       timestamp: Date.now(),
  //     },
  //   ];

  //   console.log('error: ', err);
  //   producer.send(payloads);
  // });
  // // end Candle

  // wssTrade.on('retry', (message) => {
    
  //   const appName = `${process.env.LINE}-${process.env.STATION}`;

  //   const courierMessage = {
  //     messageTitle: `${appName}`, 
  //     messageIntro: `${appName} socket host problem`,
  //     messageText: `The app ${appName} could not connect to given Socket address: ${trade.url}. Will retry in one minute again.`,
  //   };

    
  //   const slackMessenger = SlackMessenger.init(appName);

  //   const slackConfig = slackMessenger.configureMessage(courierMessage);
  //   slackMessenger.dispatch(slackConfig);

  // });

  // wssTicker.on('retry', (message) => {
  //   // console.log('will retry socket again...');

  //   const appName = `${process.env.LINE}-${process.env.STATION}`;

  //   const courierMessage = {
  //     messageTitle: `${appName}`, 
  //     messageIntro: `${appName} socket host problem`,
  //     messageText: `The app ${appName} could not connect to given Socket address: ${ticker.url}. Will retry in one minute again.`,
  //   };

    
  //   const slackMessenger = SlackMessenger.init(appName);

  //   const slackConfig = slackMessenger.configureMessage(courierMessage);
  //   slackMessenger.dispatch(slackConfig);

  //   // slackMessenger.on('ack', (response) => {
  //   //   console.log('response: ', response);
  //   // });
    
  //   // slackMessenger.on('error', (error) => {
  //   //   console.error('error: ', error);
  //   // });
  // });

  // wssBookOrder.on('retry', (message) => {
  //   // console.log('will retry socket again...');

  //   const appName = `${process.env.LINE}-${process.env.STATION}`;

  //   const courierMessage = {
  //     messageTitle: `${appName}`, 
  //     messageIntro: `${appName} socket host problem`,
  //     messageText: `The app ${appName} could not connect to given Socket address: ${bookorder.url}. Will retry in one minute again.`,
  //   };

    
  //   const slackMessenger = SlackMessenger.init(appName);

  //   const slackConfig = slackMessenger.configureMessage(courierMessage);
  //   slackMessenger.dispatch(slackConfig);

  //   // slackMessenger.on('ack', (response) => {
  //   //   console.log('response: ', response);
  //   // });
    
  //   // slackMessenger.on('error', (error) => {
  //   //   console.error('error: ', error);
  //   // });
  // });

  // wssCandle.on('retry', (message) => {
  //   // console.log('will retry socket again...');

  //   const appName = `${process.env.LINE}-${process.env.STATION}`;

  //   const courierMessage = {
  //     messageTitle: `${appName}`, 
  //     messageIntro: `${appName} socket host problem`,
  //     messageText: `The app ${appName} could not connect to given Socket address: ${candle.url}. Will retry in one minute again.`,
  //   };

    
  //   const slackMessenger = SlackMessenger.init(appName);

  //   const slackConfig = slackMessenger.configureMessage(courierMessage);
  //   slackMessenger.dispatch(slackConfig);

  //   // slackMessenger.on('ack', (response) => {
  //   //   console.log('response: ', response);
  //   // });
    
  //   // slackMessenger.on('error', (error) => {
  //   //   console.error('error: ', error);
  //   // });
  // });


  // producer.on('ack', (message) => {
  //   // console.log('ack: ', message);
  // });

  // producer.on('error', (err) => {
  //   console.error(err);
  // });

  
};

const SampleLocomotive = () => ({
  name: 'SampleLocomotive',
  init: (port) => {
    
    /*
    const payload = {
      uri: `${config.faas.host}/normalize/exchangewebsockets`,
      json: true,
      body: {
        gates: LineData.gates,
        station: stationName,
        desiredGates: ['candle', 'bookorder', 'ticker', 'trade'],
      },
    };

    Request.post(payload)
      .then((response) => {
        execute(response);
      })
      .catch((exception) => {
        console.error(JSON.stringify(exception));
        throw exception;
      });

    */
    throw new Error('Unimplemented Locomotive');
  },
});

module.exports = SampleLocomotive;
