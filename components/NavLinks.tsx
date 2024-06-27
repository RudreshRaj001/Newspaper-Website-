"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLinks = () => {
    const links = [
        {
            name: 'Home',
            href: '/'
        },
        {
            name: 'About',
            href: '/about'
        },
        {
            name: 'Contact',
            href: '/contact'
        }
    ]

    const pathname = usePathname();


    return (
        <div className='lg:flex gap-5 items-center hidden '>
            {links.map((link, index) => (
                <Link key={index} href={link.href}
                    className={`text-lg  ${pathname === link.href ? 'font-semibold underline' : ''}`}
                >{link.name}</Link>
            ))}

        </div>
    )
}

export default NavLinks