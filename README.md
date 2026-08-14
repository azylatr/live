# Simple Node.js Static File Server

A simple static file server built with Node.js, supporting HTTP/HTTPS and serving files from the `src/` directory. It also tries to open a *browser* automatically when launched.

## Key Features

- **HTTP/HTTPS Support:** Use `http` or `https` module based on configuration.
- **Static File Serving:** Serve static files from the `/src` directory.
- **Automatic Browser Launch:** Automatically open server URL after *startup* (supported on macOS, Windows, and Linux).
- **Default Index File:** By *default*, it will look for `index.html` if the requested *path* is `/`.

## Installation

1.  **Make sure Node.js is installed** on your system.
2.  **Create the following directory structure**:
    ```
    .
    ├── ssl/
    │   ├── key.pem  # Your SSL Key
    │   └── cert.pem # Your SSL Certificate
    ├── extension.json # MIME extension files
    ├── src/
    │   └── index.html # Your content files
    ├── package.json
    ├── extension.json
    ├── README.md
    └── index.js # Your main server code
    ```
3.  **Add MIME** file (`extension.json`).
4.  **Add SSL keys and certificates** in the `ssl/` directory (if `https` is enabled).
5.  **Run the server:**
    ```bash
    npm run dev
    ```

## Configuration

You can customize server settings through objects `Config` in `index.js`.

```javascript
const Config = {
    port: 8080, // Server port
    host: IPReadyUsed(), // Host address, automatically filled with LAN IP
    https: true, // true for HTTPS, false for HTTP
    mime: require('./extension.json'),
    certificate: {
        key: fs.readFileSync('./ssl/key.pem'),
        cert: fs.readFileSync('./ssl/cert.pem')
    },
    index: ['index.html'], // The default file to be served
};
```