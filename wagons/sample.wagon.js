const { InfluxConnector, KafkaConsumer } = require('@railroad/wagon');


const SampleWagon = () => ({
  name: 'SampleWagon',
  init: () => {
    throw new Error('Unimplemented Wagon');
  },
});

module.exports = SampleWagon;
