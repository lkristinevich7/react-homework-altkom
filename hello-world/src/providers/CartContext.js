import React, { useState, useEffect, useContext } from "react";
import { sessionContext } from "./SessionContext";

export const CartContext = React.createContext({
  items: [],
  addToCart: (product) => { },
  removeItem: (id) => { }
})

// interface CartItem {
//   id: number;
//   userId: number;
//   productId: number;
//   readonly product: Auction;
// }

// interface CartState {
//   items: CartItem[];
//   total: number
// }

const initialCart = {
  items: [], total: 0
}



const CartProvider = (props) => {

  const [cartState, setCartState] = useState(initialCart)

  const { sessionId, user } = useContext(sessionContext)

  useEffect(() => {
    fetchCartItems(user.id, sessionId)
      .then(cart_items => setCartState({
        ...cartState,
        items: cart_items
      }));
  }, [user.id])
  




  const addToCart = (product) => {
    if (cartState.items.find(p => p.id == product.id)) return
    createCartItem(product, sessionId).then(refreshItemsList)
  }

  const removeItem = (id) => {
    removeCartItem(id, sessionId).then(refreshItemsList)
  }

  return (
    <CartContext.Provider value={{
      items: cartState.items,
      addToCart,
      removeItem
    }
    }>
      {props.children}
    </CartContext.Provider>
  )


  function refreshItemsList() {
    fetchCartItems(user.id, sessionId)
      .then(cart_items => setCartState({
        ...cartState,
        items: cart_items
      }))
  }
}

export default CartProvider


function createCartItem(product, sessionId) {
  return fetch('http://localhost:9000/cart_items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: sessionId
    },
    body: JSON.stringify({
      productId: product.id
    })
  })
  .then(r => {
    if(r.status ===403) {
      alert('Auctions can be added only for authorozied custumers')
      
    } else {
      return r.json();;
    }
      
  })
}

function removeCartItem(itemId, sessionId) {
  return fetch('http://localhost:9000/cart_items/' + itemId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: sessionId
    }
  })
    .then(r => r.json())
}

function fetchCartItems(userId, sessionId) {
  return fetch('http://localhost:9000/cart_items?_expand=product&userId=' + userId, {
    headers: {
      Authorization: sessionId
    }
  }).then(r => r.json())
}

