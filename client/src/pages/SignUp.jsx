import { useState } from 'react'
import SignUpForm from '../components/SignUpForm'
import SignInForm from '../components/SignInForm'



export default function SignUp() {
    const [haveAccount, setHaveAccount] = useState(false)

    function toggleHaveAccount() {
        setHaveAccount(!haveAccount)
    }


    return (
        <>
            <div className='signup h-screen'>
                {
                    haveAccount ? <SignInForm /> : <SignUpForm />
                }
                {
                    haveAccount ?
                        <div className='flex items-center justify-center text-black mb-5 px-3 '>
                            <p className='font-bold'>Dont Have Account ?</p>
                            <div onClick={toggleHaveAccount}
                                className='flex px-3 underline cursor-pointer'
                            >
                                Create One
                            </div>
                        </div> :
                        <div className='flex items-center justify-center text-black px-3 mb-5 '>
                            <p className='font-bold'>Already Have Account</p>
                            <div
                                onClick={toggleHaveAccount}
                                className='flex px-3 underline cursor-pointer'
                            >
                                SignIn
                            </div>
                        </div>
                }




            </div>
        </>
    )
}
