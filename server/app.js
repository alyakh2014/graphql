const express = require('express');
const graphHTTP = require('express-graphql');

const app = express();
app.use('/graphql', graphHTTP({}));
const PORT = 3005;

app.listen(PORT, err => {
    err? console.log(err) : console.log('Server started!');
});