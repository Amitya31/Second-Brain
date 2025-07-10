
import { BrowserRouter, Route,Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Auth from "./Components/Auth"

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
         <Routes>
           <Route path={'/'} element={<Home/>} />
           <Route path={'/auth'} element={<Auth />}/>
         </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
