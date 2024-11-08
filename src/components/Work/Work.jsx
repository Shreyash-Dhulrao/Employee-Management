import React from 'react'
import ADD from '../../assets/Images/Icons/plus.png'
import {Link} from "react-router-dom"

const Work = () => {
    return (
        <div className='pt-20 bg-zinc-100 dark:bg-zinc-900 min-h-screen dark:text-white'>
            <div>
            <div className='w-1/6'>
                <Link to="/newWork">
                    <div className='p-5 bg-zinc-200 dark:bg-zinc-800 transition duration-300  rounded-xl flex items-center justify-center gap-4'>
                        <img src={ADD} alt="" className='w-8 h-8' />
                        <h2 className='text-md'>Assign Work</h2>
                    </div>
                </Link>
            </div>
            </div>
            <div>
                <div>
                    <h2>Work Status</h2>
                </div>
                <div className='w-full '>
                    <table className='flex flex-col w-full px-5 py-2 bg-red-300'>
                        <thead >
                            <tr >
                                <td>Sr No.</td>
                                <td>Name</td>
                                <td>Status</td>
                                <td>Time</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Puneet SuperStart</td>
                                <td>Ok</td>
                                <td>10.20 am</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Work
