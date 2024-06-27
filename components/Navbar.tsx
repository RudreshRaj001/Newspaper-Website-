import { getName } from '@/app/actions'
import Link from 'next/link'
import React from 'react'
import NavLinks from '@/components/NavLinks'
import { LoginButton } from '@/components/LoginButton'

const Navbar = async () => {



    const name = await getName()
    return (
        <div className={`flex justify-between w-full p-5 items-center border-b-2 shadow-md
        bg-secondary/50
        `}>
            <p className='font-bold'>News Website</p>
            <div className='flex gap-5'
            >
                <NavLinks />
                <LoginButton />
            </div>
        </div>
    )
}

export default Navbar