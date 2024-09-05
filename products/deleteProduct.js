const { db } = require('../db');

const deleteProduct = async (req, res) => {
  try {
    const [ result ] = await db.query(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    if(result.length == 0) return res.status(200).json({
      message: "Product to delete does not exist"
    });
    await db.query(`DELETE FROM products WHERE id = ?`, [req.params.id]);
    return res.status(200).json({
      message: "Product deleted successfully"
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

module.exports = deleteProduct;