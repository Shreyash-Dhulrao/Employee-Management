import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, logout } from '../../firebase/Firebase'


const Profile_A = () => {
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
        <div>
            <button onClick={handleLogout}>Logout Admin</button>
        </div>
    </div>
  )
}

export default Profile_A
