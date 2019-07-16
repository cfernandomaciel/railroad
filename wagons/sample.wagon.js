const { InfluxConnector, KafkaConsumer } = require('@railroad/wagon');
const config = require('./../config');


const host = 'localhost';

let schemaName;
const dbName = 'traderfleet';

let consumer = null;
let Influx = null;

const SampleWagon = () => ({
  name: 'SampleWagon',
  init: () => {
    Influx = InfluxConnector.connect({ host, port: '8086', database: dbName });
    
    consumer = KafkaConsumer.init({
      kafkaHost: config.kafka.host,
      connectTimeout: config.kafka.timeout,
      autoConnect: config.kafka.autoConnect,
    });

    const topic = 'binance-trade';
    const partition = 0;

    consumer.listen({ topic, partition });

    consumer.on('error', (err) => {
      console.error(err);
    });

    consumer.on('message', (message) => {

      schemaName = topic.replace('-', '');

      const BinanceTradeSchema = {
        measurement: schemaName,
      };

      BinanceTradeSchema.tags = {
        offset: message.offset,
        partition: message.partition,
      };

      const messageData = JSON.parse(message.value);

      BinanceTradeSchema.fields = {
        value: JSON.stringify(messageData),
        time: messageData.T,
      };

      const points = [];
      points.push(BinanceTradeSchema);

      Influx.writePoints(points)
        .then(() => {
          console.log('success saving: ', points);
        })
        .catch((exception) => {
          console.error(exception);
        });
    });


  },
});

module.exports = SampleWagon;
