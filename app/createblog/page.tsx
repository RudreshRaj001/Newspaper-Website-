import BlogForm from '@/components/BlogForm'
import BlogForm2 from '@/components/BlogForm2'
import React from 'react'

const page = () => {
    return (
        <div className='w-full py-10 px-5 flex flex-col gap-5'>
            <p className='text-center text-2xl font-bold'>Create Blog</p>
            <BlogForm2 />
        </div>
    )
}

export default page