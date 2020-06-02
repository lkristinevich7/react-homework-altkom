

import React from 'react'
import { Link } from 'react-router-dom'


const AuctionCard = (props) => {
  return (
    <div className="card">
      <img src={props.auction.image} className="card-img-top" />
      <div className="card-body">

        <h5 className="card-title">
          <Link to={`/auctions/${props.auction.id}`}>
            {props.auction.title}
          </Link>
        </h5>

        {props.auction.descr}
        {props.auction.price}

        <button onClick={e => props.onAddToCart(props.auction)} className="float-right btn btn-success">
          + Add
        </button>
      </div>
    </div>
  )
}

export default AuctionCard
