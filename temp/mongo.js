const { MongoClient } = require('mongodb');
const url = 'mongodb://47.100.53.48:6666';

const dbName = 'test';
const client = new MongoClient(url, {useUnifiedTopology: true  });

const inserDouments = function(db, callback) {
    const c = db.collection('photos');
    c.deleteOne({ a: 1}, (err, result) => {
        console.log(result);
    });
    // c.insertMany([{
    //     a: 1
    // }], (err, result) => {
    //     callback(result);
    // });
}

client.connect(function(err, client) {
    console.log("connected successfully to server");
    const db = client.db(dbName);
    inserDouments(db, function(result) {
        console.log("result:", result);
        client.close();
    });
});

