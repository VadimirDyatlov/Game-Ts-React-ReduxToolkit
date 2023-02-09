const { Chat, User } = require('./db/models');

function setUpSocket(io) {
  io.on('connection', (socket) => {
    socket.on('get_message', async () => {
      const allMessage = await Chat.findAll({
        raw: true,
        include: {
          raw: true,
          model: User,
          attributes: ['name'],
        },
      });
      io.emit('send_message', allMessage);
    });

    socket.on('message', async ({ message, id }) => {
      const createMessage = await Chat.create({
        user_id: id,
        message,
      });
      const newMessage = await Chat.findOne({
        where: { id: createMessage.id },
        raw: true,
        include: {
          raw: true,
          model: User,
          attributes: ['name'],
        },
      });
      io.emit('new-message', newMessage);
    });
  });
}

module.exports = setUpSocket;
