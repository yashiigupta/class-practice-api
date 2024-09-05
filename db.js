const sql = require('mysql2/promise');

const db = sql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "Vaiditya@2501",
  database: "classPractice"
})

// creating tables
const queryProducts = `CREATE TABLE IF NOT EXISTS products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  quantity INT NOT NULL,
  price INT NOT NULL
)`;

const queryCart = `CREATE TABLE IF NOT EXISTS cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT UNIQUE NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id),
  quantity INT NOT NULL
)`;

function createTable(query) 
{
  return new Promise((res, rej) => {
    db.query(query, (err, result) => {
      if(err) rej(err);
      else{
        console.log("Table created successfully")
        res(result);
      }
    })
  })
}

// createTable(queryCart);
// createTable(queryProducts);

module.exports = { db };
