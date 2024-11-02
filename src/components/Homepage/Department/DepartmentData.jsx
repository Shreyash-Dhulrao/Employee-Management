import { useEffect, useState } from "react"
import React from 'react'
import { exportDash } from "../../../firebase/Firebase";
import { Link } from "react-router-dom";
import ADD from '../../../assets/Images/Icons/plus.png'
import Software from '../../../assets/Images/Icons/Software.png'
import Hardware from '../../../assets/Images/Icons/Hardware.png'
import Product from '../../../assets/Images/Icons/Product.png'
import Testing from '../../../assets/Images/Icons/Testing.png'
import Devops from '../../../assets/Images/Icons/Devops.png'
import Cybersecurity from '../../../assets/Images/Icons/Cybersecurity.png'
import DSA from '../../../assets/Images/Icons/Data-Structure.png'
import RD from '../../../assets/Images/Icons/Research.png'
import Customer from '../../../assets/Images/Icons/Customer.png'

const EmployeeData = () => {
    const [DashData, setDashData] = useState([]);
    const [loading, setloading] = useState(false)

    const fetchEmployees = async () => {
        setloading(true)
        const employeeData = await exportDash();
        setDashData(employeeData);
        setloading(false)
    };

    const departmentImages = {
        "Software": Software,
        "Hardware": Hardware,
        "Product_M": Product,
        "Testing": Testing,
        "Devops": Devops,
        "Cybersecurity": Cybersecurity,
        "DSA": DSA,
        "R&D": RD,
        "CSS": Customer,
    };

    useEffect(() => {
        fetchEmployees()
    }, [])

    return (
        <div className="pt-20 dark:bg-zinc-900 min-h-screen dark:text-white" >
            <div >
                <div className=" flex justify-center p-3">
                    <h3 className='font-semibold text-2xl font-noto tracking-wide'>Department List</h3>
                </div>
                <div className='flex my-4 justify-between px-10 py-2 items-center'>
                    <div >
                        <Link to="/createDepartment">
                            <div className='p-5 bg-zinc-200 dark:bg-zinc-800 transition duration-300  rounded-xl flex items-center justify-center gap-4'>
                                <img src={ADD} alt="" className='w-8 h-8' />
                                <h2 className='text-md'>Add new Department</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {loading ? (
                <div>
                    <div className="text-center flex items-center justify-center flex-col ">
                        <div
                            className="w-14 h-14 border-8 border-t-blue-500 border-gray-300 rounded-full animate-spin"
                        ></div>
                        <h2 className="text-zinc-900 dark:text-white mt-4">Loading User Data</h2>
                    </div>
                </div>
            ) :
                (
                    <div className="grid grid-cols-4 mx-10 mt-12">
                        {DashData.map((items, index) => {
                            const departmentImage = departmentImages[items.department];
                            return (
                                <Link key={index} className='w-full'>
                                    <div class="relative flex w-80 flex-col rounded-xl bg-white dark:bg-zinc-800 flex flex-col items-center justify-center dark:text-white bg-clip-border text-gray-700 shadow-md">
                                        <div class={`relative mx-4 -mt-10 h-40 w-40 overflow-hidden rounded-xl ${loading ? "bg-gradient-to-r from-sky-400 to-sky-600 " : "bg-transparent"} `}>
                                            <img src={departmentImage} alt="" className="h-full" />
                                        </div>
                                        <div className="truncate  flex flex-col font-noto items-center justify-center p-4">
                                            <h3 className="font-medium text-xl " >{items.name.length<20 ? items.name  : items.name.slice(0,20) +  " .... "}</h3>
                                            <p className="truncate text-md opacity-80">{items.department}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}

export default EmployeeData
