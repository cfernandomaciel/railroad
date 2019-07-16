const { InfluxConnector, KafkaConsumer } = require('@railroad/wagon');


const SampleWagon = () => ({
  name: 'SampleWagon',
  init: () => {
    console.log('Running Wagon...');
  },
});

module.exports = SampleWagon;
