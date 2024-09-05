const { db } = require('../db');

const deleteCart = async (req, res) => {
  try {
    const [ result ] = await db.query(`SELECT * FROM cart WHERE id = ?`, [req.params.id]);
    if(result.length === 0) 
    return res.status(400).json({
      message: "Cart to delete does not exist"
    })
    await db.query(`DELETE FROM cart WHERE id = ?`, [req.params.id]);
    res.status(200).json({
      message: "Cart deleted successfully"
    })
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

module.exports = deleteCart;