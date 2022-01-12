const path = require('path');
const http = require('http');

const { host, port } = require(path.join(__dirname, 'config'));

const server = http.createServer(require(path.join(__dirname, 'app')));

server.listen(port, host, () => {
    console.log(`Server běží na http://${host}:${port}...`);
});
