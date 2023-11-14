import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import dotenv from 'dotenv';

import router from './router';
import mongoose from 'mongoose';


/**
 * Server
 */

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/**
 * DB
 */

const MONGO_URL = process.env.MONGO_URL;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

/**
 * Router
 */

app.use('/', router());
