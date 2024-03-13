const pool = require('../index.js');

const PostSchema = {
  title: {
    type: 'VARCHAR(255)',
    notNull: true,
    unique: true,
  },
  description: {
    type: 'TEXT',
    notNull: true,
    unique: true,
  },
  photo: 'VARCHAR(255)',
  username: {
    type: 'VARCHAR(255)',
    notNull: true,
  },
  userId: {
    type: 'VARCHAR(255)',
    notNull: true,
  },
  categories: {
    type: 'TEXT[]',
  },
  likes: {
    type: 'VARCHAR(255)[]',
    references: 'User(id)',
  },
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
};

module.exports = PostSchema;
