import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import { AuthProvider } from "./utils/AuthContext"

function App() {

  return (
    <AuthProvider>
      <Header />
      <Outlet />
      <Footer />
  </AuthProvider>
  )
}


export default App