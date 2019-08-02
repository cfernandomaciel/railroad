const { TelegramMessenger, SlackMessenger, EmailMessenger } = require('@railroad/courier');

/*
const message = {
  messageTitle: 'Sample Courier Message', 
  messageIntro: 'Code Show for Courier Message',
  messageText: 'Sample message for courier usage',
};
*/


const SampleWagonCourier = () => ({
  name: 'SampleWagonCourier',
  init: (port) => {

    /*

    // sample code on how to use courier
    const telegramMessenger = TelegramMessenger.init();

    const telegramConfig = telegramMessenger.configureMessage(message);
    telegramMessenger.dispatch(telegramConfig);

    telegramMessenger.on('ack', (response) => {
      console.log('response: ', response);
    });

    telegramMessenger.on('error', (error) => {
      console.error('error: ', error);
    });
    */

    throw new Error('Unimplemented Wagon');
  },
});

module.exports = SampleWagonCourier;
