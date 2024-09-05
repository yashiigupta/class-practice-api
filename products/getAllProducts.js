const { db } = require('../db');

const getAllProducts = async (req, res) => {
  try {
    const q = `SELECT * FROM products`;
    const [ result ] = await db.query(q);
    if(result.length == 0) res.status(200).json({
      message: "Products table is empty"
    });
    else res.status(200).json(result);
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

module.exports = getAllProducts;