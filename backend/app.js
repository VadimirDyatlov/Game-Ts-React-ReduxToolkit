require('dotenv').config();
const express = require('express');

const path = require('path');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

const setUpSocket = require('./setUpSocket');
const config = require('./config/configApp');
const { sequelize } = require('./db/models');

const authRouter = require('./routes/authRouter');
const gameRouter = require('./routes/gameRouter');
const upgradeRouter = require('./routes/upgradeRouter');
const settingsRouter = require('./routes/settingsRouter');
const statisticsRouter = require('./routes/statisticsRouter');
const indexRouter = require('./routes/indexRouter');

config(app, io);

app.use(express.static(path.resolve('public')));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/api/auth', authRouter);
app.use('/api/game', gameRouter);
app.use('/api/upgrade', upgradeRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/', indexRouter);

setUpSocket(io);
server.listen(process.env.PORT, async () => {
  console.log(`Сервер успешно запущен на ${process.env.PORT}`);
  try {
    await sequelize.authenticate();
    console.log('База данных успешно запущена');
  } catch (error) {
    console.error('Ошибка базы данных ', error);
  }
});
