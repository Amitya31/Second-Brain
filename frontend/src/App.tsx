
import {  Route,Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Auth from "./Components/Auth"
import { ProtectedRoute } from "./Components/ProtectedRoute"
import ModalProvider from "./Context/ModalContext"
import { ContentTypeProvider } from "./Context/ContentTypeContext"
import Applayout from "./Components/Applayout"
import SharedContent from "./Pages/SharedContent"
import { Toaster } from "react-hot-toast"
import LandingPage from "./Pages/Landing"


function App() {

  return (
    <>
    <Toaster position="top-right" />

    <Routes>
      <Route path={"/auth"} element={<Auth />}/>
      <Route path={"/"} element={<LandingPage/>}/>

      <Route
        path="/Home"
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
            <ProtectedRoute>
                <SharedContent />
            </ProtectedRoute>
          </ContentTypeProvider>
        }
      />
    </Routes>
    </>
  )
}

export default App
