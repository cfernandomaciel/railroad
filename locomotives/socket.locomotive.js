
const { SocketConnector, PubSubConnector, RPCConnector, KafkaProducer } = require('@railroad/locomotive');
const { Station } = require('@railroad/station');
const config = require('./config');

const stationsFile = require('./stations');

const wssChannels = Station.load(stationsFile).channels;
const {topics} = Station.load(stationsFile);

const {
 trade, candle, ticker, depth 
} = wssChannels;

let wssTrade = null;
let wssCandle = null;
let wssTicker = null;
let wssDepth = null;

let producer = null;

let socketTrade = null;
let socketCandle = null;
let socketTicker = null;
let socketDepth = null;


const SocketLocomotive = () => ({
  init: () => {

    wssTrade = SocketConnector.init({ wss: trade });
    wssCandle = SocketConnector.init({ wss: candle });
    wssTicker = SocketConnector.init({ wss: ticker });
    wssDepth = SocketConnector.init({ wss: depth });
  
    producer = new KafkaProducer({ host: config.kafka.host });
  
    socketTrade = wssTrade.connect();
    socketCandle = wssCandle.connect();
    socketTicker = wssTicker.connect();
    socketDepth = wssDepth.connect();

    socketTrade.on('message', (err, msg) => {
      if (err) throw err;
  
      const partition = 1;
      const topic = Station.extract(topics, msg, { partition });
  
      producer.send(msg, topic);
      
    });
  
    socketTrade.on('error', (err) => {
      
      const partition = 10;
      const topic = Station.extractErrorTopic(topics, 'trade', { partition });
  
      producer.send(err, topic);
  
    });
  
    socketCandle.on('message', (err, msg) => {
      if (err) throw err;
  
      const partition = 1;
      const topic = Station.extract(topics, msg, { partition });
  
      producer.send(msg, topic);
  
    });
  
    socketCandle.on('error', (err) => {
      
      const partition = 10;
      const topic = Station.extractErrorTopic(topics, 'candle', { partition });
  
      producer.send(err, topic);
  
    });
  
    socketTicker.on('message', (err, msg) => {
      if (err) throw err;
  
      const partition = 1;
      const topic = Station.extract(topics, msg, { partition });
  
      producer.send(msg, topic);
  
    });
  
    socketTicker.on('error', (err) => {
      
      const partition = 10;
      const topic = Station.extractErrorTopic(topics, 'ticker', { partition });
  
      producer.send(err, topic);
  
    });
  
  
    socketDepth.on('message', (err, msg) => {
      if (err) throw err;
  
      const partition = 1;
      const topic = Station.extract(topics, msg, { partition });
  
      producer.send(msg, topic);
  
    });
  
    socketDepth.on('error', (err) => {
      
      const partition = 10;
      const topic = Station.extractErrorTopic(topics, 'depth', { partition });
  
      producer.send(err, topic);
  
    });

    producer.on('ack', (message) => {
      // acknowledge message threatment here
    });

    producer.on('error', (error) => {
      // error treatment here
    });


  },
});

module.exports = SocketLocomotive;
