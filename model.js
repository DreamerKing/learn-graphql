const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const conn = mongoose.createConnection('mongodb://localhost/graphql');

con.on('open', () => console.log('连接成功'));
conn.on('error', (err) => console.log(err));

