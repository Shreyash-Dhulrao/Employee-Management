import { useEffect, useState } from "react"
import React from 'react'
import { exportUser } from "../../../firebase/Firebase";
import { Link } from "react-router-dom";
import { checkEmp } from '../../../Redux/Files/Dashboard'
import { useDispatch } from 'react-redux'
import ADD from '../../../assets/Images/Icons/plus.png'
import NotFound from '../../../assets/Images/Icons/Cancel.png'

const EmployeeData = () => {
    const [totalEmp, settotalEmp] = useState([]);
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()

    const fetchEmployees = async () => {
        setloading(true)
        const employeeData = await exportUser();
        settotalEmp(employeeData);
        setloading(false)
    };


    const [search, setsearch] = useState("")

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search.toLowerCase());
        if (search == "") return;
        else {
            const data = totalEmp.filter((items) => {
                return items.name.toLowerCase().includes(search.toLowerCase)
            })
            console.log(data)
        }
    }


    const handlePush = (items) => {
        dispatch(checkEmp(items))
    }
    const Data = totalEmp.filter((data) => {
        if (search === "") {
            return data;
        }
        else {
            return data.name.toLowerCase().includes(search)
        }
    })

    useEffect(() => {
        fetchEmployees()
    }, [])

    return (
        <div className="dark:bg-zinc-900 pt-20 dark:text-white min-h-screen">
            <div >
                <div className=" flex justify-center p-3">
                    <h3 className='font-semibold text-2xl font-noto tracking-wide'>Employee List</h3>
                </div>
                <div className='flex my-4 justify-between px-10 py-2 items-center'>
                    <div >
                        <Link to="/newMember">
                            <div className='p-5 bg-zinc-200 dark:bg-zinc-800 transition duration-300 rounded-xl flex items-center justify-center gap-4'>
                                <img src={ADD} alt="" className='w-8 h-8' />
                                <h2 className='text-md'>Add new Member</h2>
                            </div>
                        </Link>
                    </div>
                    <div className='w-1/3 '>
                        <form onSubmit={handleSearch}>
                            <div class=" font-noto flex" >
                                <input
                                    value={search}
                                    placeholder="Search Username ..."
                                    onChange={(e) => setsearch(e.currentTarget.value)}
                                    className=' px-3 py-2 w-full outline-none border-b border-zinc-400 bg-transparent'
                                    id="floating_outlined"
                                    type="text"
                                />
                                <button type='submit'><div class=" border-b border-zinc-400 p-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentcolor"
                                        viewBox="0 0 24 24"
                                        height="24"
                                        width="24"
                                    >
                                        <path
                                            d="M10.979 16.8991C11.0591 17.4633 10.6657 17.9926 10.0959 17.9994C8.52021 18.0183 6.96549 17.5712 5.63246 16.7026C4.00976 15.6452 2.82575 14.035 2.30018 12.1709C1.77461 10.3068 1.94315 8.31525 2.77453 6.56596C3.60592 4.81667 5.04368 3.42838 6.82101 2.65875C8.59833 1.88911 10.5945 1.79039 12.4391 2.3809C14.2837 2.97141 15.8514 4.21105 16.8514 5.86977C17.8513 7.52849 18.2155 9.49365 17.8764 11.4005C17.5979 12.967 16.8603 14.4068 15.7684 15.543C15.3736 15.9539 14.7184 15.8787 14.3617 15.4343C14.0051 14.9899 14.0846 14.3455 14.4606 13.9173C15.1719 13.1073 15.6538 12.1134 15.8448 11.0393C16.0964 9.62426 15.8261 8.166 15.0841 6.93513C14.3421 5.70426 13.1788 4.78438 11.81 4.34618C10.4412 3.90799 8.95988 3.98125 7.641 4.55236C6.32213 5.12348 5.25522 6.15367 4.63828 7.45174C4.02135 8.74982 3.89628 10.2276 4.28629 11.6109C4.67629 12.9942 5.55489 14.1891 6.75903 14.9737C7.67308 15.5693 8.72759 15.8979 9.80504 15.9333C10.3746 15.952 10.8989 16.3349 10.979 16.8991Z"
                                        ></path>
                                        <rect
                                            transform="rotate(-49.6812 12.2469 14.8859)"
                                            rx="1"
                                            height="10.1881"
                                            width="2"
                                            y="14.8859"
                                            x="12.2469"
                                        ></rect>
                                    </svg>
                                </div></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {loading ? (
                <div>
                    <div class="text-center flex items-center justify-center flex-col ">
                        <div
                            class="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
                        ></div>
                        <h2 class="text-zinc-900 dark:text-white mt-4">Loading User Data</h2>
                    </div>
                </div>
            ) :
                (
                    <div className=" px-10 dark:text-white h-96 no-scrollbar overflow-y-scroll">
                        <table className='w-full table-auto bg-white dark:bg-zinc-900 '>
                        <thead  >
                            <tr className='flex font-medium text-xl text-sky-400 bg-zinc-200 dark:bg-zinc-700 py-2 grid grid-cols-4 gap-4 text-center'>
                                <td>Sr No.</td>
                                <td>Name</td>
                                <td>Role</td>
                                <td>Gender</td>
                            </tr>
                        </thead>
                        <tbody  className=" bg-blue-300 w-full l">
                            {Data.length > 0 ? (Data.map((items, index) => {
                                return (
                                    <Link onClick={() => handlePush(items.id)} key={index} to="/profile_E" className='w-full'>
                                        <tr className={`flex w-full py-2 ${(index + 1) % 2 == 1 ? "dark:bg-zinc-900 dark:text-white" : " bg-zinc-100 dark:bg-zinc-800 dark:text-white"}  grid grid-cols-4 gap-4 text-center `}>
                                            <td>{index + 1}</td>
                                            <td>{items.name}</td>
                                            <td>{items.role}</td>
                                            <td>{items.gender}</td>
                                        </tr>
                                    </Link>
                                )
                            }
                            )) :
                                (
                                    <tr className={`flex w-full py-2 dark:bg-zinc-900 dark:text-white items-center justify-center`}>
                                        <td >
                                            <div className="flex flex-col justify-center items-center gap-3">
                                                <img src={NotFound} alt="" className='w-32 h-32' />
                                                <p>Data Not Found....</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    </div>
                )}
        </div>
    )
}

export default EmployeeData
