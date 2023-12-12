import { Link } from "react-router-dom"
import "../styles/Header.css"

const Header = () => {
  return (
    <section id="header">
      <Link to={"/"}>Home</Link>
      <h1>User</h1>
    </section>
  )
}

export default Header
