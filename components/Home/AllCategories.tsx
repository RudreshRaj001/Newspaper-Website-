import Link from 'next/link'
import React from 'react'

const AllCategories = () => {
    const categories = [
        {
            name: 'Culture',
            link: '/culture'
        },
        {
            name: 'Creativity is hell',
            link: '/creativity'
        },
        {
            name: 'Food',
            link: '/food'
        },
        {
            name: 'Travel',
            link: '/travel'
        },
        {
            name: 'Humor',
            link: '/humor'
        },
        {
            name: 'Music',
            link: '/music'
        },
        {
            name: 'Music',
            link: '/music'
        },
        {
            name: 'Music',
            link: '/music'
        },
        {
            name: 'Music',
            link: '/music'
        },
        {
            name: 'Music',
            link: '/music'
        },
        {
            name: 'Music',
            link: '/music'
        },
        {
            name: 'Music',
            link: '/music'
        },
        {
            name: 'Music',
            link: '/music'
        },
    ]

    return (
        <div className='flex flex-col gap-5 text-indigo-900 p-7 shadow-md rounded-lg bg-white '>
            <p className='text-2xl text-center font-bold '>Categories</p>
            <div className='flex flex-row flex-wrap gap-2 font-bold justify-evenly  '>
                {categories.map((category, index) => (
                    <Link href={category.link}
                        key={index}
                        className='hover:bg-gray-200 p-2 rounded-md cursor-pointer'
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default AllCategories