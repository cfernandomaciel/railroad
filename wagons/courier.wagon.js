
const { CourierConnector, KafkaConsumer } = require('@railroad/wagon');
// const { Station } = require('@railroad/station');

// const config = require('./config');

// const stationFile = require('./station');

// const topics = Station.load(stationFile).topics;

// let consumer = null;
// let Courier  = null;

// let trade   = null;
// let candle  = null;
// let ticker  = null;
// let depth   = null;


const CourierWagon = () => ({
  name: 'CourierWagon',
  init: () => {

    console.log('unimplemented module');
    // Courier = CourierConnector.new({ host: config.courier.host });
    // consumer = new KafkaConsumer({ host: config.kafka.host });

    // trade   = await consumer.instanceOf(Station.extractSingle(topics, 'trade')).connect();
    // // candle  = await consumer.instanceOf(Station.extractSingle(topics, 'candle')).connect();
    // // ticker  = await consumer.instanceOf(Station.extractSingle(topics, 'ticker')).connect();
    // // depth   = await consumer.instanceOf(Station.extractSingle(topics, 'depth')).connect();

    // trade.on('message', (err, msg) => {

    //   if(err) throw err;

    //   courier = await Courier.send(Station.extractSingle(topics, 'trade'), msg);

    //   courier.on('success', msg => console.log);
    //   courier.on('error', err => console.error);

    // });

    // trade.on('error', (err) => {
    //   //DO Whatever necessary...
    // });

    
  },
});

module.exports = CourierWagon;


