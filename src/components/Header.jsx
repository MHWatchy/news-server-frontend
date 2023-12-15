import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import "../styles/Header.css"

const Header = () => {
  const { user } = useContext(UserContext)
  const [userPath, setUserPath] = useState("/login")

  useEffect(() => {
    if (!!user) {
      setUserPath("/user")
    } else {
      setUserPath("/login")
    }
  }, [user])

  return (
    <section id="header">
      <Link to={"/"} className="text">
        Home
      </Link>
      <Link to={userPath} className="text">
        User
      </Link>
    </section>
  )
}

export default Header
