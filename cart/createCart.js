const { db } = require('../db');

const createCart = async (req, res) => {
  try {
    const cart = req.body;
    const product_id = req.params.id;
    if(!cart.quantity || typeof cart.quantity !== 'number') return res.status(400).json({
      message: "Please check your details"
    })
    const [ isThere ] = await db.query(`SELECT * FROM products WHERE id = ?`, [product_id]);
    if(isThere.length === 0) 
    return res.status(400).json({
      message: "Product does not exist"
    })
    const [ inOrder ] = await db.query(`SELECT * FROM cart WHERE product_id = ?`, [product_id]);
    if(inOrder.length !== 0)
    return res.status(400).json({
      message: "Cart already exists"
    })
    const [ ans ] = await db.query(`SELECT * FROM products WHERE id = ?`, [product_id]);
    const quantityToCheck = ans[0].quantity;
    if(quantityToCheck < cart.quantity) 
    return res.status(400).json({
      message: "Required quantity is out of stock"
    })
    await db.query(`INSERT INTO cart(product_id, quantity) VALUES(?, ?)`, [product_id, cart.quantity]);
    return res.status(200).json({
      message: "Cart created successfully"
    })
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

module.exports = createCart;