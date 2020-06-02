
import React, { useContext } from 'react'
import { CartContext } from '../providers/CartContext'


const CartView = (props) => {

  const {
    items,
    removeItem
  } = useContext(CartContext)


  return (
    <div>
      <h1>Cart</h1>

      <div className="list-group my-3">
        {items.map(item => <div className="list-group-item" key={item.id}>
          <button className="close" onClick={() => removeItem(item.id)}>&times;</button>
          <h5>{item.product.title}</h5>
          <p>{item.product.descr} - {item.product.price}</p>
        </div>)}
      </div>

      <div className="d-flex mt-3">
        <button className="btn btn-danger">Wyczyść koszyk</button>
        <div className="w-auto"></div>
        <button className="btn btn-success">Zamów</button>
      </div>
    </div>
  )
}

export default CartView
