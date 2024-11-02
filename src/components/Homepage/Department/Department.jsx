import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {newDashboard} from '../../../Redux/Files/Dashboard'
import { useDispatch } from 'react-redux'

const Department = () => {
    const dispatch = useDispatch()
    const [Name, setName] = useState("")
    const [Type, setType] = useState("Software")
    const handleSubmit =(e)=>{
        e.preventDefault();
        let a = {
            name: Name,
            department: Type,
        }
        console.log(a)
        dispatch(newDashboard(a))
        alert("form submitted");
    }
  return (
    <div>
      <div className='bg-zinc-100 dark:bg-zinc-900 w-full min-h-screen flex flex-col items-center justify-start font-noto gap-5 py-3'>
        <div>
            <h2 className='text-2xl font-semibold dark:text-white'>Department Details</h2>
        </div>
        <form onSubmit={handleSubmit} className='bg-zinc-50 dark:bg-zinc-800 dark:text-white gap-3 w-1/2 h-auto flex flex-col p-3 rounded-lg'>
            <input type="text" placeholder='Name of Department' value={Name} onChange={(e) => setName(e.currentTarget.value)} className=' px-3 py-2 outline-none border-b border-zinc-400 bg-transparent'/>
            <label className="text-sm mb-2 cursor-pointer" htmlFor="gender" value={Type} onChange={(e) => setType(e.currentTarget.value)} >
                    Type of Department
                    </label>
                    <select required className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="gender" value={Type} onChange={(e) => setType(e.currentTarget.value)}>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Product_M">Product Management</option>
                        <option value="Testing">Quality Assurance (QA) and Testing</option>
                        <option value="Devops">DevOps and Infrastructure</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="DSA">Data Science and Analytics</option>
                        <option value="R&D">Research and Development (R&D)</option>
                        <option value="CSS">Customer Support and Success</option>
                    </select>
                    <button type='submit' className="bg-zinc-200 dark:bg-zinc-900 dark:hover:hover:bg-sky-400 hover:text-white hover:bg-sky-400  font-semibold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150 ">Submit</button>
        </form>
        <Link to="/depData" className="bg-zinc-200 dark:text-white w-1/2 text-center dark:bg-zinc-800 dark:hover:hover:bg-sky-400 hover:text-white hover:bg-sky-400  font-semibold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150 ">Back</Link>
      </div>
    </div>
  )
}

export default Department
