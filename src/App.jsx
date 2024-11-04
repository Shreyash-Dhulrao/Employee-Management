import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage"
import Navbar from "./components/Navbar/Navbar"
import Member from "./components/Employees/newMember"
import Profile_A from "./components/Profile_Admin/Profile_A"
import Profile_Emp from "./components/Profile_Emp/Profile_Emp"
import Department from "./components/Homepage/Department/Department"
import EmployeeData from "./components/Homepage/EmployeeData/EmployeeData"
import DepartmentData from "./components/Homepage/Department/DepartmentData"
import Work from "./components/Work/Work"

function App() {
  return (
    <BrowserRouter >
        <Routes>
          <Route path="/signup" element={<><Signup /></>}/>
          <Route path="/homepage" element={<><Navbar /><Homepage /></>}/>

          {/* ADD */}
          <Route path="/newMember" element={<><Member /></>}/>
          <Route path="/createDepartment" element={<><Department /></>}/>

          {/* WORK */}
          <Route path='/work' element= {<><Navbar /><Work /></>} />

          {/* DATA */}
          <Route path="/empData" element={<><Navbar /><EmployeeData /></>} />
          <Route path="/depData" element={<><Navbar /><DepartmentData /></>} />

          {/* AUTH */}
          <Route path="/profile_A" element={<><Profile_A /></>}/>
          <Route path="/profile_E" element={<><Profile_Emp /></>}/>
          <Route path="/" element={<><Login /></>}/>
        </Routes>
        </BrowserRouter>
  )
}

export default App
