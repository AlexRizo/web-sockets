import express from "express";
import cors from "cors";
import http from "http";
import { Server as socketServer } from "socket.io";

import path from "path";
import { fileURLToPath, URL } from 'url';
import socketController from "../sockets/controller.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor() {
        this.app    = express();
        this._port  = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io     = new socketServer(this.server);
        this.paths  = {}

        // Middlewares;
        this.middlewares();
        
        // Rutas;
        this.routes();

        // Sockets;
        this.sockets();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        
        // Directorio public;
        this.app.use(express.static('public'));
    }

    routes() {        
        // this.app.get('*', (req, res) => {
        //     res.sendFile(path.join(__dirname, '../public', '404.html'));
        // });
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    start() {
        this.server.listen(this._port, () => {
            console.log('Running on port', this._port);
        });
    }
}

export default Server;