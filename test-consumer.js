/* DEPENDENCIES */

const kafka = require('kafka-node');

const TOPIC = 'test'
const DURATION = 10000

/* SETUP */

const Consumer = kafka.Consumer;
const client = new kafka.Client();
const consumer = new Consumer(
    client, [
        // { topic: 't', partition: 0 },
        // { topic: 't1', partition: 1 },
        { topic: TOPIC, partition: 0 },
    ], {
        autoCommit: false
    }
);

console.log(`LISTENING ON TOPIC=${TOPIC} FOR ${DURATION/1000} SECS...`);

/* SETUP LISTENERS */

consumer.on('message', message => {
    console.log('ON.MESSAGE:', message);
});

/* QUIT AFTER CERTAIN TIME */
setTimeout(() => {
    consumer.commit((err, data) => {
        if (err) {
            console.log('COMMIT FAILED:', err);
            process.exit(1);
        }
        console.log('COMMIT SUCCESS:', data);
        process.exit(0);
    });
}, DURATION);
