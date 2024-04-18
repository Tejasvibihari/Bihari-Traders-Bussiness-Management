import Dashboard from '../components/Dashboard'
import Paper from '@mui/material/Paper';
// import Avatar from '@mui/material/Avatar';
import profilepic from '../../public/image/person.jpg'



export default function Profile() {


    return (
        <>
            <Dashboard>
                <Paper elevation={3} className='p-10 max-w-xl mx-auto'>
                    <div className='flex items-center justify-center'>
                        <div className='profile flex flex-col items-center shadow-gray-600 shadow-2xl rounded-lg'>
                            <div className='p-10 flex flex-col items-center '>
                                <div>
                                    <img src={profilepic} alt='Profile pic' className='w-32 h-32 rounded-full' />
                               </div>
                                <div className="mt-4 text-2xl font-bold text-gray-200 font-[montserrat]">Marry doe</div>
                                <div className="mt-2 text-xl text-gray-200 font-[montserrat]">Business Name</div>
                                <div className="mt-2 text-xl text-gray-200 font-[montserrat]">johndoe@example.com</div>
                                {/* profile edit Button */}
                                <div className="mt-2 w-full flex justify-center items-center">
                                    <button className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff006e_0%,#ffbe0b_50%,#8338ec_100%)]" />
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
                                    <button className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff006e_0%,#ffbe0b_50%,#8338ec_100%)]" />
                                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                            style={{
                                                backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                                backgroundSize: '200% 100%',
                                                transition: 'background-position 0.5s ease',
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                            onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                                        >
                                            Log Out
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </Dashboard>
        </>
    )




       

}


