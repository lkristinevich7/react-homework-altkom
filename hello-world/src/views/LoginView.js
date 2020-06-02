
import React, { useState, useContext } from 'react'
import { sessionContext } from '../providers/SessionContext'





const LoginView = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setSesionId, setUser } = useContext(sessionContext)

  function doLogin(username, password) {
    fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        username, password
      })
    }).then(r => r.json()).then(resp => {
      setSesionId(resp.sessionid)
      setUser(resp.result)
    })
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Blog</h1>

          <input type="text" value={username} className="form-control"
            onChange={e => setUsername(e.target.value)} />

          <input type="password" value={password} className="form-control"
            onChange={e => setPassword(e.target.value)} />

          <button type="submit" onClick={() => doLogin(username, password)}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default LoginView
