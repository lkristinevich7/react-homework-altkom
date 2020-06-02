

import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../providers/CartContext'


const AuctionDetailView = (props) => {
  const {
    items,
    addToCart
  } = useContext(CartContext)

  const onAddToCart = (id) => { }
  const [product, setAuctions] =  useState([])


  // const id = props.match.params.id; // Only when inRoute
  const { id } = useParams()

  useEffect(() => {
    fetch('http://localhost:9000/products/' + id)
      .then(res => res.json())
      .then((product) => {
        setAuctions(product)
      })
  }, [id])

  return (
    <div>
      <div className="row">
        <div className="col">
          <img src={product.image} className="w-200" />

        </div>
        <div className="col">
          <h5 className="card-title">
            {product.title} {id}
          </h5>

          {product.descr}
          {product.price}

          <button onClick={e => addToCart(product)}
            className="float-right btn btn-success">
            + Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuctionDetailView
