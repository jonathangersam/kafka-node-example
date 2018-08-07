const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);

const TOPICS = ['topic1']
const WAIT_TIME_MS = 5000

// Create topics sync
setTimeout(() => {
    producer.createTopics(TOPICS, false, function (err, data) {
    if (err) {
        console.log('FAILED TO CREATE TOPICS', TOPICS, err)
        process.exit(1)
    }
    console.log('SUCCESSFULLY CREATED TOPICS', TOPICS, data);
})    
}, WAIT_TIME_MS)