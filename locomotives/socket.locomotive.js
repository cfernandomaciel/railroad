
const { SocketConnector, KafkaProducer } = require('@railroad/locomotive');
// const { Station } = require('@railroad/station');
// const config = require('./config');

// const stationsFile = require('./stations');

// const wssChannels = Station.load(stationsFile).channels;
// const {topics} = Station.load(stationsFile);

// const {
//  trade, candle, ticker, depth 
// } = wssChannels;
const trade = 'wss://stream.binance.com:9443/ws/ethbtc@trade';

let wssTrade = null;
// let wssCandle = null;
// let wssTicker = null;
// let wssDepth = null;

let producer = null;

// let socketTrade = null;
// let socketCandle = null;
// let socketTicker = null;
// let socketDepth = null;

const config = { 
  kafka: {
    host: 'kafka.dev.pipeleap.com:9092',
    timeout: 1000,
    autoConnect: true,
    requireAcks: 1,
    ackTimeoutMs: 100,
    partitionerType: 0,
  },
};

// TODO: further implement from here
const tradeTopic = 'binance-trade';

const SocketLocomotive = () => ({
  name: 'SocketLocomotive',
  init: () => {

    wssTrade = SocketConnector.init({ wss: trade });
    // wssCandle = SocketConnector.init({ wss: candle });
    // wssTicker = SocketConnector.init({ wss: ticker });
    // wssDepth = SocketConnector.init({ wss: depth });
  
    producer = KafkaProducer.init({ 
      host: config.kafka.host,
      timeout: config.kafka.timeout,
      autoConnect: config.kafka.autoConnect,
      requireAcks: config.kafka.requireAcks,
      ackTimeoutMs: config.kafka.ackTimeoutMs,
      partitionerType: config.kafka.partitionerType,
    });
  
    wssTrade.connect();
    // socketCandle = wssCandle.connect();
    // socketTicker = wssTicker.connect();
    // socketDepth = wssDepth.connect();

    wssTrade.on('message', (message) => {
      
      // const topic = Station.extract(topics, msg, { partition });

      const payloads = [
        {
          topic: tradeTopic,
          messages: message,
          partition: 0, // TODO: focus on here
          timestamp: Date.now(),
        },
      ];
      
  
      producer.send(payloads);
      
    });
  
    wssTrade.on('error', (err) => {
      
      // const topic = Station.extractErrorTopic(topics, 'trade', { partition });

      const payloads = [
        {
          topic: tradeTopic,
          messages: err,
          partition: 1, // TODO: focus on here
          timestamp: Date.now(),
        },
      ];
  
      producer.send(payloads);
  
    });
  
   
    producer.on('ack', (message) => {
      console.log('on ack: ', message);
      // acknowledge message threatment here
    });

    producer.on('error', (error) => {
      console.error('on error: ', error);
      // error treatment here
    });


  },
});

module.exports = SocketLocomotive;
