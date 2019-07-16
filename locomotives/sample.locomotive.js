const { SocketConnector, KafkaProducer } = require('@railroad/locomotive');

const SampleLocomotive = () => ({
  name: 'SampleLocomotive',
  init: () => {
    console.log('initializing locomotive...');
    // throw new Error('Unimplemented Locomotive');
  },
});

module.exports = SampleLocomotive;
