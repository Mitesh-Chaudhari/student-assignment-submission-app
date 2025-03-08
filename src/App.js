import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import AssignmentList from "./pages/AssignmentList"
import AssignmentDetail from "./pages/AssignmentDetail"
import { AssignmentProvider } from "./context/AssignmentContext"
import "./styles/App.css"

function App() {
  return (
    <AssignmentProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<AssignmentList />} />
              <Route path="/assignment/:id" element={<AssignmentDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AssignmentProvider>
  )
}

export default App

