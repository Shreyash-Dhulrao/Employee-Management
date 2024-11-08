import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, logout } from '../../firebase/Firebase'
import imgCropper from '../Employees/ImageCrop'


const Profile_A = () => {
      console.log(auth.currentUser)
    const navigate = useNavigate()
    const handleLogout = () => {
      logout(auth)
      console.log("User signed out successfully.");
      navigate("/" , {state: true});
      window.location.href = "/";
      window.location.reload();
    }
    
  return (
    <div>
        <div className='w-full bg-blue-300 p-5'>
          <Link to="/homepage">Homepage</Link>
        </div>
        <div>
          <div>
            
          </div>
        </div>
        <div className='bg-red-300'>
            <button onClick={handleLogout}>Logout Admin</button>
        </div>
    </div>
  )
}

export default Profile_A
