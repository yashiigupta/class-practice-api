const { db } = require('../db');

const getAllCart = async (req, res) => {
  try {
    const q = `SELECT * FROM cart`;
    const [ result ] = await db.query(q);
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

module.exports = getAllCart;