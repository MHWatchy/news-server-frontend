import { useContext, useEffect, useState } from "react"
import { getUser } from "../utils/fetches"
import { useNavigate } from "react-router"
import { UserContext } from "../contexts/UserContext"
import "../styles/Login.css"

const Login = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [usernameInput, setUsernameInput] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const handleInputChange = (e) => {
    setUsernameInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsValidating(true)
    if (usernameInput === "") {
      setErrorText("Username required")
      setIsValidating(false)
    } else {
      getUser(usernameInput)
        .then((loginUser) => {
          setUser(loginUser.user)
          navigate("/user")
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            setErrorText("No connection")
          } else if (err.response.status === 404) {
            setErrorText("User does not exist")
          } else {
            setErrorText("Something went wrong")
          }
        })
        .finally(() => {
          setIsValidating(false)
        })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (user) {
      navigate("/user")
    }
    setIsLoading(false)
  }, [user])

  if (isLoading) return <h1 className="text loading">loading...</h1>

  return (
    <>
      <form onSubmit={handleSubmit} id="loginForm">
        <label className="text">
          Username:*{" "}
          <input
            id="usernameInput"
            type="text"
            placeholder="username... "
            value={usernameInput}
            onChange={handleInputChange}
          />
        </label>
        <button disabled={isValidating} className="text">
          Login
        </button>
      </form>
      {!errorText ? null : <p className="errorMessage">{errorText}</p>}
    </>
  )
}

export default Login
