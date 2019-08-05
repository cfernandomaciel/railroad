const { InfluxConnector, KafkaConsumer } = require('@railroad/wagon');

const configName = `./../config.${process.env.NODE_ENV}`;
const config = require(configName);

const SampleWagonInflux = () => ({
  name: 'SampleWagonInflux',
  init: (port) => {
    throw new Error('Unimplemented Wagon');
  },
});

module.exports = SampleWagonInflux;
