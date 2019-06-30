const config = require('./config');

const { SocketConnector, PubSubConnector, RPCConnector, KafkaProducer, Station } = require('@railroad/locomotive');


const stationFile = require('./station');


const pubsubChannels = Station.load(stationFile).channels;
const topics = Station.load(stationFile).topics;

const { trade, candle, ticker, depth } = pubsubChannels;

let pubsubTrade   = null;
let pubsubCandle  = null;
let pubsubTicker  = null;
let pubsubDepth   = null;

let producer      = null;

let subscriberTrade   = null;
let subscriberCandle  = null;
let subscriberTicker  = null;
let subscriberDepth   = null;



const PubSubLocomotive = () => ({
  init: () => {

    pubsubTrade  = new PubSubConnector({ channel: trade });
    pubsubCandle = new PubSubConnector({ channel: candle });
    pubsubTicker = new PubSubConnector({ channel: ticker });
    pubsubDepth  = new PubSubConnector({ channel: depth });

    producer  = new KafkaProducer({ host: config.kafka.host });

    subscriberTrade   = await pubsubTrade.connect();
    subscriberCandle  = await pubsubCandle.connect();
    subscriberTicker  = await pubsubTicker.connect();
    subscriberDepth   = await pubsubDepth.connect();

    subscriberTrade.on('message', (err, msg) => {
      if(err) throw err;

      let partition = 1;
      let topic = Station.extract(topics, msg, { partition });

      producer.send(msg, topic);

    });

    subscriberTrade.on('error', (err) => {
      
      let partition = 10;
      let topic = Station.extractErrorTopic(topics, 'trade', { partition });

      producer.send(err, topic);

    });

    subscriberCandle.on('message', (err, msg) => {
      if(err) throw err;

      let partition = 1;
      let topic = Station.extract(topics, msg, { partition });

      producer.send(msg, topic);

    });

    subscriberCandle.on('error', (err) => {
      
      let partition = 10;
      let topic = Station.extractErrorTopic(topics, 'candle', { partition });

      producer.send(err, topic);

    });

    subscriberTicker.on('message', (err, msg) => {
      if(err) throw err;

      let partition = 1;
      let topic = Station.extract(topics, msg, { partition });

      producer.send(msg, topic);

    });

    subscriberTicker.on('error', (err) => {
      
      let partition = 10;
      let topic = Station.extractErrorTopic(topics, 'ticker', { partition });

      producer.send(msg, topic);

    });


    subscriberDepth.on('message', (err, msg) => {
      if(err) throw err;

      let partition = 1;
      let topic = Station.extract(topics, msg, { partition });

      producer.send(msg, topic);

    });

    subscriberDepth.on('error', (err) => {
      
      let partition = 10;
      let topic = Station.extractErrorTopic(topics, 'depth', { partition });

      producer.send(err, topic);

    });


  }
});

module.exports = PubSubLocomotive;