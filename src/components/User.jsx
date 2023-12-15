import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../contexts/UserContext"
import "../styles/User.css"

const User = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  const handleLogOut = () => {
    setUser()
    navigate("/login")
  }

  useEffect(() => {
    setIsLoading(true)
    if (!user) {
      navigate("/login")
    }
    setIsLoading(false)
  }, [user])

  if (isLoading) return <h1 className="text loading">loading...</h1>

  return (
    <>
      <section id="userSection">
        <img
          id="profilePictureFull"
          src={user.avatar_url}
          alt="user profile picture"
          className="text"
        />
        <p id="realName" className="text">
          {user.name}
        </p>
        <p id="username" className="text">
          {user.username}
        </p>
        <button onClick={handleLogOut} id="logOutButton" className="text">
          Log Out
        </button>
      </section>
    </>
  )
}

export default User
