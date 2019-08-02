const { InfluxConnector, KafkaConsumer } = require('@railroad/wagon');


const SampleWagonInflux = () => ({
  name: 'SampleWagonInflux',
  init: (port) => {
    throw new Error('Unimplemented Wagon');
  },
});

module.exports = SampleWagonInflux;
