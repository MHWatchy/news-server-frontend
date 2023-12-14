import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import "../styles/User.css"
import { useNavigate } from "react-router"

const User = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
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
        <p className="text">{user.name}</p>
        <p className="text">{user.username}</p>
        <button onClick={handleLogOut} className="text">
          Log Out
        </button>
      </section>
    </>
  )
}

export default User
