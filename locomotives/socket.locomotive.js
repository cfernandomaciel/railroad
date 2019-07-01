const config = require('./config');

const { SocketConnector, PubSubConnector, RPCConnector, KafkaProducer } = require('@railroad/locomotive');
const { Station } = require('@railroad/station');

const stationFile = require('./station');

const wssChannels = Station.load(stationFile).channels;
const topics = Station.load(stationFile).topics;

const { trade, candle, ticker, depth } = wssChannels;

let wssTrade  = null;
let wssCandle = null;
let wssTicker = null;
let wssDepth  = null;

let producer  = null;

let socketTrade   = null;
let socketCandle  = null;
let socketTicker  = null;
let socketDepth   = null;



const SocketLocomotive = () => ({
  init: () => {

    wssTrade  = new SocketConnector({ wss: trade });
    wssCandle = new SocketConnector({ wss: candle });
    wssTicker = new SocketConnector({ wss: ticker });
    wssDepth  = new SocketConnector({ wss: depth });
  
    producer  = new KafkaProducer({ host: config.kafka.host });
  
    socketTrade   = await wssTrade.connect();
    socketCandle  = await wssCandle.connect();
    socketTicker  = await wssTicker.connect();
    socketDepth   = await wssDepth.connect();

    socketTrade.on('message', (err, msg) => {
      if(err) throw err;
  
      let partition = 1;
      let topic = Station.extract(topics, msg, { partition });
  
      let result = await = producer.send(msg, topic);

      result.on(() => {

      });
  
    });
  
    socketTrade.on('error', (err) => {
      
      let partition = 10;
      let topic = Station.extractErrorTopic(topics, 'trade', { partition });
  
      producer.send(err, topic);
  
    });
  
    socketCandle.on('message', (err, msg) => {
      if(err) throw err;
  
      let partition = 1;
      let topic = Station.extract(topics, msg, { partition });
  
      producer.send(msg, topic);
  
    });
  
    socketCandle.on('error', (err) => {
      
      let partition = 10;
      let topic = Station.extractErrorTopic(topics, 'candle', { partition });
  
      producer.send(err, topic);
  
    });
  
    socketTicker.on('message', (err, msg) => {
      if(err) throw err;
  
      let partition = 1;
      let topic = Station.extract(topics, msg, { partition });
  
      producer.send(msg, topic);
  
    });
  
    socketTicker.on('error', (err) => {
      
      let partition = 10;
      let topic = Station.extractErrorTopic(topics, 'ticker', { partition });
  
      producer.send(err, topic);
  
    });
  
  
    socketDepth.on('message', (err, msg) => {
      if(err) throw err;
  
      let partition = 1;
      let topic = Station.extract(topics, msg, { partition });
  
      producer.send(msg, topic);
  
    });
  
    socketDepth.on('error', (err) => {
      
      let partition = 10;
      let topic = Station.extractErrorTopic(topics, 'depth', { partition });
  
      producer.send(err, topic);
  
    });

  },
});

module.exports = SocketLocomotive;