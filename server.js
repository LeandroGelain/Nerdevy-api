const http = require('http');
const app = require('./src/app');
const dotenv = require('dotenv');
dotenv.config()

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port)