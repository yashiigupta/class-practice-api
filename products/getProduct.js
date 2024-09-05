const { db } = require('../db');

const getProduct = async (req, res) => {
  try {
    const [ result ] = await db.query(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    if(result.length == 0) return res.status(200).json({
      message: "Product does not exist"
    });
    else return res.status(200).json(result);
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

module.exports = getProduct;