const { db } = require('../db');

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    // checking for invalid entries
    if(!product.name || !product.quantity || !product.price || typeof product.price !== 'number' 
    || typeof product.name !== 'string' || typeof product.quantity !== 'number') 
    return res.status(400).json({
      "message" : "Please check all details"
    }) 
    // checking for duplicate entries
    const [ status ] = await db.query(`SELECT * FROM products WHERE name = ?`, [product.name]);
    if(status.length !== 0) 
    return res.status(400).json({
      "message" : "Product details already exist"
    }) 
    // adding product details into the database products
    await db.query(`INSERT INTO products(name, quantity, price) VALUES(?, ?, ?)`, [product.name, product.quantity, product.price]);
    return res.status(200).json({
      "message" : "Product details added successfully"
    }) 
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      "message" : "Internal server error"
    }) 
  }
}

module.exports = createProduct;