import React, { useEffect, useState } from 'react'
import { addEmp } from '../../Redux/Files/Dashboard'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ImageCropper from './ImageCrop'

const newMember = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setgender] = useState("male")
    const [role, setRole] = useState("")
    const [contact, setContact] = useState()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState("");
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!imageName) {
            alert("image is undefined")
            return;
        }
        let a = {
            name,
            email,
            gender,
            role,
            image: imageName,
            imageSrc: image.src,
            contact,
            address,
            city
        }
        dispatch(addEmp(a))
        setname("");
        setPassword("")
        setemail("")
        setgender("")
        setRole("")
        setImage(null)
        setImageName("")
        setContact("")
        setAddress("")
        setCity("")

    }

    const handleImageCrop = (croppedImage, originalFilename) => {
        setImage(croppedImage);           // Set base64 image data
        if (!imageName) {
            setImageName(originalFilename);
        }
    };
    return (
        <div className='bg-zinc-100 dark:bg-zinc-900 dark:text-white flex flex-col gap-3 pt-3'>
            <div>
                <h2 className='text-center font-noto font-bold text-3xl pt-2'>New Form </h2>
            </div>
            <div className='w-full flex flex-col items-center justify-center font-noto mb-10'>
                <form onSubmit={handleSubmit} className='bg-zinc-50 dark:bg-zinc-800 gap-4 p-3 rounded-lg drop-shadow-lg flex flex-col w-1/2'>
                    <input required type="text" placeholder='Full Name' value={name} onChange={(e) => setname(e.currentTarget.value)} className=' px-3 py-2 outline-none border-b border-zinc-400 bg-transparent' />
                    <input required type="email" placeholder='Email Address' value={email} onChange={(e) => setemail(e.currentTarget.value)} className=' px-3 py-2 outline-none border-b border-zinc-400 bg-transparent' />
                    <input required type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.currentTarget.value)} className=' px-3 py-2 outline-none border-b border-zinc-400 bg-transparent' />

                    {/* <input type="number" value={contact} onChange={(e) => setContact(e.currentTarget.value)} placeholder="Contact Number : {+1 (555) 000-000}" className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" /> */}
                    <input type="number" id="quantity" name="quantity" value={contact} onChange={(e) => setContact(e.currentTarget.value)} placeholder="Contact Number : {+1 (555) 000-000}" className="bg-transparent block w-full px-3 py-2  outine-none focus:outline-none border-b border-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <input type="text" placeholder='Address ' value={address} onChange={(e) => setAddress(e.currentTarget.value)} className=' px-3 py-2 outline-none border-b border-zinc-400 bg-transparent' />
                    <input type="text" placeholder='City/State' value={city} onChange={(e) => setCity(e.currentTarget.value)} className=' px-3 py-2 outline-none border-b border-zinc-400 bg-transparent' />
                    <label className="text-sm mb-2 cursor-pointer" htmlFor="gender" value={gender} onChange={(e) => setgender(e.currentTarget.value)} >
                        Gender
                    </label>
                    <select required className="bg-transparent border-0 rounded-md p-2 mb-4 outline-none border-none transition ease-in-out duration-150" id="gender" value={gender} onChange={(e) => setgender(e.currentTarget.value)}>
                        <option value="male" className='dark:bg-zinc-900 outline-none'>Male</option>
                        <option value="female" className='dark:bg-zinc-900 outline-none'>Female</option>
                        <option value="other" className='dark:bg-zinc-900 outline-none'>Other</option>
                    </select>
                    <input required type="text" placeholder='Role' value={role} onChange={(e) => setRole(e.currentTarget.value)} className=' px-3 py-2 outline-none border-b border-zinc-400 bg-transparent' />
                    <ImageCropper
                        closeModal={() => {}}
                        setImageName={handleImageCrop} 
                    />
                    <button type='submit' className="bg-zinc-200 dark:bg-zinc-900 hover:text-white hover:bg-sky-400  dark:hover:bg-sky-400 font-semibold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150 ">Submit</button>
                </form>
                <Link to="/empData" className="bg-zinc-200 dark:bg-zinc-800 w-1/2 text-center  hover:text-white hover:bg-sky-400  dark:hover:bg-sky-400 font-semibold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150 ">Back</Link>
            </div>
        </div>
    )
}

export default newMember


