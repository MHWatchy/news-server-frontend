import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import "../styles/User.css"

const User = () => {
  const { user } = useContext(UserContext)
  return (
    <section id="userSection">
      <img id="profilePictureFull" src={user.avatar_url} alt="user profile picture"/>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </section>
  )
}

export default User
