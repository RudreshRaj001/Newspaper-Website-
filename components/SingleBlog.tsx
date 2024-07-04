
import Image from 'next/image'
import React from 'react'
import BlogInteractionButtons from './BlogInteractionButtons';

interface BlogProps {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    authorId: string;
    author: {
        id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    };
    _count: {
        likes: number;
    };
}


const SingleBlog = (
    { blog }: { blog: BlogProps }
) => {
    return (
        <div className='flex flex-col gap-5 justify-center '>
            <p className='text-4xl font-bold '>{blog.title}</p>
            <div className='flex gap-3'>
                <div>
                    {/* profile  */}
                    <p className='w-12 h-12 rounded-full bg-red-500 text-white font-bold flex items-center justify-center'>{blog.author.name.charAt(0).toUpperCase()}</p>
                </div>
                <div>
                    <p className='text-lg font-bold'>{blog.author.name}</p>
                    <p className='text-muted-foreground font-bold'>Published on: {new Date(blog.createdAt).toDateString()}</p>
                </div>
            </div>
            <Image src={blog.imageUrl} alt={blog.title} width={1000} height={400} className='rounded-lg' />
            <p className='text-justify text-lg'>{blog.content}</p>
            <BlogInteractionButtons />
        </div>
    )
}

export default SingleBlog


