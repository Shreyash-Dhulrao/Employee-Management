import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dashboard, exportDash, exportUser } from '../../firebase/Firebase'
import HomepageImg from '../../assets/Images/Image1.jpg'
import Icon_1 from '../../assets/Images/Icons/TotalEmp.png'
import Icon_2 from '../../assets/Images/Icons/Department.png'
import Icon_3 from '../../assets/Images/Icons/Work.png'
import Icon_4 from '../../assets/Images/Icons/Attendance.png'
import Icon_5 from '../../assets/Images/Icons/plus.png'
import DepartmentData from './Department/DepartmentData'
import EmployeeData from './EmployeeData/EmployeeData'

const Homepage = () => {
  const [currentVal, setcurrentVal] = useState("")
  const [totalEmp, settotalEmp] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setloading] = useState(false)

  const fetchEmployees = async () => {
    setloading(true)
    const employeeData = await exportUser();
    settotalEmp(employeeData);
    setloading(false)
  };

  const fetchDashboard = async () => {
    const dash = await exportDash();
    setDashboardData(dash);
  }
  useEffect(() => {
    fetchEmployees();
    fetchDashboard()
  }, []);

  const [search, setsearch] = useState("")

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search.toLowerCase());
    if(search == "") return ;
    else {
      const data = totalEmp.filter((items)=> {
        return items.name.toLowerCase().includes(search.toLowerCase)
      })
      console.log(data)
    }
  }

  const buttons = [
    {
      img: Icon_1,
      name: "Total Employees",
      total: totalEmp.length === 0 ? "" : totalEmp.length,
      link: "/empData",
      currentValue: "totalEmp"
    },
    {
      img: Icon_2,
      name: "Department",
      total: dashboardData.length === 0 ? "" : dashboardData.length,
      link: '/depData',
      currentValue: "Department"
    },
    {
      link: '',
      img: Icon_3,
      name: "Role",
      total: "3",
      currentValue: "Role"
    },
    {
      img: Icon_4,
      name: "Attendance",
      total: "3",
      link: '',
      currentValue: "Attendance"
    }
  ]

  return (
    <div>
      <div className='bg-white flex dark:bg-zinc-900 dark:text-white font-noto'>
        <div className='right-side w-full min-h-screen pt-[80px]'>
          <div className='flex justify-center'>
            <div className='w-full flex justify-center items-center content-center' >
              <img src={HomepageImg} alt="" className='w-full h-full' />
            </div>
          </div>
          <div className='flex justify-center p-5'>
            <h2 className='font-noto font-medium text-sky-400 text-3xl'>Access Employee Information</h2>
          </div>
          <div className='grid grid-cols-4 gap-4 px-10 py-4'>
            {buttons.map((items , index) =>
              <Link to={items.link} key={index}>
                <div className='box bg-zinc-100 dark:bg-zinc-800 dark:shadow-sky-400/75 hover:shadow-black/20 shadow-[rgba(13,_38,_76,_0.19)_0px_0px_0px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_0px_10px] transition duration-300 p-5 rounded-xl flex flex-col items-center justify-center gap-4'>
                  <img src={items.img} alt="" className='w-40 h-40' />
                  <h2 className='text-xl font-semibold opacity-50'>{items.name}</h2>
                  {loading ? <div className="flex flex-row gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:.10s]"></div>
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:.10s]"></div>
                  </div>
                    :
                    <p className='text-lg font-semibold'>{items.total}</p>}
                </div>
              </Link>)}
          </div>
          {(currentVal === "Role") && (
            <div>Role is here</div>
          )}
          {(currentVal === "Attendance") && (
            <div>Attendance is here</div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Homepage
