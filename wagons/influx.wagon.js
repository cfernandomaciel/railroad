
const { InfluxConnector, KafkaConsumer } = require('@railroad/wagon');

// const { Station } = require('@railroad/station');

// const config = require('./config');

// const tradeModel  = require('./../models/trade');
// const candleModel = require('./../models/candle');
// const tickerModel = require('./../models/ticker');
// const depthModel  = require('./../models/depth');

// const stationFile = require('./station');

// const topics = Station.load(stationFile).topics;

const host = 'localhost';
let schemaName;
const dbName = 'traderfleet';


const config = { 
  host: 'kafka.dev.pipeleap.com:9092',
  connectTimeout: 1000,
  autoConnect: true,
  requireAcks: 1,
  ackTimeoutMs: 100,
  partitionerType: 0,
};

let consumer = null;
let Influx   = null;

let trade   = null;
// let candle  = null;
// let ticker  = null;
// let depth   = null;


const InfluxWagon = () => ({
  name: 'InfluxWagon',
  init: () => {

    Influx = InfluxConnector.connect({ host, port: '8086', database: dbName });
    

    consumer = KafkaConsumer.init({ 
      kafkaHost: config.host,
      connectTimeout: config.connectTimeout,
      autoConnect: config.autoConnect,
    });

    const topic = 'binance-trade';
    const partition = 0;

    consumer.listen({ topic, partition });

    consumer.on('error', (err) => {
      console.log('kafka consumer error: ', err);
    });

    consumer.on('message', (message) => {

      // const kafkaMessage = JSON.parse(message);
      const kafkaMessage = message;
    
      schemaName = topic.replace('-', '');
    
      const BinanceTradeSchema = {
        measurement: schemaName,
      };
    
      BinanceTradeSchema.tags = {
        offset: kafkaMessage.offset, 
        partition: kafkaMessage.partition, 
        highWaterOffset: kafkaMessage.highWaterOffset,
      };
    
      // const messageData = json.parse(kafkaMessage.value);
      const messageData = JSON.parse(kafkaMessage.value);
    
      BinanceTradeSchema.fields = {
        value: kafkaMessage.value,
        time: messageData.T,
      };
    
      const points = [];
      points.push(BinanceTradeSchema);
    
      Influx.writePoints(points)
        .then(() => {
          
          console.log('success saving...');
    
          // Influx.query(`select * from ${schemaName};`)
          //   .catch((err) => {
          //     console.log(err);
          //   })
          //   .then((results) => {
          //     res.json(results);
          //   });
        }).
        catch((exception) => {
          console.error(exception);
        })
    
    
      // console.log('kafka consumer message: ', JSON.parse(message));
    });

    
  }
});

module.exports = InfluxWagon;
