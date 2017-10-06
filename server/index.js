const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');

const mongoose = require('./libs/mongoose')(config.get('config:mongoose'));

const http = require('http');
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(morgan('tiny'));

const account = require('./routes/account')(express);
app.use('/api/account', account);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    } else {
        res.status(err.status).json({ message: err.message });
    }
});

const port = config.get('config:port');

server.listen(port, e => {
    if (e) { console.log(e); }
    else { console.log('listening on port', port); }
});
module.exports = app;
