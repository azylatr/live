/**
 * @copyright 2022 and 2025, author (darmawn)
 * @version 0.10.5
 * @public
 */
"use strict";

const fs = require('fs'),
      path = require('path'),
      url = require('url'),
      { exec } = require('child_process'),
      os = require('os'); // Import from dependency


// Take a port for (LAN) connection with IPv4, with the same network support
function IPReadyUsed() {
    const _interface = os.networkInterfaces();
    return Object.values(_interface)
        .flat()
        .find((_if) => {
            return _if?.family === 'IPv4' &&! _if?.internal;
        })?.address || '127.0.0.1';
}


/**
 * @typedef {object} Config
 * Global configuration settings for the application and server.
 *
 * @property {number} port - The server port.
 * @property {string} host - The host address.
 * @property {boolean} https - Set to true to enable HTTPS.
 * @property {object} certificate - SSL key and certificate paths.
 * @property {string} certificate.key - The path to the SSL key file.
 * @property {string} certificate.cert - The path to the SSL certificate file.
 * @property {Array<string>} index - Default index files to serve.
 */
const Config = {
    port: 8080,
    host: IPReadyUsed(),
    https: true, // Set to true for HTTPS, false for HTTP
    mime: require('./extension.json'),
    certificate: {
        key: fs.readFileSync('./ssl/key.pem'),
        cert: fs.readFileSync('./ssl/cert.pem')
    },
    index: ['index.html'],
};


// Select HTTP or HTTPS dependency based on Config
const conn = Config?.https ? require('https') : require('http');


let Is = conn.createServer(Config?.certificate, 
    function(req, res) {
    let _ = url.parse(req.url, true);

    // Get the file path (HTML) for a web browser file, serving a static file index
    const filePath = path.join(__dirname, 'src', _.pathname === '/' ? Config?.index[0] : _.pathname);
    const extname = String(path.extname(filePath)).toLowerCase();
    const extension = Config?.mime[extname] || 'application/octet-stream';


    /**
     * @description Set up server connection if there
     * is an error or bug, support server above version
     * @private
     */
    /**
     * Callback function executed after attempting to read the file.
     *
     * @param {Error|null} err - Error object if the file read failed, otherwise null.
     * @param {Buffer} data - The contents of the file as a Buffer if the read was successful.
     */
    fs.readFile(filePath, function(err, data) {
        switch (true) {
            case err === null:
                //  No error on the server, hosting the file
                res.writeHead(200, {
                    'Content-Type': extension
                });
                res.end(data, 'utf8');
                break;
            case err && err.code === 'ENOENT':
                // Hosted file not found (404)
                res.writeHead(404);
                res.end('(i), Hosted file (index) not found!');
                break;
            case err:
                // Server-side error (500)
                res.writeHead(500);
                res.end(err?.stack, 'utf8');
                break;
            default:
                return null;
        }
    });
})


Is.listen({ port: Config?.port }, function() {
    // Get current project url
    const url = (Config?.https ? 'https' : 'http') + '://' + Config?.host + ':' + Config?.port;

    console.table([{ 'url': url }]);

    // Open the link in 'CLI' to your browser directly, make sure the URL used is correct. Start to open browser
    const command = process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
            ? 'start'
            : 'xdg-open';

    // Command and URL execution
    return exec(`${command} ${url}`); 
});


