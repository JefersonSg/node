const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// redirecionamentos de css
app.use(express.static(__dirname + '/public'));
app.use(
  '/books/css',
  express.static(__dirname + '/public/css', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    },
  }),
);
app.use(
  '/books/edit/css',
  express.static(__dirname + '/public/css', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    },
  }),
);

app.use(
  '/books/scripts',
  express.static(__dirname + '/public/scripts', {
    setHeaders: (res, path) => {
      if (path.endsWith('.script')) {
        res.setHeader('Content-Type', 'text/scripts');
      }
    },
  }),
);
app.use(
  '/books/edit/scripts',
  express.static(__dirname + '/public/scripts', {
    setHeaders: (res, path) => {
      if (path.endsWith('.script')) {
        res.setHeader('Content-Type', 'text/scripts');
      }
    },
  }),
);

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `INSERT INTO books (??, ??) VALUE(?, ?)`;
  const data = ['title', 'pageqty', title, pageqty];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/books');
  });
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const books = data;

    res.render('books', { books });
  });
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  data = ['id', id];

  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];
    if (!book) {
      return res.render('404');
    }
    res.render('book', { book });
  });
});

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;

  const data = ['id', id];

  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];
    if (!book) {
      return res.render('404');
    }

    res.render('editbook', { book });
  });
});

app.post('/books/updatebook', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;

  const data = ['title', title, 'pageqty', pageqty, 'id', id];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect(`/books`);
  });
});
app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM books WHERE ?? =?`;
  const data = ['id', id];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect(`/books`);
  });
});

app.listen(3000);
