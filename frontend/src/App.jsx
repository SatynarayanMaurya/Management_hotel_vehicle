import Navbar from "./Components/Navbar"
import {Routes,Route} from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Hotels from "./Pages/Hotels"
import VehiclesPage from "./Pages/VehiclesPage"
import RegionPage from "./Pages/RegionPage"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import { useSelector } from "react-redux"
function App() {

  const token = useSelector((state)=>state.auth.token)
  return (
      <div>

        <div >
          {token && <Navbar/>}
        </div>

          <div className="w-10/12 mx-auto mt-4">
            <Routes>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/" element={token ? <Homepage/> : <LoginPage/>}/>
              <Route path="/hotels" element={ token ? <Hotels/> : <LoginPage/>}/>
              <Route path="/vehicles" element={token ? <VehiclesPage/> : <LoginPage/>}/>
              <Route path="/regions" element={token ? <RegionPage/> : <LoginPage/>}/>
            </Routes>
          </div>
      </div>
  )
}

export default App
