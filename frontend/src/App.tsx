
import {  Route,Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Auth from "./Components/Auth"
import { ProtectedRoute } from "./Components/ProtectedRoute"
import ModalProvider from "./Context/ModalContext"
import { ContentTypeProvider } from "./Context/ContentTypeContext"
import Applayout from "./Components/Applayout"
import SharedContent from "./Components/SharedContent"


function App() {

  return (
    <Routes>
      <Route path={'/auth'} element={<Auth />}/>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ModalProvider>
              <ContentTypeProvider>
                <Applayout>
                  <Home />
                </Applayout>
              </ContentTypeProvider>
            </ModalProvider>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/content/:sharedContent"
        element={
          <ContentTypeProvider>
                <Applayout>
                  <SharedContent />
                </Applayout>
              </ContentTypeProvider>
        }
      />
    </Routes>
  )
}

export default App
