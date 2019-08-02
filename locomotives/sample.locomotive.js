const { SocketConnector, KafkaProducer } = require('@railroad/locomotive');

const LineName = process.argv[3] || 'sample-line';
const LineData = require(`./../LineData.${LineName}`);

const stationName = process.argv[2];
const sampleTopic = `${LineName}-samplegate`;

let producer = null;
let samplegate;
let wssSample = null;

const execute = ( { samplegate } ) => {

  /*
  // sample code for using socket connector and kafka producer
  wssSample = SocketConnector.init({ wss: samplegate.url, payload: samplegate.body });

  producer = KafkaProducer.init({
    host: config.kafka.host,
    timeout: config.kafka.timeout,
    autoConnect: config.kafka.autoConnect,
    requireAcks: config.kafka.requireAcks,
    ackTimeoutMs: config.kafka.ackTimeoutMs,
    maxAsyncRequests: 100,
    partitionerType: config.kafka.partitionerType,
  });

  wssSample.connect();
  wssSample.on('message', (message) => {

    const payloads = [
      {
        topic: sampleTopic,
        messages: message,
        partition: 0,
        timestamp: Date.now(),
      },
    ];

    producer.send(payloads);
  });

  wssSample.on('error', (err) => {
    const payloads = [
      {
        topic: sampleTopic,
        messages: err,
        partition: 1,
        timestamp: Date.now(),
      },
    ];
    console.log('error: ', err);
    producer.send(payloads);
  });

  producer.on('ack', (message) => {
    // console.log('ack: ', message);
  });

  producer.on('error', (err) => {
    console.error(err);
  });

  */

};

const SampleLocomotive = () => ({
  name: 'SampleLocomotive',
  init: (port) => {
    
    /*

    // code sample on how to call a serverless function that normalizes the 
    // LineData.sample-line.json file
    // then calls execute code

    const payload = {
      uri: `http://localhost:${port}/normalize/exchangewebsockets`,
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
