import React, { useState, useContext, useEffect, useRef } from 'react'
import AuctionCard from '../components/AuctionCard'
import { CartContext } from '../providers/CartContext'
import { useLocation, useHistory } from 'react-router-dom'

const AuctionsView = (props) => {
  const inputRef = useRef()
  const [auctions, setAuctions] = useState([])

  const {
    items,
    addToCart
  } = useContext(CartContext)

  // const s =   props.location.search
  const history = useHistory()
  const location = useLocation()
  const searchParamMap = new URLSearchParams(location.search);
  const query = searchParamMap.get('q')

  useEffect(() => {
    const params = query ? '?q=' + query : ''
    fetch('http://localhost:9000/products' + params).then(res => res.json())
      .then((products) => {
        setAuctions(products)
      })
  }, [query])


  function search(query) {
    console.log(history)
    // const s = props.histroy.push
    history.push({
      pathname: '/auctions', search: '?q=' + query
    })
  }

  return (
    <div>
      <div>
        <div className="row">
          <div className="col">
            <h1>Auctions</h1>

            <div className="input-group my-3">
              <input type="text" className="form-control" ref={inputRef} />
              <button onClick={() => inputRef.current && search(inputRef.current.value)}>Search</button>
            </div>

            <div className="card-group">
              {auctions.map(auction =>
                <AuctionCard
                  key={auction.id}
                  onAddToCart={addToCart}
                  auction={auction} />
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// AuctionsView.defaultProps = {
//   auctions: [
//     { id: 123, title: 'Test 123', descr: 'Opis', price: 120, image: 'https://i.picsum.photos/id/36/200/200.jpg' },
//     { id: 234, title: 'Test 234', descr: 'Opis', price: 140, image: 'https://i.picsum.photos/id/160/200/200.jpg' },
//     { id: 345, title: 'Test 345', descr: 'Opis', price: 150, image: 'https://i.picsum.photos/id/48/200/200.jpg' },
//   ]
// } as Partial<Props>

export default AuctionsView
