import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import dotenv from 'dotenv';

import router from './router';

import connectDB from './db/configDB';

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

connectDB();

/**
 * Router
 */

app.use('/', router());
