import { useState } from "react"
import React from "react"

export const sessionContext = React.createContext({
  sessionId: '',
  setSesionId: (id) => { },
  user: null,
  setUser(user) { }
})

export const SessionProvider = (props) => {
  const [sessionId, setSesionId] = useState('')
  const [user, setUser] = useState('')

  return <sessionContext.Provider value={{ sessionId, setSesionId, user, setUser }}>
    {props.children}
  </sessionContext.Provider>
}