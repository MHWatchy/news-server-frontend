import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const hardCodedUser = {
    username: "weegembump",
    name: "Gemma Bump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553",
  }
  const [user, setUser] = useState(hardCodedUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
