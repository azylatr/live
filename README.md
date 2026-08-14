# Node Static Server

A lightweight, zero-dependency Node.js static file server built for fast HTML rendering and local web development. Supports HTTP/HTTPS, auto-detected LAN hosting, custom MIME mapping, and automatic browser launch on startup.
Key Features

 * HTTP & HTTPS Support: Toggle between HTTP and HTTPS using local SSL/TLS certificate keypairs.
 * Auto Browser Launch: Automatically opens your server address in the default browser upon startup (macOS, Windows, and Linux).
 * Static File Serving: Delivers web assets directly out of the /src directory.
 * Custom MIME Mapping: Configurable file extension handling via extension.json.
 * Default Index Resolution: Serves index.html automatically for root path (/) requests.
Project Structure
```sh
.
├── ssl/
│   ├── key.pem          # SSL Private Key (required if https: true)
│   └── cert.pem         # SSL Certificate Key (required if https: true)
├── src/
│   └── index.html       # Web root directory for your public files
├── extension.json       # Custom MIME type definitions
├── index.js             # Main server logic and configuration
├── package.json         # Node.js project manifest & scripts
└── README.md            # Project documentation
```

# Quick Start

1. Prerequisites
Make sure Node.js (v14+ recommended) is installed on your machine.
2. Configure MIME Extensions (extension.json)
Ensure extension.json exists in your root directory with standard file extension mappings:
```sh
{
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml"
}
```

3. Server Options (index.js)
Customize your server behavior using the Config object inside index.js:
`const fs = require('fs');`
```sh
const Config = {
    port: 8080,            // Server port
    host: IPReadyUsed(),   // Binds automatically to your LAN IP address
    https: true,           // Set to false for HTTP mode
    mime: require('./extension.json'),
    certificate: {
        key: fs.readFileSync('./ssl/key.pem'),
        cert: fs.readFileSync('./ssl/cert.pem')
    },
    index: ['index.html']  // Default entry files
};
```

4. Run the Server
Execute the development script:
```sh
npm run dev
```

Once initialized, the terminal will log your active address and launch your default web browser automatically.
