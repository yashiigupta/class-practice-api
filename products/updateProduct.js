const { db } = require('../db');

const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    const [ toChange ] = await db.query(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    if(toChange.length === 0) 
    return res.status(200).json({
      message: "Product to update does not exist"
    })
    const updatedProduct = { ...toChange[0], ...product };
    await db.query(`UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?`, [updatedProduct.name, updatedProduct.quantity, updatedProduct.price, updatedProduct.id]);
    return res.status(200).json({
      message: "Product details updated successfully"
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

module.exports = updateProduct;