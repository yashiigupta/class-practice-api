const { db } = require('../db');

const getCart = async (req, res) => {
  try {
    const [ result ] = await db.query(`SELECT * FROM cart WHERE id = ?`, [req.params.id]);
    if(result.length == 0) res.status(200).json({
      message: "carts table is empty"
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

module.exports = getCart;