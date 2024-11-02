import React, { useEffect } from 'react'
import { exportUser } from '../../firebase/Firebase'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile_Emp = () => {
    const [TotalEmp, setTotalEmp] = useState([]);
    const empId = useSelector(state => state.Count.empId)
    const navigate = useNavigate()
    const newFunc = async () => {
        const newData = await exportUser();
        const user = newData.find((item) => item.id === empId);
        if (user) {
            setTotalEmp([user]);
        } else {
            console.log("No matching user found");
        }
    }

    useEffect(() => {
        newFunc()
    }, [])

    return (
        <div>
            {TotalEmp.map((items, index) => {
                return (
                    <div class="bg-white dark:bg-zinc-900 dark:text-white min-h-screen m-0 p-0 border font-noto" key={index + 1}>
                        <div className='flex justify-around my-3 '>
                            <div class="px-4 py-5 sm:px-6 dark:text-white">
                                <h3 class="text-lg leading-6 font-medium ">
                                    User Profile
                                </h3>
                                <p class="mt-1 max-w-2xl text-sm opacity-60 ">
                                    This is some information about the user.
                                </p>
                            </div>
                            <div>
                                <img src={items.imageUrl} alt="" className='w-32 h-32 rounded-lg' />
                            </div>
                        </div>
                        <div class="flex items-center justify-center px-4 md:py-5 sm:p-0">
                            <dl class="sm:divide-y sm:divide-gray-200 bg-zinc-100 dark:bg-zinc-800 w-full md:w-2/3 rounded-lg">
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                                    <dt class="text-sm font-medium opacity-60">
                                        Full name
                                    </dt>
                                    <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                        {items.name}
                                    </dd>
                                </div>
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium opacity-60">
                                        Email address
                                    </dt>
                                    <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                        {items.email}
                                    </dd>
                                </div>
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium opacity-60">
                                        Phone number
                                    </dt>
                                    <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                        {items.contact}
                                    </dd>
                                </div>
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium opacity-60">
                                        Address
                                    </dt>
                                    <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                        {items.address}
                                    </dd>
                                </div>
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium opacity-60">
                                        City
                                    </dt>
                                    <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                        {items.city}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className='w-full flex items-center justify-center my-3'>
                                    <button
                                    onClick={()=>navigate(-1)}
                                        class="bg-white text-center w-48  rounded-lg h-10 relative text-black text-xl font-semibold group"
                                        type="button"
                                    >
                                        <div
                                            class="bg-sky-400 rounded-md h-8 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 1024 1024"
                                                height="25px"
                                                width="25px"
                                            >
                                                <path
                                                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                                    fill="#000000"
                                                ></path>
                                                <path
                                                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                                    fill="#000000"
                                                ></path>
                                            </svg>
                                        </div>
                                        <p class="translate-x-2 font-noto">Go Back</p>
                                    </button>

                                </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Profile_Emp
