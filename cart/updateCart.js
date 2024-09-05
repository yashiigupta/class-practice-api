const { db } = require('../db');

const updateCart = async (req, res) => {
  try {
    const cart = req.body;
    const [ result ] = await db.query(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    if(result.length === 0) 
    return res.status(400).json({
      message: "Product to update does not exist"
    })

    const [ resultCart ] = await db.query(`SELECT * FROM cart WHERE product_id = ?`, [req.params.id]);
    if(resultCart.length === 0) 
    return res.status(400).json({
      message: "Cart to update does not exist"
    })

    const newCart = {...result[0], ...cart};

    // checking for availability of stock
    const [ ans ] = await db.query(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    const quantityToCheck = ans[0].quantity;
    if(quantityToCheck < newCart.quantity) 
    return res.status(400).json({
      message: "Required quantity is out of stock"
    })

    await db.query(`UPDATE cart SET quantity = ?`, [newCart.quantity]);
    res.status(200).json({
      message: "Cart updated successfully"
    })
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

module.exports = updateCart;