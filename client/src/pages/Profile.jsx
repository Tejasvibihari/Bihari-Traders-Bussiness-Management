import Dashboard from '../components/Dashboard'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../app/user/userSlice';
import { logoutInventory } from '../app/inventory/inventorySlice';
import { logoutInvoice } from '../app/invoice/invoiceSlice';
import { logoutWholesale } from '../app/wholesale/wholesaleSlice';
import { useRef, useState } from 'react';
import client from '../service/axiosClient';
import { updateAccountStart, updateAccountSuccess } from '../app/user/userSlice';


export default function Profile() {
    const user = useSelector(state => state.user.currentUser)
    const loading = useSelector(state => state.user.loading)
    const dispatch = useDispatch()
    const [isEditable, setIsEditable] = useState(false);
    const [bussinessName, setBussinessName] = useState(user.bussinessName);
    const [name, setName] = useState(user.name);
    const [gstin, setGstin] = useState(user.gstin);
    const [mobile, setMobile] = useState(user.mobile);
    const [address, setAddress] = useState(user.address);
    const [id, setId] = useState(user._id)
    const [image, setImage] = useState("");


    const toggleEditable = () => {
        setIsEditable(!isEditable);
    }

    const logout = () => {
        dispatch(userLogout())
        dispatch(logoutInventory())
        dispatch(logoutInvoice())
        dispatch(logoutWholesale())
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('id', id);
        formData.append('bussinessName', bussinessName);
        formData.append('name', name);
        formData.append('gstin', gstin);
        formData.append('mobile', mobile);
        formData.append('address', address);
        formData.append('image', image); // Add the selected file
        try {
            dispatch(updateAccountStart())
            const response = await client.post('/api/user/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response)
            dispatch(updateAccountSuccess(response.data.user))
            toggleEditable()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Dashboard>

                <div className=''>
                    {/* <form> */}
                    <div className='grid grid-cols-2 md:grid-cols-4 justify-start items-center border '>
                        <div className='flex items-center justify-center'>
                            {user.image && <img src={`https://bihari-traders-api.onrender.com/uploads/${user.image}`} className='w-64 rounded-full cursor-pointer justify-center items-center flex' title={isEditable ? "Edit Image" : null} />}                        </div>
                        <div className='p-4 col-span-3 flex flex-col'>
                            <div className='my-1 font-semibold text-xl'>
                                {isEditable ?
                                    <input type='text' value={bussinessName} onChange={(e) => setBussinessName(e.target.value)} name='bussinessName' placeholder={user.bussinessName} className='w-64' />
                                    : <div className='w-64'>{user.bussinessName}</div>
                                }

                            </div>
                            {/*  */}
                            <div className='my-1 text-slate-700'>
                                {isEditable ?
                                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} name='name' placeholder={user.name} className='w-64' />
                                    : <div className='w-64'>{user.name}</div>
                                }
                            </div>
                            <div className='my-4'>
                                {isEditable ?
                                    <input type='text' value={gstin} onChange={(e) => setGstin(e.target.value)} name='gstin' placeholder={user.gstin} className='w-64' />
                                    : <div className='w-64'>{user.gstin}</div>
                                }
                            </div>
                            <div className='my-4 text-slate-600'>
                                <div className='my-1'>
                                    {isEditable ?
                                        <input type='text' value={mobile} onChange={(e) => setMobile(e.target.value)} name='mobile' placeholder={user.mobile} className='w-64' />
                                        : <div className='w-64'>{user.mobile}</div>
                                    }
                                </div>
                                <div className='my-1'>
                                    <span type='text' className='w-64'>{user.email}</span>
                                </div>
                                <div className='my-1'>
                                    {isEditable ?
                                        <textarea type='text' value={address} onChange={(e) => setAddress(e.target.value)} name='address' placeholder={user.address} className='w-64' />
                                        : <div className='w-64'>{user.address}</div>
                                    }
                                </div>
                                <div className='my-1'>
                                    {isEditable ?
                                        <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
                                        : null
                                    }
                                </div>
                            </div>
                            <div className='flex flex-row'>
                                <div className="mt-2 flex justify-center items-center">
                                    <button className="w-full relative inline-flex h-12 overflow-hidden p-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                            style={{
                                                backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                                backgroundSize: '200% 100%',
                                                transition: 'background-position 0.5s ease',
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                            onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                                            onClick={isEditable ? handleSubmit : toggleEditable}
                                        >
                                            {isEditable ? loading ? 'Saving Change' : "Save Change" : 'Edit Profile'}
                                        </span>
                                    </button>
                                </div>
                                <div>
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
                    </div>
                    {/* </form> */}
                </div>
            </Dashboard >
        </>
    )





}


