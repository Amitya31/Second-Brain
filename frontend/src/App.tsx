
import {  Route,Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Auth from "./Components/Auth"
import { ProtectedRoute } from "./Components/ProtectedRoute"
import ModalProvider from "./Context/ModalContext"


function App() {

  return (
    <Routes>
      <Route path={'/auth'} element={<Auth />}/>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ModalProvider>
              <Home />
            </ModalProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
