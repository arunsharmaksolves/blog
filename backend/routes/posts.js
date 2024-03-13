const express = require('express');
const router = express.Router();
const pool = require('../database/db'); // Import your PostgreSQL connection pool
const verifyToken = require('../verifyToken');

// CREATE
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { title, desc, photo, username, userId, categories } = req.body;

    const newPost = await pool.query(
      'INSERT INTO posts (title, desc, photo, username, userId, categories) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, desc, photo, username, userId, categories]
    );

    res.status(200).json(newPost.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, desc, photo, username, userId, categories } = req.body;

    const updatedPost = await pool.query(
      'UPDATE posts SET title = $1, desc = $2, photo = $3, username = $4, userId = $5, categories = $6 WHERE id = $7 RETURNING *',
      [title, desc, photo, username, userId, categories, postId]
    );

    res.status(200).json(updatedPost.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;

    await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
    await pool.query('DELETE FROM comments WHERE postId = $1', [postId]);

    res.status(200).json('Post has been deleted!');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET POST DETAILS
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

    res.status(200).json(post.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET POSTS
router.get('/', async (req, res) => {
  const { search } = req.query;

  try {
    const searchFilter = search ? `WHERE title ILIKE '%${search}%'` : '';
    const posts = await pool.query(`SELECT * FROM posts ${searchFilter}`);

    res.status(200).json(posts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET USER POSTS
router.get('/user/:userId', async (req, res) => {
  try {
    const userPosts = await pool.query('SELECT * FROM posts WHERE userId = $1', [req.params.userId]);

    res.status(200).json(userPosts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
