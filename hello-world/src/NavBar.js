import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from './providers/CartContext';
import { sessionContext } from './providers/SessionContext';

export const NavBar = () => {
  const { items } = useContext(CartContext)
  const { sessionId, user } = useContext(sessionContext)

  const logout= ()=>{
    localStorage.clear();
    window.location.href = '/';
  }

  return (<nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
    <div className="container">

      <a className="navbar-brand" href="#">Navbar</a>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/auctions">Auctions</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/auction_add">Add</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/blog">Blog</NavLink>
          </li>
          <li style={{ flex: '1 0 100%' }}></li>
          <li className="nav-item" style={{ whiteSpace: 'nowrap' }}>
            <NavLink className="nav-link" to="/cart">
              Koszyk {items.length !== 0 && `( ${items.length} )`}
            </NavLink>
          </li>
          {user ? <li className="nav-item" style={{ whiteSpace: 'nowrap' }}>
            <a className="nav-link" href="#">
              {user.name}
            </a>
          </li> : ''}
          {sessionId === '' ? <li className="nav-item">
            <NavLink className="nav-link" to="/login">Zaloguj</NavLink>
          </li> : <li className="nav-item">
              <NavLink onClick={logout} className="nav-link" to="/login">Wyloguj</NavLink>
            </li>}
        </ul>
      </div>
    </div>
  </nav>);
};
export default NavBar;
