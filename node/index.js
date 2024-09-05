const express = require('express');
const mysql = require('mysql');
const faker = require('faker');

const app = express();
const PORT = 3000;

// Configuração do banco de dados
const pool = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
});

// Executa uma consulta SQL de maneira segura e assíncrona
function query(sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

// Insere um nome aleatório no banco e retorna esse nome
async function insertRandomName() {
  const randomName = faker.name.findName();
  await query('INSERT INTO people (name) VALUES (?)', [randomName]);
  console.log(`${randomName} inserted successfully in the database!`);
  return randomName;
}

// Obtém todos os nomes do banco e retorna em formato HTML
async function getAllNamesHtml() {
  const results = await query('SELECT name FROM people');
  let responseHtml = '<h1>Full Cycle Rocks!</h1>';
  results.forEach(person => {
    responseHtml += `<div> - ${person.name}</div>`;
  });
  return responseHtml;
}

// Rota principal
app.get('/', async (req, res) => {
  try {
    await insertRandomName();
    const responseHtml = await getAllNamesHtml();
    res.send(responseHtml);
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).send('Server Error');
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Application running on Port...: ${PORT} 🚀`);
});
