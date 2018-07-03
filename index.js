/* PRODUCER */
const kafka = require('kafka-node');
const argv = require('yargs').argv;

const user_msg = argv.msg || '<default msg>';

const FULL_MSG = user_msg + ' -- sent via Node JS @' + Date.now();
const TOPIC = argv.topic || 'test';

const Producer = kafka.Producer;
// const KeyedMessage = kafka.KeyedMessage;

const client = new kafka.Client();
const producer = new Producer(client);

// const km = new KeyedMessage('key', 'message');

const payloads = [
        { topic: TOPIC, messages: FULL_MSG, partition: 0 },
        // { topic: 'test', messages: ['NODE hello', 'world', km] }
    ];
    
console.log('TESTING W/ THE FF INPUTS:', {user_msg, TOPIC, FULL_MSG});
    
producer.on('ready', () => {
    producer.send(payloads, (err, data) => {
        if (err) {
            console.log('FAILED', err);
            process.exit(0);
        } 
        console.log('SUCCESS', data);
        process.exit(0);
    });
});
 
producer.on('error', (err) => {
    console.log('FAILED', err);
    process.exit(0);
});
