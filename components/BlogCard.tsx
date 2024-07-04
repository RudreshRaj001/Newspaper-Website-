import { BlogProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const BlogCard = (
    { blog }: { blog: BlogProps }
) => {

    return (
        <Link
            href={`/blog/${blog.id}`}
            className='max-w-md w-full bg-white rounded-lg flex flex-col 
            max-h-[500px] h-full 
            shadow-xl
            hover:shadow-2xl
            transition-all
        '>
            <div className='relative'>
                <Image
                    src={blog.imageUrl}
                    // src={'/base.jpeg'}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className='rounded-t-md w-full object-cover h-[200px] z-20'
                />
                {/* <Image
                    src={'/base.jpeg'}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className='rounded-t-md w-full object-cover h-[200px] absolute top-0 left-0 '
                /> */}
            </div>

            <p className='text-center mt-5 text-sm font-bold text-muted-foreground'>
                {blog.createdAt.toDateString()}
            </p>
            <div className=' p-5 mt-auto '>
                <p className='text-xl font-bold mb-2 text-indigo-900'>{blog.title.substring(0, 50)}{' ...'}</p>
                <p className='text-gray-500 '>{blog.content.substring(0, 100)}{' ...'}</p>
            </div>

        </Link>
    )
}

export default BlogCard