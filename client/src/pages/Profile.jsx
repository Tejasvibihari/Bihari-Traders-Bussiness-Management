import Dashboard from '../components/Dashboard'
// import Paper from '@mui/material/Paper';
// import Avatar from '@mui/material/Avatar';
import profilepic from '/image/person.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../app/user/userSlice';
import { logoutInventory } from '../app/inventory/inventorySlice';
import { logoutInvoice } from '../app/invoice/invoiceSlice';

export default function Profile() {
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(userLogout())
        dispatch(logoutInventory())
        dispatch(logoutInvoice())
    }

    return (
        <>
            <Dashboard>

                <div className="flex items-center justify-center mt-3   ">
                    <div className="relative w-96 h-3/4 flex flex-col items-center rounded-xl justify-center shadow-lg ">
                        <div className="h-48 w-full rounded-t-xl overflow-hidden">
                            <svg className="container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                <pattern id="diagonal-stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                    <rect width="5" height="10" fill="orange" />
                                    <rect width="5" height="10" x="5" y="5" fill="orangered" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
                            </svg>
                        </div>
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-28 h-28 rounded-full">
                            <img src={profilepic} alt="Profile pic" className="w-full h-full rounded-full" />
                        </div>
                        <div className="mt-10 text-center ">
                            <div className="mt-10 font-semibold text-lg text-black">{user.name}</div>
                            <div className="mt-2 text-gray-600">{user.bussinessName}</div>
                        </div>
                        <div className="flex space-x-4 mb-5">
                            {/* profile edit Button */}
                            <div className="mt-2 w-full flex justify-center items-center">
                                <button className="w-full relative inline-flex h-12 overflow-hidden p-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-nowrap rounded-md">
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                        style={{
                                            backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                            backgroundSize: '200% 100%',
                                            transition: 'background-position 0.5s ease',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                        onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                                    >
                                        Edit Profile
                                    </span>
                                </button>
                            </div>
                            {/* Log Out Button */}
                            <div className="mt-2 w-full flex justify-center items-center">
                                <button className="w-full relative inline-flex h-12 overflow-hidden p-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                        style={{
                                            backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                            backgroundSize: '200% 100%',
                                            transition: 'background-position 0.5s ease',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                        onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                                        onClick={logout}
                                    >
                                        Log Out
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


            </Dashboard>
        </>
    )





}


