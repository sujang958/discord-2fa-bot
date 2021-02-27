const express = require('express');
const logger = require('morgan');
const compression = require('compression')
const log = require('./log');

// Variables
const PORT = process.env.PORT || 3000;
require('dotenv').config({ path: `./config.env` });

// Express
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(logger('dev'));
app.use(compression());


const authRouter = require('./router/authRouter');


app.get('/docs', (a, b) => {
    b.set('Cache-Control', 'public, max-age=300, smax-age=600');
    b.sendFile(__dirname+"/htmls/docs.html")
});
app.get('/auth', authRouter);
app.use((req, res, next) => {
    res.status(404).sendFile(`${__dirname}/public/404.html`);
});

require('./bot')();
app.listen(PORT, () => {
    log.web(`Web Server Listening on Port ${PORT}`)
});