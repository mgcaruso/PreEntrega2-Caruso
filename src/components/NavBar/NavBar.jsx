import './navBar.css'
import { Disclosure, Transition } from '@headlessui/react'
import { useState } from 'react';
import CartWidget from './CartWidget/CartWidget';
import { Cross as Hamburger } from 'hamburger-react'
import { transitionClasses } from '../../utilities/Transitions/TransitionClasses';
import MobileMenu from './MobileMenu/MobileMenu';
import LogoSolvix from '../../assets/images/logo.png'
import { NavLink as LinkRouter, NavLink } from 'react-router-dom';
import { HiOutlineCube } from "react-icons/hi";
import { HiMiniCube } from "react-icons/hi2";
import { useContext } from 'react';
import { ThemeContext } from '../Context/Theme/theme';
import Switch from "react-switch";
import CustomDropDown from './Dropdown/CustomDropDown';

const navigation = [
    { name: 'Home', to: '/', current: true },
    { name: 'About', to: '/about', current: false },
    { name: 'Products', to: '/products', current: false },
    { name: 'Categories', to: '/category', current: false },
    { name: 'Contact', to: '/contact', current: false },
]

const categories = ["Classics", "Speedcubes", "Shape-Shifting Cubes", "Special Edition Cubes"];


export default function NavBar() {

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const { theme,setTheme } = useContext(ThemeContext);



    const themeSwitch = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove("dark");
            setTheme("light")
            localStorage.setItem("theme", "light");
            return;
        }else{
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark")

        }
    }

    return (
        <Disclosure id="navbar" as="nav" className="bg-primary dark:bg-primary-inverted drop-shadow-xl font-body block sm:flex h-full w-full">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8 bg-primary dark:bg-primary-inverted w-full">
                        <div className="relative flex h-16 items-center justify-between bg-primary dark:bg-primary-inverted">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">

                                {/* Mobile menu button*/}
                                <Disclosure.Button className="h-70 inline-flex items-center justify-center rounded-md text-primary-inverted dark:text-primary"
                                >
                                    <Hamburger toggled={open} size={20} />
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center sm:px-0 px-4">
                                    <LinkRouter to="/">
                                        <img
                                            className="h-8 w-auto"
                                            src={LogoSolvix}
                                            alt="Solvix Ecommerce Logo"
                                        />
                                    </LinkRouter>
                                </div>

                                <div className="hidden sm:ml-6 sm:flex">
                                    <div className="flex space-x-4  items-center justify-center">
                                        {navigation.map((item, index) => (

                                            item.name === "Categories" ?
                                                //DropDown Menu
                                                <CustomDropDown key={index} index={index} categories={categories} />
                                                :

                                                <LinkRouter
                                                    key={index}
                                                    to={item.to}
                                                    className={({ isActive }) => isActive ? 'bg-primary-invertedtext-primary dark:bg-primary rounded-md px-3 py-2 text-sm font-normal' : 'text-primary-inverted dark:text-primary hover:bg-primary-hover dark:hover:bg-primary-inverted-hover dark:hover:text-primary hover:text-primary-inverted rounded-md px-3 py-2 text-sm font-normal'}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </LinkRouter>
                                        ))}
                                    </div>

                                </div>

                                <div className="switch-box flex items-center sm:px-4 px-0">

                                    <Switch
                                        className='flex'
                                        onChange={themeSwitch}
                                        checked={theme === "light" ? false : true }
                                        onColor={"#999"}
                                        offColor={"#3D3D41"}
                                        uncheckedIcon={<HiOutlineCube className='h-full w-[74%] absolute left-1 text-primary' />}
                                        checkedIcon={<HiMiniCube className='h-full w-[65%] absolute left-1 text-primary' />}
                                        activeBoxShadow={'0 0 2px 3px #085a82'}
                                    />
                                </div>
                            </div>
                            <div className="nav-sub">
                                <NavLink to="/cart">
                                    <CartWidget quantity={5} />
                                </NavLink>
                            </div>
                        </div>


                    </div>
                    {/* Dropdown menu - Animated */}
                    <Transition
                        show={open}
                        {...transitionClasses.flyOutTop}
                    >
                        {/* DROP DOWN PANEL */}
                        <MobileMenu navigation={navigation} categories={categories} isCategoriesOpen={isCategoriesOpen} setIsCategoriesOpen={setIsCategoriesOpen} />
                    </Transition>

                </>
            )
            }
        </Disclosure >
    )
}


