const { SocketConnector, KafkaProducer } = require('@railroad/locomotive');

const config = require('./../config');
const LineData = require('./../LineData');

const stationName = process.argv[2];

const trade = LineData.channels.filter(x => x.name === 'trade').map(x => x.host)[0].replace(/\<placeholder\>/gim, stationName.toLowerCase());

console.log('trade: ', trade);
let wssTrade = null;
let producer = null;

const tradeTopic = 'binance-trade';

const SampleLocomotive = () => ({
  name: 'SampleLocomotive',
  init: () => {

    wssTrade = SocketConnector.init({ wss: trade });

    producer = KafkaProducer.init({
      host: config.kafka.host,
      timeout: config.kafka.timeout,
      autoConnect: config.kafka.autoConnect,
      requireAcks: config.kafka.requireAcks,
      ackTimeoutMs: config.kafka.ackTimeoutMs,
      partitionerType: config.kafka.partitionerType,
    });

    wssTrade.connect();

    wssTrade.on('message', (message) => {

      const payloads = [
        {
          topic: tradeTopic,
          messages: message,
          partition: 0,
          timestamp: Date.now(),
        },
      ];

      producer.send(payloads);


    });

    wssTrade.on('error', (err) => {
      const payloads = [
        {
          topic: tradeTopic,
          messages: err,
          partition: 1,
          timestamp: Date.now(),
        },
      ];

      producer.send(payloads);
    });

    producer.on('ack', (message) => {
      console.log('ack: ', message);
    });

    producer.on('error', (err) => {
      console.error(err);
    });
  },
});

module.exports = SampleLocomotive;
