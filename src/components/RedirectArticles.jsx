import { useEffect } from "react"
import { useNavigate } from "react-router"

const RedirectArticles = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate("/articles")
    },[])
}

export default RedirectArticles