const express = require('express');
const graphHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb://alyakh2014:Sophia1953@cluster0-shard-00-00-gttq2.mongodb.net:27017,cluster0-shard-00-01-gttq2.mongodb.net:27017,cluster0-shard-00-02-gttq2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const PORT = 3005;

app.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}));

//Connect to DB
const dbConnection = mongoose.connection;
dbConnection.on('error', err=>console.log(`Connection error: ${err}`));
dbConnection.once('open', ()=>console.log(`Connected to DB`));

app.listen(PORT, err => {
    err? console.log(err) : console.log('Server started!');
});