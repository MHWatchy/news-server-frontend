import "./App.css"
import Header from "./components/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Comments from "./components/Comments"

function App() {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Home />} />
          {/* temporay path for development */}
          <Route path="/articles/:article_id/comments" element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
