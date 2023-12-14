import { useContext, useEffect, useState } from "react"
import { getUser } from "../utils/fetches"
import { useNavigate } from "react-router"
import { UserContext } from "../contexts/UserContext"

const Login = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [usernameInput, setUsernameInput] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [errorText, setErrorText] = useState("")

  const handleInputChange = (e) => {
    setUsernameInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsValidating(true)
    getUser(usernameInput)
      .then((loginUser) => {
        console.log(loginUser)
        setUser(loginUser.user)
        navigate("/user")
      })
      .catch((err) => {
        console.log(err)
        setIsValidating(false)
        if (err.code === "ERR_NETWORK") {
          setErrorText("No connection")
        } else if (err.response.status === 404) {
          setErrorText("User does not exist")
        } else {
          setErrorText("Something went wrong")
        }
      })
  }

  useEffect(() => {
    if (user) {
      navigate("/user")
    }
  }, [user])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            id="usernameInput"
            type="text"
            placeholder="username... "
            value={usernameInput}
            onChange={handleInputChange}
          />
        </label>
        <button disabled={isValidating}>login</button>
      </form>
      {!errorText ? null : <p className="errorMessage">{errorText}</p>}
    </>
  )
}

export default Login
