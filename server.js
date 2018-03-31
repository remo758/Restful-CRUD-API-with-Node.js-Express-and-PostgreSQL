const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'romany',
    password: '',
    database: 'blog'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());
// get all posts
app.get('/posts', (req, res) => {
  db
    .select('*')
    .from('posts')
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('error'));
});
// add new post
app.post('/posts', (req, res) => {
  db('posts')
    .returning('*')
    .insert({
      title: req.body.title,
      des: req.body.des
    })
    .then(post => res.json(post))
    .catch(err => res.status(400).json('error'));
});
// get post page
app.get('/posts/:id', (req, res) => {
  db
    .select('*')
    .from('posts')
    .where({
      id: req.params.id
    })
    .then(post => {
      if (post.length) {
        res.json(post);
      } else {
        res.status(400).json('not found');
      }
    })
    .catch(err => res.status(400).json('error'));
});
// delete a post
app.delete('/posts/:id', (req, res) => {
  db('posts')
    .returning('*')
    .where({
      id: req.params.id
    })
    .del()
    .then(post => {
      if (post.length) {
        res.json(post);
      } else {
        res.status(400).json('not found');
      }
    })
    .catch(err => res.status(400).json('error'));
});
// update a post
app.put('/posts/:id', (req, res) => {
  db('posts')
    .returning('*')
    .where({
      id: req.params.id
    })
    .update({
      title: req.body.title,
      des: req.body.des
    })
    .then(post => {
      if (post.length) {
        res.json(post);
      } else {
        res.status(400).json('not found');
      }
    })
    .catch(err => res.status(400).json('error'));
});

app.listen(3000, () => {
  console.log('server is running on port 3000 ');
});
