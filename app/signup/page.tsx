import SignUpForm from '@/components/SignUpForm'
import React from 'react'

const page = () => {
    return (
        <div className='p-6 rounded-md w-full max-w-sm mx-auto border bg-secondary/50 my-5'>
            <p className='text-center text-2xl my-2 font-bold'>Sign Up</p>
            <SignUpForm />
        </div>
    )
}

export default page