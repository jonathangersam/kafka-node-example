/* PRODUCER */
const kafka = require('kafka-node');

const Producer = kafka.Producer;
// const KeyedMessage = kafka.KeyedMessage;

const client = new kafka.Client();
const producer = new Producer(client);

// const km = new KeyedMessage('key', 'message');

const payloads = [
        { topic: 'test', messages: 'NODE hi', partition: 0 },
        // { topic: 'test', messages: ['NODE hello', 'world', km] }
    ];
    
producer.on('ready', () => {
    producer.send(payloads, (err, data) => {
        console.log(data, err);
    });
});
 
producer.on('error', (err) => {
    console.log(err);
});
