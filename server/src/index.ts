import express, { Express, Request, Response } from 'express';
import { Phone } from './types';
import cors from 'cors';
import path from 'path';
import phones from '../data/phones.json';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

const PORT = process.env.PORT || 4002;
const client = new MongoClient('mongodb+srv://Adrian:Mongocrud2022@crud.j0ehphe.mongodb.net/?retryWrites=true&w=majority');

const SortBy = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

const start = async () => {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    await client.db().createCollection('users');
    const users = client.db().collection('users');
    await users.insertOne({ name: 'Adrian', age: 25 });
  } catch(err) {
    console.log(err);
  }
};

start();

const app: Express = express();

app.use(cors());

app.use('/', (req, res, next) => {

  next();
  app.use(express.json());
});

app.listen(PORT, () => {
  // open(`http://localhost:${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
