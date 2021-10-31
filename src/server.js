const path = require('path');
const http = require('http');

const app = require(path.join(__dirname, 'app'));

const server = http.createServer(app);

const { port, hostname } = require(path.join(__dirname, 'config'));

server.listen(port, hostname, () => {
    console.log(`Server běží na http://${hostname}:${port}...`);
});
