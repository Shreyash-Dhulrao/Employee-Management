import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { darkTheme, lightTheme } from '../../Redux/Files/Theme'

const Navbar = () => {
    const [Theme, setTheme] = useState(useSelector(state => state.Theme.Theme))
    let classValue = document.querySelector("html").classList
    const handleTheme = () => {
        if (Theme === "light") {
            setTheme("dark")
            darkTheme(Theme)
        }
        else {
            setTheme("light")
            lightTheme(Theme)
        }
    }
    const [ThemeStat, setThemeStat] = useState(false)
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const ThemeCall = () => {
        if (userPrefersDark.matches) {
            setTheme("dark")
            darkTheme(Theme);
            setThemeStat(true)
        }
        else {
            setTheme("light")
            lightTheme(Theme);
            setThemeStat(false)
        }
    }

    useEffect(() => {
        ThemeCall()
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (event) => {
            if (event.matches) {
                setTheme("dark")
                darkTheme(Theme);
                setThemeStat(true)
            } else {
                setTheme("light")
                lightTheme(Theme);
                setThemeStat(false)
            }
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [])
    useEffect(() => {
        classValue.remove("light", "dark");
        classValue.add(Theme)
    }, [Theme])

    return (
        <div>
            <div className='bg-zinc-200/50 py-4 backdrop-blur-xl fixed w-full dark:text-white dark:bg-zinc-800/50 flex justify-around font-noto'>
                <div className='flex items-center'>
                    <Link to="/homepage">
                    <h2 className='text-2xl font-semibold'>Company Name</h2></Link>
                </div>
                <div className='flex gap-3 items-center font-noto text-zinc-800 dark:text-white'>
                    <Link  to="/work" className='text-sm duration-300 py-3 px-2 opacity-70  hover:opacity-100'>Work</Link>
                    <Link className='text-sm duration-300 py-3 px-2 opacity-70  hover:opacity-100'>About Us</Link>
                    <Link to="/profile_A" className='text-sm duration-300 py-3 px-2 opacity-70  hover:opacity-100'>Profile</Link>
                    <label
                        className="w-14 h-8 dark:bg-zinc-700 bg-zinc-100 shadow-inner rounded-3xl flex justify-center items-center overflow-hidden"
                    >
                        <input type="checkbox" onClick={handleTheme}  value={Theme === "dark"} className="peer hidden" />
                        <div className="w-6 h-6 flex justify-center items-center p-2 text-center bg-zinc-50 text-white duration-500 smooth rounded-full translate-x-0 peer-checked:translate-x-6 opacity-100 peer-checked:opacity-0 peer-checked:rotate-180">
                            {Theme === "dark" ? <i className="fas fa-moon text-black pt-0.5"></i> : <i className="fas fa-sun dark:text-white pt-0.5"></i> }
                        </div>
                        <div className="w-6 h-6 flex justify-center items-center bg-zinc-600 p-2 text-white duration-500 smooth rounded-full -translate-x-6 peer-checked:translate-x-0 opacity-0 peer-checked:opacity-100 -rotate-180 peer-checked:-rotate-0">
                        {Theme === "light" ? <i className="fas fa-sun dark:text-white pt-0.5"></i> : <i className="fas fa-moon"></i> }
                        </div>
                    </label>

                </div>
            </div>
        </div>
    )
}

export default Navbar
