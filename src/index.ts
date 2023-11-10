import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

/**
 * Server
 */

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/**
 * DB
 */

const mongoURL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(mongoURL);
mongoose.connection.on('error', (error: Error) => console.log(error));
