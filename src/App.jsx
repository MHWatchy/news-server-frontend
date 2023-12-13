import "./App.css"
import Header from "./components/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Article from "./components/Article"
import NoPath from "./components/NoPath"
import RedirectArticles from "./components/RedirectArticles"

function App() {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RedirectArticles />} />
          <Route path="/articles" element={<Home />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="*" element={<NoPath/>} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
