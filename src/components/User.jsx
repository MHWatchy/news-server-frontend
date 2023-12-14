import { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import "../styles/User.css"
import { useNavigate } from "react-router"

const User = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogOut = () => {
    setUser()
    navigate("/login")
  }

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user])

  return (
    <>
      <section id="userSection">
        <img
          id="profilePictureFull"
          src={user.avatar_url}
          alt="user profile picture"
        />
        <p>{user.name}</p>
        <p>{user.username}</p>
      </section>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  )
}

export default User
