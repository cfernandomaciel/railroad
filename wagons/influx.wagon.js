
const { InfluxConnector, KafkaConsumer } = require('@railroad/wagon');
const { Station } = require('@railroad/station');

const config = require('./config');

const tradeModel  = require('./../models/trade');
const candleModel = require('./../models/candle');
const tickerModel = require('./../models/ticker');
const depthModel  = require('./../models/depth');

const stationFile = require('./station');

const topics = Station.load(stationFile).topics;

let consumer = null;
let Influx   = null;

let trade   = null;
let candle  = null;
let ticker  = null;
let depth   = null;


const InfluxWagon = () => ({
  init: () => {

    Influx = InfluxConnector.new({ host: config.influx.host, user: config.influx.user, pwd: config.influx.pwd });

    consumer = new KafkaConsumer({ host: config.kafka.host });

    trade   = await consumer.instanceOf(Station.extractSingle(topics, 'trade')).connect();
    // candle  = await consumer.instanceOf(Station.extractSingle(topics, 'candle')).connect();
    // ticker  = await consumer.instanceOf(Station.extractSingle(topics, 'ticker')).connect();
    // depth   = await consumer.instanceOf(Station.extractSingle(topics, 'depth')).connect();

    trade.on('message', (err, msg) => {

      Influx.write(tradeModel);

    });

    trade.on('error', (err) => {
      //DO Whatever necessary...
    });

    
  }
});

module.exports = InfluxWagon;


