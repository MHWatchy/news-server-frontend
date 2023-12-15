import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import RedirectArticles from "./components/RedirectArticles"
import Home from "./components/Home"
import Article from "./components/Article"
import User from "./components/User"
import Login from "./components/Login"
import NoPath from "./components/NoPath"
import "./App.css"

function App() {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RedirectArticles />} />
          <Route path="/articles" element={<Home />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPath />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
