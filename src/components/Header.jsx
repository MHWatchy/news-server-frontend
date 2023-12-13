import { Link } from "react-router-dom"
import "../styles/Header.css"

const Header = () => {
  return (
    <section id="header">
      <Link to={"/"}>Home</Link>
      <Link to={"/user"}>User</Link>
    </section>
  )
}

export default Header
