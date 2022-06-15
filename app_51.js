const express = require('express'); 
const app = express();
var port = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose(); 
const DBPATH = 'bdcurrriculo.db'; 
app.use(express.static("."));
app.use(express.json());
app.get('/user1', (req, res) => {
res.statusCode = 200;
res.setHeader('Access-Control-Allow-Origin', '*');
var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM curriculobd';

db.get(sql, [], (err, row) => {
    if (err) {
    throw err;
    }
    res.json(row);
});
});

app.post('/register', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  sql = "INSERT INTO curriculobd (contrate_me, cep, estado, Login, Senha) VALUES ('" + req.body.contrate_me + "', '" + req.body.cep + "', '" + req.body.estado +  "', '" + req.body.Login + "','" + req.body.Senha + "')";
  console.log(sql);
  var db = new sqlite3.Database(DBPATH); 
  db.all(sql, [],  err => {
      if (err) {
          res.send(err);
      }
  });
  db.close(); 
  res.end();
});

app.listen(port, () => {
  console.log(`BD server running at :${port}/`);
});

